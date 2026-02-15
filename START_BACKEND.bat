@echo off
echo ============================================================
echo Starting ParaDetect AI Backend Server
echo ============================================================
echo.
echo Server will be available at: http://localhost:8000
echo API Documentation: http://localhost:8000/docs
echo Health Check: http://localhost:8000/health
echo.
echo Press Ctrl+C to stop the server
echo ============================================================
echo.
cd backend
python -m uvicorn app_pytorch:app --host 0.0.0.0 --port 8000 --reload
