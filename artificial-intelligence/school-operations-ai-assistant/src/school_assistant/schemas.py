from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, field_validator

MAX_ASSISTANT_QUESTION_LENGTH = 4_000


class StudentSummary(BaseModel):
    student_id: UUID
    name: str
    course: str
    tutor: str
    academic_status: str | None


class GetStudentSummaryInput(BaseModel):
    model_config = ConfigDict(extra="forbid")

    student_id: UUID = Field(
        description="UUID of the student whose summary is requested."
    )


class StudentSummaryToolResult(BaseModel):
    """Structured result returned by the MCP student lookup tool."""

    found: bool = Field(description="Whether the student is available to this tutor.")
    student: StudentSummary | None = None


class SearchSchoolDocumentsInput(BaseModel):
    """A bounded search query over approved school reference documents."""

    model_config = ConfigDict(extra="forbid")

    query: str = Field(min_length=3, max_length=500)

    @field_validator("query")
    @classmethod
    def query_must_not_be_blank(cls, value: str) -> str:
        value = value.strip()
        if len(value) < 3:
            raise ValueError("Search query must contain at least three characters.")
        return value


class SchoolDocumentChunk(BaseModel):
    source: str
    text: str


class SearchSchoolDocumentsResult(BaseModel):
    chunks: list[SchoolDocumentChunk]


class AssistantRequest(BaseModel):
    """A bounded, user-provided question for the AI assistant."""

    model_config = ConfigDict(extra="forbid")

    question: str = Field(min_length=1, max_length=MAX_ASSISTANT_QUESTION_LENGTH)

    @field_validator("question")
    @classmethod
    def question_must_not_be_blank(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("Question must contain non-whitespace characters.")
        return value


class AssistantResponse(BaseModel):
    """Stable response contract returned by the assistant API."""

    model_config = ConfigDict(extra="forbid")

    answer: str
