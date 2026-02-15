@echo off
echo ============================================================
echo Starting ParaDetect AI Frontend
echo ============================================================
echo.
echo Installing dependencies (first time only)...
cd frontend
call npm install
echo.
echo Starting development server...
echo Frontend will be available at: http://localhost:5173
echo.
echo Press Ctrl+C to stop the server
echo ============================================================
echo.
call npm run dev
