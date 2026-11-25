"""MMR y multiquery sobre un corpus de contratos de demostración."""

from llm_playground.rag import answer_question, multi_query


def reciprocal_rank_fusion(rankings: list[list], weights: list[float], *, limit: int = 4) -> list:
    """Fusiona rankings de recuperación; el resultado no es una probabilidad."""
    scores, documents = {}, {}
    for ranking, weight in zip(rankings, weights, strict=True):
        seen = set()
        for rank, doc in enumerate(ranking, 1):
            key = (doc.metadata.get("source"), doc.metadata.get("page"), doc.page_content)
            if key in seen:
                continue
            seen.add(key)
            documents[key] = doc
            scores[key] = scores.get(key, 0.0) + weight / (60 + rank)
    return [documents[key] for key in sorted(scores, key=scores.get, reverse=True)[:limit]]


def query_rag(question: str, store, llm):
    if not question.strip():
        raise ValueError("Escribe una consulta.")
    mmr = store.as_retriever(
        search_type="mmr",
        search_kwargs={"k": 3, "fetch_k": 12, "lambda_mult": 0.7},
    )
    expanded = multi_query(question, mmr, llm, limit=6)
    similar = store.similarity_search(question, k=3)
    documents = reciprocal_rank_fusion([expanded, similar], [0.7, 0.3])
    # La respuesta y los fragmentos de la UI proceden de esta única recuperación.
    return answer_question(question, documents, llm)
