# 🛍️ Product CRUD App

A simple React-based CRUD application where:

- **Admins** can **add**, **update**, and **delete** products (name, image, price).
- **Users** can **view all products** through a clean and responsive UI.

---

## ✨ Features

- Add a new product with name, image URL, and price
- Edit product details
- Delete any product
- Browse all products with styled UI
- Filter/search bar for easy navigation (if implemented)
- Responsive design for mobile & desktop

---

## 🛠️ Tech Stack

- **Frontend:** ReactJS, JSX, CSS
- **State Management:** useState, useEffect
- **Styling:** CSS Modules

---

## 📁 Folder Structure

product-crud-app/ ├── client/ │ ├── public/ │ │ ├── index.html │ │ └── ... │ ├── src/ │ │ ├── components/ │ │ │ ├── ProductCard.jsx │ │ │ ├── ProductCard.css │ │ │ └── FilterBar.jsx │ │ ├── pages/ │ │ │ └── AddProductPage.jsx │ │ ├── App.js │ │ ├── index.js │ │ └── index.css │ ├── package.json │ └── ...
server/
├── node_modules/
├── src/
│   ├── config/
│   │   └── dbconfig.js          # Database connection setup
│   ├── controllers/
│   │   └── CarController.js     # Handles business logic for car CRUD operations
│   ├── middleware/
│   │   └── upload.js            # Middleware for file/image uploads
│   ├── models/
│   │   └── Cars.js              # Mongoose/Sequelize model for cars
│   └── routes/
│       └── CarRoutes.js         # API routes for product/car operations
├── uploads/                     # Stores uploaded images
├── .env                         # Environment variables
├── server.js                    # Entry point for Express server
├── package.json
└── package-lock.json
