from datetime import datetime, timedelta
import random
from pydantic import BaseModel, BeforeValidator, ConfigDict, EmailStr, Field
from typing import Annotated, Optional

PyObjectId = Annotated[str, BeforeValidator(str)]

class kpi_model(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    avgDailyIncidentNumber: float = Field(...)
    mostIncidentHourRange: str = Field(...)
    date: datetime = Field(...)
    presenceRate: float = Field(...)
    mostIncidentBuilding: str = Field(...)
    daysWithoutIncident: int = Field(...)
    incidentPerDay: list = Field(...)
    companyID: Optional[PyObjectId] = Field(alias="_id", default=None)
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "avgDailyIncidentNumber": 3.456,
                "date": "2024-04-23T08:45:09",
                "mostIncidentHourRange": "12-18",
                "presenceRate": 95.675,
                "mostIncidentBuilding": "Ecole",
                "daysWithoutIncident": 3,
                "incidentPerDay":[{"name":"18/03","incident":4}],
                "companyID":'657c43c4674288f3d3ffd534'
            }
        },
    )