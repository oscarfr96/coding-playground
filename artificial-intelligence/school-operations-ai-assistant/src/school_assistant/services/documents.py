"""Small, local lexical retriever for the fictional school policy corpus.

This intentionally avoids sending document contents to an embedding provider.
It is a teaching MVP: paragraph chunks are ranked by query-term overlap, not a
production semantic/vector search implementation.
"""

from __future__ import annotations

import re
from pathlib import Path

from ..schemas import SchoolDocumentChunk, SearchSchoolDocumentsInput

CORPUS_DIRECTORY = Path(__file__).resolve().parents[3] / "docs"
MAX_CHUNK_CHARACTERS = 1_200
MAX_RESULTS = 3
_WORD_PATTERN = re.compile(r"[\wáéíóúüñ]+", re.IGNORECASE)
_STOP_WORDS = {
    "como", "con", "cual", "cuando", "de", "del", "el", "en", "es",
    "la", "las", "lo", "los", "para", "por", "que", "se", "si", "un",
    "una", "y", "ante", "sobre", "the", "and", "for", "with", "what",
}


def search_school_documents(
    request: SearchSchoolDocumentsInput,
) -> list[SchoolDocumentChunk]:
    """Return up to three relevant chunks from the reviewed local corpus."""
    query_terms = _terms(request.query)
    if not query_terms:
        return []

    ranked: list[tuple[int, str, str]] = []
    for path in sorted(CORPUS_DIRECTORY.glob("*.md")):
        # Corpus files are maintained with the application; no user-supplied path
        # is ever opened here.
        text = path.read_text(encoding="utf-8")
        for chunk in _chunks(text):
            chunk_terms = _terms(chunk)
            score = sum(chunk_terms.count(term) for term in query_terms)
            if score:
                ranked.append((score, path.name, chunk))

    ranked.sort(key=lambda result: (-result[0], result[1], result[2]))
    return [
        SchoolDocumentChunk(source=source, text=text)
        for _, source, text in ranked[:MAX_RESULTS]
    ]


def _terms(text: str) -> list[str]:
    return [
        term
        for term in _WORD_PATTERN.findall(text.lower())
        if len(term) > 2 and term not in _STOP_WORDS
    ]


def _chunks(text: str) -> list[str]:
    paragraphs = [part.strip() for part in re.split(r"\n\s*\n", text) if part.strip()]
    chunks: list[str] = []
    for paragraph in paragraphs:
        if len(paragraph) <= MAX_CHUNK_CHARACTERS:
            chunks.append(paragraph)
            continue
        # Long paragraphs are split on sentence boundaries, with a hard bound.
        current = ""
        for sentence in re.split(r"(?<=[.!?])\s+", paragraph):
            if current and len(current) + len(sentence) + 1 > MAX_CHUNK_CHARACTERS:
                chunks.append(current)
                current = ""
            current = f"{current} {sentence}".strip()
        if current:
            chunks.append(current[:MAX_CHUNK_CHARACTERS])
    return chunks
