@echo off
cd /d "%~dp0"
echo Starting VZV.cz prototype on http://127.0.0.1:8080/
python start-server.py
if errorlevel 1 py -3 start-server.py
pause
