from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from database import SessionLocal, engine, get_db
from models import Base, Appointment
from schemas import AppointmentCreate, AppointmentResponse

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Appointment Booking API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allows all origins, adjust as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/appointments/", response_model=AppointmentResponse)
def create_appointment(appointment: AppointmentCreate, db: Session = Depends(get_db)):
    db_appointment = Appointment(**appointment.dict())
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

@app.get("/appointments/", response_model=List[AppointmentResponse])
def get_appointments(db: Session = Depends(get_db)):
    return db.query(Appointment).all()

@app.get("/appointments/{appointment_id}", response_model=AppointmentResponse)
def get_appointment(appointment_id: int, db: Session = Depends(get_db)):
    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return appointment

@app.delete("/appointments/{appointment_id}")
def delete_appointment(appointment_id: int, db: Session = Depends(get_db)):
    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    db.delete(appointment)
    db.commit()
    return {"message": "Appointment deleted"}

@app.put("/appointments/{appointment_id}/status")
def update_appointment_status(appointment_id: int, status: str, db: Session = Depends(get_db)):
    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    appointment.status = status
    db.commit()
    return appointment

@app.get("/")
def root():
    return {"message": "Appointment Booking API"}