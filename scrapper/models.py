from sqlalchemy import Column, Integer, String, JSON, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Company(Base):
    __tablename__ = 'companies'
    
    id = Column(Integer, primary_key=True)
    name = Column(String, index=True)
    legal_form = Column(String)
    industry = Column(String)
    address = Column(JSON)  # {street, city, zip, country}
    phones = Column(JSON)   # array of strings
    emails = Column(JSON)   # array of strings
    website = Column(String)
    founding_year = Column(Integer)
    size = Column(String)
    management = Column(JSON)  # array of {name, position, contact}
    patents = Column(JSON)     # array of strings
    certifications = Column(JSON)  # array of strings
    source_url = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)