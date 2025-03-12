import os
from dotenv import load_dotenv
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
import uvicorn
from app.routers import KPI_router, fake_router
from app.settings import database
from app.tasks.kpi_creation_task import run_scheduler
import threading


load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = os.getenv("ALLOWED_ORIGINS"),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(KPI_router.router)
app.include_router(fake_router.router)

scheduler_thread = threading.Thread(target=run_scheduler)
scheduler_thread.daemon = True  
scheduler_thread.start()
