"""Integración opcional: carga de Google Docs mediante OAuth local."""

import argparse
from pathlib import Path

from llm_playground.config import DATA_DIR


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--folder-id", required=True)
    parser.add_argument("--credentials", type=Path, required=True)
    args = parser.parse_args()
    if not args.credentials.is_file():
        parser.error("No existe el archivo de credenciales OAuth.")
    from langchain_google_community import GoogleDriveLoader

    token_dir = DATA_DIR / "google"
    token_dir.mkdir(parents=True, exist_ok=True)
    loader = GoogleDriveLoader(
        folder_id=args.folder_id,
        credentials_path=str(args.credentials.resolve()),
        token_path=str(token_dir / "token.json"),
        file_types=["document"],
        recursive=False,
    )
    for doc in loader.load():
        print(doc.metadata)
        print(doc.page_content)


if __name__ == "__main__":
    main()
