from enum import Enum
from uuid import UUID, uuid4

from sqlalchemy import ForeignKey, Text
from sqlalchemy.dialects.postgresql import ENUM as PostgreSQLEnum
from sqlalchemy.dialects.postgresql import UUID as PostgreSQLUUID
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    """Base class that collects SQLAlchemy model metadata."""


class AcademicStatus(str, Enum):
    GOOD_STANDING = "Good Standing"
    PROBATION = "Probation"
    SUSPENDED = "Suspended"


academic_status_type = PostgreSQLEnum(
    AcademicStatus,
    name="academic_status",
    values_callable=lambda statuses: [status.value for status in statuses],
    create_type=False,
)


class Teacher(Base):
    __tablename__ = "teachers"

    teacher_id: Mapped[UUID] = mapped_column(
        PostgreSQLUUID(as_uuid=True), primary_key=True, default=uuid4
    )
    name: Mapped[str] = mapped_column(Text, nullable=False)

    students: Mapped[list["Student"]] = relationship(back_populates="tutor")


class SchoolClass(Base):
    __tablename__ = "classes"

    class_id: Mapped[UUID] = mapped_column(
        PostgreSQLUUID(as_uuid=True), primary_key=True, default=uuid4
    )
    name: Mapped[str] = mapped_column(Text, nullable=False)

    students: Mapped[list["Student"]] = relationship(back_populates="school_class")


class Student(Base):
    __tablename__ = "students"

    student_id: Mapped[UUID] = mapped_column(
        PostgreSQLUUID(as_uuid=True), primary_key=True, default=uuid4
    )
    name: Mapped[str] = mapped_column(Text, nullable=False)
    class_id: Mapped[UUID] = mapped_column(
        PostgreSQLUUID(as_uuid=True),
        ForeignKey("classes.class_id"),
        nullable=False,
    )
    tutor_id: Mapped[UUID] = mapped_column(
        PostgreSQLUUID(as_uuid=True),
        ForeignKey("teachers.teacher_id"),
        nullable=False,
    )
    academic_status: Mapped[AcademicStatus | None] = mapped_column(
        academic_status_type,
        nullable=True,
    )

    school_class: Mapped[SchoolClass] = relationship(back_populates="students")
    tutor: Mapped[Teacher] = relationship(back_populates="students")
