from fastapi import FastAPI, HTTPException
from payment_api.database import SessionLocal
from payment_api.models import Payment
from payment_api.schemas import PaymentCreate, PaymentResponse
import random

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/payment/create", response_model=PaymentResponse)
def create_payment(payment: PaymentCreate):
    db = next(get_db())
    new_payment = Payment(
        user_id=payment.user_id,
        amount=payment.amount,
        status="PENDING"
    )
    db.add(new_payment)
    db.commit()
    db.refresh(new_payment)
    return new_payment


@app.get("/payment/status/{payment_id}", response_model=PaymentResponse)
def get_status(payment_id: int):
    db = next(get_db())
    payment = db.query(Payment).filter(Payment.id == payment_id).first()

    if not payment:
        raise HTTPException(status_code=404, detail="Payment Not Found")

    return payment


@app.put("/payment/process/{payment_id}", response_model=PaymentResponse)
def process_payment(payment_id: int):
    db = next(get_db())
    payment = db.query(Payment).filter(Payment.id == payment_id).first()

    if not payment:
        raise HTTPException(status_code=404, detail="Payment Not Found")

    if payment.status != "PENDING":
        raise HTTPException(status_code=400, detail="Payment Already Processed")

    payment.status = random.choice(["SUCCESS", "FAILED"])
    db.commit()
    db.refresh(payment)
    return payment
