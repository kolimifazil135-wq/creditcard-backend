from sqlalchemy import Column, Integer, String, Float
from .database import Base

class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    amount = Column(Float)
    status = Column(String(20))  # PENDING, SUCCESS, FAILED
