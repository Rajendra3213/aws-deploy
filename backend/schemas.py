from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class AppointmentCreate(BaseModel):
    name: str
    email: str
    phone: str
    service: str
    appointment_date: str
    appointment_time: str
    meeting_type: str = "in-person"
    meet_link: Optional[str] = None

class AppointmentResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: str
    service: str
    appointment_date: str
    appointment_time: str
    meeting_type: str
    meet_link: Optional[str]
    created_at: datetime
    status: str

    class Config:
        from_attributes = True