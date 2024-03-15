echo "> Memulai aplikasi Chatbot Production Mode..."

echo "> Setup Runtime menggunakan PM2 -- Node.js Process Manager - selengkapnya melalui: https://pm2.keymetrics.io/"

pm2 start app.js --cron-restart="0 0 */5 * * *"

echo "Membuka logging App"

pm2 logs