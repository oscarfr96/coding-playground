import json
from pathlib import Path

from school_assistant.schemas import SearchSchoolDocumentsInput
from school_assistant.services.documents import search_school_documents

SCENARIOS_PATH = Path(__file__).with_name("golden_scenarios.json")


def test_golden_scenario_set_has_twenty_valid_cases() -> None:
    scenarios = json.loads(SCENARIOS_PATH.read_text(encoding="utf-8"))

    assert len(scenarios) == 20
    assert {scenario["category"] for scenario in scenarios} >= {
        "students", "rag", "security", "api"
    }
    assert all(scenario["expected_tool"] in {
        "none", "get_student_summary", "search_school_documents"
    } for scenario in scenarios)


def test_golden_rag_scenarios_retrieve_a_source() -> None:
    scenarios = json.loads(SCENARIOS_PATH.read_text(encoding="utf-8"))

    for scenario in scenarios:
        if scenario["category"] != "rag":
            continue
        results = search_school_documents(
            SearchSchoolDocumentsInput(query=scenario["input"])
        )
        assert results, scenario["id"]
