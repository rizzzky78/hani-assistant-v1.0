<div align="center">
<img src="https://raw.githubusercontent.com/rizzzky78/rizzzkyRepo/main/picture/Chatbot%20HANI%20BC%20Cilacap%203.png" width="150" height="150" border="0" alt="PFP">

## Chatbot HANI BC Cilacap 3
Lightweight, Customizable WhatsApp Bot

<p align="center">
  <a href="https://github.com/LoL-Human"><img title="Author" src="https://img.shields.io/badge/Author-Rizky-blueviolet.svg?style=for-the-badge&logo=github" /></a>
</p>

## [![JavaScript](https://img.shields.io/badge/JavaScript-d6cc0f?style=for-the-badge&logo=javascript&logoColor=white)](https://www.javascript.com) [![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/) [![MongoDB](https://img.shields.io/badge/MongoDB-000000?style=for-the-badge&logo=MongoDB&logoColor=green)](https://www.mongodb.com)

</div>

## Library Used

-   @adiwajshing/baileys (redefined)
-   @adiwajshing/keyed-db
-   mongodb
-   axios
-   chalk
-   cron
-   crypto-random-string
-   jspdf
-   module-alias
-   winston
  
---

## 📝 Admin Features (strict)

-   Manage product (access, upload, update/edit, delete)
-   Manage orders (access, accept, reject, send invoices)
-   Get single/all ongoing orders
-   Get single/all transaction proof
-   Get list products
-   Access check shipping cost

---

## 📝 Customer Features (individual)
-   Access catalogue
-   Access products information
-   Add product to bucket
-   Make orders (dropship/pickup)
-   Upload payment proof
-   Receive invoices (image and PDF)
-   Access purchase history
-   Access data for completed order
-   Access admin contact

## 💿 Installation

-   Install the dependency module (required)
```cmd
$ npm install
```
-   Install Nodemon globaly for development mode (optional)
```cmd
$ npm install nodemon -g
```
-   Install PM2 globaly for run in production mode (optional)
```cmd
$ npm install -g pm2
```
-   Create a mongodb atlas account and clusters, [see at youtube](https://www.youtube.com/results?search_query=how+to+create+mongodb+atlas+account)
-   Open `.ENV file` in root aplication, heres the ENV fields look like
```env
# CONFIGURATION

# MODE = DEVELOPMENT / PRODUCTION , switch the run mode
MODE = DEVELOPMENT

# MongoDB Atlas URI, place your mongodb uri in here
MONGODB_URI = YOUR_MONGODB_URI

# bellow can be modified
# DEV: Chatbot-Development
# PROD: Halal-Mart-BC-Cilacap-3-2023
DB_NAME = Chatbot-Development

RAJA_ONGKIR_APIKEY = YOUR_RAJA_ONGKIR_APIKEY

# METADATA

# Session Developer, can be modified
SESSION_DEV = Developers
# Session Production, can be modified
SESSION_PROD = HalalMartBC3

# Chatbot Name, can be modified
CHATBOT_NAME = Chatbot HANI
# Marketplace Name, can be modified
MARKETPLACE_NAME = Halal Mart BC Cilacap 3
# Organization Name, can be modified
ORGANIZATION_NAME = HNI HPAI

# SUPER ADMIN, the contact for chatbot to sent the forwarded orders data
SUPER_ADMIN_NAME = Rizky
SUPER_ADMIN_PHONE = 6281329585825
SUPER_ADMIN_ID = 6281329585825@s.whatsapp.net

# COMMON ADMIN
ADMIN_1_NAME = Rizky Example
ADMIN_1_PHONE = 6281329585825
ADMIN_1_PHONE_ID = 6281329585825@s.whatsapp.net
ADMIN_1_ROLE = Owner Marketplace

ADMIN_2_NAME = Example Admin
ADMIN_2_PHONE = 6281329585825
ADMIN_2_PHONE_ID = 6281329585825@s.whatsapp.net
ADMIN_2_ROLE = Developer Chatbot

# Group Metadata, a group id that can override forwarded orders instead sent to super admin.
# Yet, you still need to modify changes at ./config/settings/index.js and the change super admin to this env var
GROUP_ID_ONGOING_ORDERS = xxx@g.us.whatsapp.net
GROUP_ID_TRANSACTION = xxx@g.us.whatsapp.net
GROUP_ID_COMPLETED_ORDERS = xxx@g.us.whatsapp.net

# List Payment, bellow can be modified, do not delete, you can modify the array payment at ./config/settings/index.js
PAYMENT_1_PROVIDER = BSI
PAYMENT_1_KEY = 081238392789
PAYMENT_1_ON_BEHALF = Rzky

PAYMENT_2_PROVIDER = BRI
PAYMENT_2_KEY = 081238392789
PAYMENT_2_ON_BEHALF = Rzky

PAYMENT_3_PROVIDER = GOPAY
PAYMENT_3_KEY = 081238392789
PAYMENT_3_ON_BEHALF = Rzky

PAYMENT_4_PROVIDER = BCA
PAYMENT_4_KEY = 081238392789
PAYMENT_4_ON_BEHALF = Rzky

PAYMENT_5_PROVIDER = DANA
PAYMENT_5_KEY = 081238392789
PAYMENT_5_ON_BEHALF = Rzky
```
-   Run the app using command
```cmd
$ node app.js
```
-   Scan the QR to login
-   Wait until the app configure the login state (eta 2-5 minutes), then close the app using key `CTRL + C` in terminal to terminate app
-   Login successful, go to the next step

---

## PM2 Link (for production mode)
You can link PM2 using public and private key from official website [PM2 Keymetrics](https://pm2.keymetrics.io/)
-  Go to App [PM2 IO](https://app.pm2.io/)
-  Create buckets
-  Copy the public and private key
-  Paste it to terminal

---

## Run in Development Mode
Using command
```cmd
$ npm run dev
```

---

```cmd
$ pkg install git sqlite python make -y
$ npm install sqlite3 --build-from-source --sqlite=/data/data/com.termux/files/usr/bin/sqlite3
```

-   Installing nodejs package & migrating

```cmd
$ npm install
```

---

## ▶️ Run

-   Production mode

```cmd
$ npm start
```

-   Develelopment mode

```cmd
$ npm i -g nodemon
$ nodemon
```

---

## 💪 Contributing

-   Feel free to open an issue regarding any issue or if you have any feature requests
-   If you want to contribute
    1. Fork this repository
    2. Edit / change what you want, for example you want to add features / fix bugs
    3. Test first
    4. You can submit a pull request

---

## 🙏 Special Thanks To

-   Allah SWT
-   [Adiwajshing - Baileys](https://github.com/adiwajshing/Baileys)
-   [Faiz Bastomi](https://github.com/FaizBastomi/)
-   [Pais](https://github.com/Paiiss)
