import datetime
from sqlite3 import Date
from pydantic import BaseModel, BeforeValidator, ConfigDict, EmailStr, Field
from typing import Annotated, Optional

PyObjectId = Annotated[str, BeforeValidator(str)]

class data_model(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    sensorId: int = Field(...)
    date: datetime = Field(...)
    co2: int = Field(...)
    presence: bool = Field(...)
    heating: bool = Field(...)
    incident: bool = Field(...)
    temperature: float = Field(...)
    humidity: float = Field(...)
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "sensorId": 1,
                "date": "2024-04-23T08:45:09",
                "co2": 784,
                "presence": False,
                "heating": True,
                "incident": True,
                "temperature": 16.721038818359375,
                "humidity": 58.917236328125,
            }
        },
    )