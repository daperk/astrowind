@echo off
REM SleepUpgradeHub daily auto-publish: generates and publishes 1 post/day from
REM the keyword queue (Claude -> Pexels image -> markdown -> git push -> Vercel -> IndexNow).
REM Registered in Windows Task Scheduler as "SleepUpgradeHub Daily Post".

cd /d "C:\Users\06123\GitHub\astrowind"
if not exist "scripts\logs" mkdir "scripts\logs"

echo. >> "scripts\logs\daily_post.log"
echo ===== %DATE% %TIME% ===== >> "scripts\logs\daily_post.log"
"C:\Users\06123\AppData\Local\Python\pythoncore-3.14-64\python.exe" scripts\batch.py --site sleepupgradehub --count 1 >> "scripts\logs\daily_post.log" 2>&1
