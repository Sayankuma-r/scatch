# 👜 Scatch – Exclusive Bag Shopping Platform

Scatch is a web-based bag shopping platform designed to provide a smooth and elegant online shopping experience. It includes product browsing, user authentication, and product management features through an administrative interface.

## ✨ Features

- **Product Catalog:** Browse available bags and products.
- **User Authentication:** Register, log in, and log out securely.
- **Admin Dashboard:** Manage the product catalog.
- **Product Management:** Create and delete products.
- **Image Uploads:** Upload product images or select existing designs.
- **Session Management:** Maintain user sessions and authentication.
- **Responsive Storefront:** Clean and modern shopping interface.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime |
| Express.js | Web application framework |
| MongoDB | Database |
| Mongoose | Database modeling |
| EJS | Server-side rendering |
| JavaScript | Application logic |
| CSS | Styling |
| JWT | Authentication |
| bcrypt | Password hashing |
| Multer | Image uploads |

## 📁 Project Structure

```text
scatch/
│
├── config/
│   ├── mongoose-connection.js
│   └── multer-config.js
│
├── controllers/
│   └── Authentication controllers
│
├── middlewares/
│   └── Authentication middleware
│
├── models/
│   ├── user-model.js
│   ├── product-model.js
│   └── owner-model.js
│
├── public/
│   ├── images/
│   ├── stylesheets/
│   └── javascripts/
│
├── routes/
│   ├── index.js
│   ├── usersRouter.js
│   ├── productsRouter.js
│   └── ownersRouter.js
│
├── utils/
├── views/
├── designs/
│
├── .env.example
├── .gitignore
├── app.js
├── package.json
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Sayankuma-r/scatch.git
```

### 2. Navigate to the project

```bash
cd scatch
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory.

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/scatch
JWT_KEY=your_jwt_secret
EXPRESS_SESSION_SECRET=your_session_secret
```

Replace the example secrets with your own secure values.

### 5. Start the application

Development:

```bash
npm run dev
```

Or:

```bash
npm start
```

### 6. Open in browser

```text
http://localhost:3000
```

## 🔐 Security

- Password hashing using bcrypt.
- JWT-based authentication.
- Session management.
- Environment variables for sensitive configuration.
- `.env` excluded from version control.

## 🔮 Future Improvements

- Shopping cart and checkout enhancements.
- Payment gateway integration.
- Product search and filtering.
- Product reviews and ratings.
- Order tracking.
- Wishlist functionality.
- Cloud-based image storage.
- Enhanced admin analytics.

## 👨‍💻 Developer

**Sayan Kumar**

GitHub: [@Sayankuma-r](https://github.com/Sayankuma-r)

Project: [Scatch](https://github.com/Sayankuma-r/scatch)

---

⭐ If you like this project, consider giving the repository a star!

