Virtual environment:  
py -3 -m venv .venv  
.venv\Scripts\activate  
deactivate  

Running the app:  
python -m uvicorn main:app --port 8000  
python -m uvicorn main:app --port 8000 --reload #HotReload  
  
swagger : http://localhost:PORT/docs  