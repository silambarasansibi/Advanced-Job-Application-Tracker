Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run start"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend/frontend; npm run dev"
