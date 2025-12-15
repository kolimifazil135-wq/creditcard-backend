from pydantic import BaseModel

class PaymentCreate(BaseModel):
    user_id: int
    amount: float

class PaymentResponse(BaseModel):
    id: int
    user_id: int
    amount: float
    status: str

    class Config:
        orm_mode = True
