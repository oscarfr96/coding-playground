"""Student-related application services."""

from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from ..database.models import SchoolClass, Student, Teacher
from ..schemas import StudentSummary


def get_student_summary(
    student_id: UUID,
    teacher_id: UUID,
    db: Session,
) -> StudentSummary | None:
    """Return a student's summary if they are assigned to the given tutor."""
    statement = (
        select(
            Student.student_id,
            Student.name,
            SchoolClass.name.label("course"),
            Teacher.name.label("tutor"),
            Student.academic_status,
        )
        .join(Student.school_class)
        .join(Student.tutor)
        .where(
            Student.student_id == student_id,
            Student.tutor_id == teacher_id,
        )
    )

    student = db.execute(statement).mappings().one_or_none()
    if student is None:
        return None

    return StudentSummary.model_validate(student)
