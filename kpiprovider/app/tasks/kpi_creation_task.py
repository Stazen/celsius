import asyncio
import schedule
import time
from app.routers.KPI_router import create_kpi


def run_scheduler():
    while True:
        schedule.run_pending()
        time.sleep(1)

def job_wrapper():
    asyncio.run(create_kpi("66505129158e47acfa6e4c10"))

schedule.every().day.at("11:04:00").do(job_wrapper)
