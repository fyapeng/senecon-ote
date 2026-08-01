"""Export the OTE website reading material from the authoritative LaTeX project."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import shutil
import subprocess
import tempfile
from pathlib import Path


COMMAND_PATTERNS = {
    "chapter": re.compile(r"\\chapter(?:\[[^]]*\])?\{"),
    "section": re.compile(r"\\section(?:\[[^]]*\])?\{"),
}

VOLUME_DEFINITIONS = [
    {
        "number": 1,
        "roman": "Ⅰ",
        "title": "数理基础",
        "english": "Mathematical Foundations",
        "range": range(1, 10),
        "pages": 753,
        "size": "3.9 MB",
        "file": "BOOK_OT_volume_1_mathematical_foundations_v2.1.pdf",
        "accent": "teal",
    },
    {
        "number": 2,
        "roman": "Ⅱ",
        "title": "微观经济基础",
        "english": "Microeconomic Foundations",
        "range": range(10, 18),
        "pages": 630,
        "size": "3.6 MB",
        "file": "BOOK_OT_volume_2_microeconomic_foundations_v2.1.pdf",
        "accent": "copper",
    },
    {
        "number": 3,
        "roman": "Ⅲ",
        "title": "经济学应用",
        "english": "Economic Applications",
        "range": range(18, 26),
        "pages": 675,
        "size": "3.9 MB",
        "file": "BOOK_OT_volume_3_economic_applications_v2.1.pdf",
        "accent": "blue",
    },
]


def extract_balanced_arguments(source: str, command_re: re.Pattern[str]) -> list[str]:
    arguments: list[str] = []
    for match in command_re.finditer(source):
        start = match.end()
        depth = 1
        cursor = start
        while cursor < len(source) and depth:
            if source[cursor] == "{" and (cursor == 0 or source[cursor - 1] != "\\"):
                depth += 1
            elif source[cursor] == "}" and (cursor == 0 or source[cursor - 1] != "\\"):
                depth -= 1
            cursor += 1
        if depth == 0:
            arguments.append(source[start : cursor - 1])
    return arguments


def stringify_pandoc_inline(value: object) -> str:
    if isinstance(value, list):
        return "".join(stringify_pandoc_inline(item) for item in value)
    if not isinstance(value, dict):
        return ""
    kind = value.get("t")
    content = value.get("c")
    if kind == "Str":
        return str(content)
    if kind in {"Space", "SoftBreak", "LineBreak"}:
        return " "
    if kind in {"Code", "Math"} and isinstance(content, list):
        return str(content[-1])
    return stringify_pandoc_inline(content)


def render_latex_titles(titles: list[str], pandoc: str) -> list[str]:
    document = "\n".join(f"\\section{{{title}}}" for title in titles)
    result = subprocess.run(
        [pandoc, "-f", "latex", "-t", "json"],
        input=document,
        text=True,
        encoding="utf-8",
        capture_output=True,
        check=True,
    )
    ast = json.loads(result.stdout)
    rendered = [
        re.sub(
            r"(?<=[\u3400-\u9fff，、])\s+(?=[\u3400-\u9fff])",
            "",
            stringify_pandoc_inline(block["c"][2]).strip(),
        )
        for block in ast.get("blocks", [])
        if block.get("t") == "Header"
    ]
    if len(rendered) != len(titles):
        raise RuntimeError("Pandoc did not preserve the title count")
    return rendered


def find_pandoc(explicit: str | None) -> str:
    candidates = [
        explicit,
        shutil.which("pandoc"),
        r"C:\Users\ENAN\.conda\envs\evan\Library\bin\pandoc.exe",
    ]
    for candidate in candidates:
        if candidate and Path(candidate).exists():
            return candidate
    raise RuntimeError("Pandoc was not found; pass --pandoc")


def parse_volumes(book_dir: Path, pandoc: str) -> list[dict[str, object]]:
    chapters: dict[int, dict[str, object]] = {}
    raw_titles: list[str] = []
    section_counts: dict[int, int] = {}

    for number in range(1, 26):
        chapter_path = book_dir / "chapters" / f"ch{number:02d}" / f"ch{number:02d}.tex"
        source = chapter_path.read_text(encoding="utf-8")
        chapter_titles = extract_balanced_arguments(source, COMMAND_PATTERNS["chapter"])
        section_titles = extract_balanced_arguments(source, COMMAND_PATTERNS["section"])
        if len(chapter_titles) != 1:
            raise RuntimeError(f"Expected one chapter heading in {chapter_path}")
        chapters[number] = {"number": number, "titleTex": chapter_titles[0]}
        section_counts[number] = len(section_titles)
        raw_titles.extend([chapter_titles[0], *section_titles])

    rendered = iter(render_latex_titles(raw_titles, pandoc))
    for number in range(1, 26):
        chapters[number]["title"] = next(rendered)
        chapters[number]["sections"] = [next(rendered) for _ in range(section_counts[number])]
        chapters[number].pop("titleTex")

    volumes: list[dict[str, object]] = []
    for definition in VOLUME_DEFINITIONS:
        volume = {key: value for key, value in definition.items() if key != "range"}
        volume["chapters"] = [chapters[number] for number in definition["range"]]
        volumes.append(volume)
    return volumes


def parse_code_index(book_dir: Path) -> list[dict[str, object]]:
    code_root = book_dir / "code"
    entries = []
    for number in range(1, 26):
        chapter_dir = code_root / f"ch{number:02d}"
        if not chapter_dir.exists():
            continue
        files = [path for path in chapter_dir.rglob("*") if path.is_file()]
        entries.append(
            {
                "number": number,
                "path": f"code/ch{number:02d}/",
                "pythonFiles": sum(path.suffix == ".py" for path in files),
                "certificateFiles": sum("certificate" in path.name.lower() for path in files),
            }
        )
    return entries


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--book-dir", type=Path, default=Path(r"E:\最优运输理论"))
    parser.add_argument("--pandoc")
    args = parser.parse_args()

    site_root = Path(__file__).resolve().parents[1]
    output_dir = site_root / "src" / "content"
    output_dir.mkdir(parents=True, exist_ok=True)
    book_dir = args.book_dir.resolve()
    pandoc = find_pandoc(args.pandoc)

    preface_path = book_dir / "frontmatter" / "preface.tex"
    preface_source = preface_path.read_text(encoding="utf-8")
    preface_hash = hashlib.sha256(preface_source.encode("utf-8")).hexdigest()[:12]
    normalized = re.sub(r"\\addcontentsline\{[^}]+\}\{[^}]+\}\{[^}]+\}", "", preface_source)

    with tempfile.TemporaryDirectory(prefix="ote-preface-") as temporary_dir:
        temporary_path = Path(temporary_dir)
        source_path = temporary_path / "preface.tex"
        fragment_path = temporary_path / "preface.html"
        source_path.write_text(normalized, encoding="utf-8")
        subprocess.run(
            [
                pandoc,
                str(source_path),
                "-f",
                "latex",
                "-t",
                "html5",
                "--mathjax",
                "--citeproc",
                f"--bibliography={book_dir / 'book_ot.bib'}",
                "-M",
                "reference-section-title=序言参考文献",
                "-o",
                str(fragment_path),
            ],
            check=True,
        )
        fragment = fragment_path.read_text(encoding="utf-8")

    (output_dir / "preface.generated.html").write_text(
        f"<!-- Generated from frontmatter/preface.tex; source sha256 {preface_hash}. Do not edit. -->\n{fragment}",
        encoding="utf-8",
    )

    volumes = parse_volumes(book_dir, pandoc)
    code_index = parse_code_index(book_dir)
    preface_sections = len(re.findall(r"\\section\*?\{", preface_source))
    module = (
        "// Generated from the authoritative OTE LaTeX and code directories. Do not edit.\n"
        f"export const volumes = {json.dumps(volumes, ensure_ascii=False, indent=2)};\n"
        f"export const codeIndex = {json.dumps(code_index, ensure_ascii=False, indent=2)};\n"
        f"export const bookMeta = {json.dumps({'sourceHash': preface_hash, 'prefaceSections': preface_sections, 'pages': 2024, 'chapters': 25}, ensure_ascii=False)};\n"
    )
    (output_dir / "book.generated.js").write_text(module, encoding="utf-8")
    print(f"Exported {sum(len(volume['chapters']) for volume in volumes)} chapters and {len(code_index)} code directories")


if __name__ == "__main__":
    main()
