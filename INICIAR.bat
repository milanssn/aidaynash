@echo off
cd /d "%~dp0"
if not exist backend\node_modules\express call npm run setup
call npm start
pause
