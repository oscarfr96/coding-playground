from uuid import UUID

from sqlalchemy.dialects import postgresql

from school_assistant.services.students import get_student_summary


class _Mappings:
    def one_or_none(self):
        return None


class _Execution:
    def mappings(self):
        return _Mappings()


class _FakeSession:
    statement = None

    def execute(self, statement):
        self.statement = statement
        return _Execution()


def test_student_lookup_binds_requested_student_and_authenticated_tutor() -> None:
    student_id = UUID("550e8400-e29b-41d4-a716-446655440003")
    teacher_id = UUID("550e8400-e29b-41d4-a716-446655440001")
    db = _FakeSession()

    result = get_student_summary(student_id, teacher_id, db)

    compiled = db.statement.compile(dialect=postgresql.dialect())
    sql = str(compiled)
    bound_values = set(compiled.params.values())
    assert result is None
    assert "students.student_id =" in sql
    assert "students.tutor_id =" in sql
    assert student_id in bound_values
    assert teacher_id in bound_values
