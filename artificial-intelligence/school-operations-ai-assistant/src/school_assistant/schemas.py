from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


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
