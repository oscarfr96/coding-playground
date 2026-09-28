from uuid import UUID

from fastapi import Depends, FastAPI, HTTPException, Security
from sqlalchemy.orm import Session

from .database.session import get_db
from .schemas import StudentSummary
from .security import get_current_teacher_id
from .services.students import get_student_summary


app = FastAPI(
    swagger_ui_init_oauth={
        "clientId": "school-assistant-api",
        "usePkceWithAuthorizationCodeGrant": True,
    }
)

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/students/{student_id}", response_model=StudentSummary)
def get_student(
    student_id: UUID,
    db: Session = Depends(get_db),
    teacher_id: UUID = Security(get_current_teacher_id, scopes=["openid"]),
) -> StudentSummary:
    summary = get_student_summary(
        student_id=student_id,
        teacher_id=teacher_id,
        db=db,
    )
    if summary is None:
        raise HTTPException(status_code=404, detail="Student not found")

    return summary
