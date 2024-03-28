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

- @adiwajshing/baileys (redefined)
- @adiwajshing/keyed-db
- mongodb
- axios
- chalk
- cron
- crypto-random-string
- jspdf
- module-alias
- winston

---

## 📝 Admin Features (strict)

- Manage product (access, upload, update/edit, delete)
- Manage orders (access, accept, reject, send invoices)
- Get single/all ongoing orders
- Get single/all transaction proof
- Get list products
- Access check shipping cost

---

## 📝 Customer Features (individual)

- Access catalogue
- Access products information
- Add product to bucket
- Make orders (dropship/pickup)
- Upload payment proof
- Receive invoices (image and PDF)
- Access purchase history
- Access data for completed order
- Access admin contact

## 💿 Installation

- Install the dependency module (required)

```cmd
$ npm install
```

- Install Nodemon globaly for development mode (optional)

```cmd
$ npm install nodemon -g
```

- Install PM2 globaly for run in production mode (optional)

```cmd
$ npm install -g pm2
```

- Create a mongodb atlas account and clusters, [see at youtube](https://www.youtube.com/results?search_query=how+to+create+mongodb+atlas+account)
- Get the MongoDB Atlas URIs, username, and password. Make sure the driver is set to nodejs
- Open `.ENV file` in root aplication, heres the ENV fields look like

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

# Override forwarded to Group, SUPERADMIN by default
# OVERRIDE_STATUS = SUPERADMIN / GROUP
OVERRIDE_STATUS = SUPERADMIN

# Group Metadata, a group id that can override forwarded orders instead sent to super admin.
# Yet, you still need to modify changes at ./config/settings/index.js and the change super admin to this env var
GROUP_ID_ONGOING_ORDERS = xxx@g.us.whatsapp.net
GROUP_ID_TRANSACTION = xxx@g.us.whatsapp.net

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

- Run the app using command

```cmd
$ node app.js
```

- Scan the QR to login
- Wait until the app configure the login state (eta 2-5 minutes), then close the app using key `CTRL + C` in terminal to terminate app
- Login successful, go to the next step

---

## PM2 Link (for production mode)

You can link PM2 using public and private key from official website [PM2 Keymetrics](https://pm2.keymetrics.io/)

- Go to App [PM2 IO](https://app.pm2.io/)
- Create buckets
- Copy the public and private key
- Paste it to terminal

---

## Run in Development Mode (auto restart if has file changes/modify)

Using command

```cmd
$ npm run dev
```

## Run in Normal Mode (no restart)

Using command, same as initial setup

```cmd
$ node app.js
```

## Run in Production Mode (auto restart)

The production run mode by default using cron restart interval set to 4 hours.

Or, you can modify the app name and restart interval in `package.json`.

Cronjob `--cron-restart=\"0 */4 * * *\"`1 is set to 4 hours, you can modify the number.

```json
"scripts": {
  "start": "node app.js --color",
  "prod": "pm2 start app.js --name \"Hani\" --cron-restart=\"0 */4 * * *\" && pm2 log",
  "dev": "nodemon app.js --color"
},
```

Using command to run in production mode

```cmd
$ npm run prod
```

---

## Data Structure

The chatbot has static data shape/structure, you can find the `types.d.ts` file in `./interface/...`. But also considering the app controller  to prevent app from crashing.

- Customer

```ts
export type CustomerMetadata = {
  customerId: string;
  tagName: string;
  phoneNumber: string;
  hniId?: string;
  registeredOn: string;
};

/**
 * Customer Buckets
 * A container for Customer to append product into bucket, and then make a checkout to process the order.
 */
export type Buckets = {
  /** ids for key of each element */
  id?: string;
  /** product id */
  productId: string;
  /** product names */
  productName: string;
  /** product category */
  category: ProductCategory;
  /** prices for each single product */
  price: number;
  /** poin gained each per product */
  poin: number;
  /** net weight each per product */
  weight: number;
  /** quantity of product for a single type product */
  qtyAmount: number;
  /** total price accumulated, `qty * price each` */
  totalPrice?: number;
  /** total poin accumulated, `qty * poin each` */
  totalPoin?: number;
  /** total weight accumulated, `qty * weight` */
  totalWeight?: number;
};

export type Order = {
  buckets: Buckets[];
  totalItem: number;
  totalPrice: number;
  totalPoin: number;
  totalWeight: number;
  totalExactPrice: number;
  additionalInfo: string;
  orderer: [name: string, phone: string, hniId?: string];
  expedition?: ExpeditionDetails;
  recipient: {
    adminNote?: string;
    metadata: [name: string, phone: string, hniId?: string];
    fullAddress?: [
      province: string,
      district: string,
      subDistrict: string,
      postalCode: string,
      details: string
    ];
    rajaOngkir: CourierResult[];
  };
};

export type Purchases = {
  orderId: string;
  orderType: OrderType;
  timeStamp: string;
  isCompleted: boolean;
  isPayed: boolean;
  payedVia: PaymentProvider;
  invoices?: CustomerInvoice;
  data: Order;
};

/**
 * Customer Data Shape
 */
export type Customer = {
  metadata: CustomerMetadata;
  data: {
    buckets: Buckets[];
    purchaseHistory: Purchases[];
  };
};
```

- Product Data

```ts
export type ProductCategory = "herbal" | "beverages" | "cosmetics";
export type ProductDataInfo = {
  title: string;
  category: ProductCategory;
  price: number;
  memberPrice: number;
  stock: number;
  sold: number;
  poin: number;
  weight: number;
  image: string;
  description: string;
};

export type Product = {
  productId: string;
  timeStamp: string;
  data: ProductDataInfo;
};
```

- Order Data

```ts
export type StatusOrder =
  | "never-order" // default status, indicates customer has never order or not found with exact search parameter
  | "pending" // status when customer submit form order
  | "forwarded" // status when customer confirm order with orderId
  | "confirmed" // status when admin receive and confirm ordered stuff availabe
  | "completed"; // status when the order has successfully completed

export type ExpeditionProvider = "JNE" | "TIKI" | "POS" | "NOT-SET";

export type AdminConfirmedData = {
  hashId: string;
  totalExactPrice: number;
  expedition: ExpeditionDetails;
};

/**
 * @property Customer
 * Data individual (data pemesanan keseluruhan), relasi dengan data Customer.
 */
export type CustomerOrderData = {
  /** Orderer Phone Number */
  ordererId: string;
  ordererName: string;
  hniId?: string;
  status: StatusOrder;
  metadata: AdminConfirmedData;
  data: Purchases;
};
```

- Payment Data

```ts
export type CustomerPaymentProof = {
  timeStamp: string;
  isVerified: boolean;
  metadata: {
    orderId: string;
    transactionId: string;
  };
  payer: {
    custId?: string;
    tagName: string;
    phoneNumber: string;
  };
  payment: {
    via: PaymentProvider;
    nominal: number;
    image: string;
  };
};
```

- Completed Order

```ts
export type ApprovalOrderData = {
  orderType: OrderType;
  orderId: string;
  transactionId: string;
  timeStamp: string;
  invoice: CustomerInvoice;
  metadata: {
    custId: string;
    orderer: string;
    phone: string;
    hniId: string;
    info: string;
    adminNotes: string;
  };
  payment: {
    product: number;
    expFees: number;
    via: PaymentProvider;
    nominal: number;
  };
  expedition: ExpeditionDetails;
  products: Buckets[];
};
```

---

## Controllers

You can find the class controller of the whole app in `./controllers/...`. The controller is split into two folder `admin` and `customer`.
List of all class controller

- Admin, this class is not instanceable

```ts
class Moderation {
  // class children
}

class Admin {
  // class children
}
```

- Customer, this class is not instanceable

```ts
class Customer {
  // class children
}
```

## Template Message

You can find the locale text message template in `./config/messages/locale.js`, this contain msg object `commonAdminRegularMessage` and `commonCustomerRegularMessage`.

The root of function message is on `./config/messages/index.js`.

```ts
const {
  commonAdminRegularMessage,
  commonCustomerRegularMessage,
} = require("./locale");

/**
 * Customer Message Template
 * @param { Partial<keyof typeof commonCustomerRegularMessage> } messageKey
 * @returns { string | (value: string) => string }
 */
function commonMessage(messageKey) {
  return commonCustomerRegularMessage[messageKey];
}

/**
 * Admin Message Template
 * @param { Partial<keyof typeof commonAdminRegularMessage> } messageKey
 * @returns { string | (value: string) => string }
 */
function moderationMessage(messageKey) {
  return commonAdminRegularMessage[messageKey];
}
```

## Close

Special thanks to God, me, and my Computer :)
