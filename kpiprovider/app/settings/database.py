import os
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient

def mongodb_connect(database, collection):
    client = AsyncIOMotorClient(os.environ["MONGODB_URL"])
    db = client.get_database(database)
    return db.get_collection(collection)

def mongodb_connection(database, collection):
    client = MongoClient(os.environ["MONGODB_URL"])
    db = client.get_database(database)
    return db.get_collection(collection)