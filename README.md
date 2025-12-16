# 💸 Expense Tracker — Full Stack Application

A modern **full‑stack Expense Tracker** application built using **React** on the frontend and **Node.js (Express) + MongoDB** on the backend.
It provides **secure authentication**, **OTP‑based verification**, **password reset**, and a **clean, interactive dashboard** to manage daily expenses efficiently.

---

## 🚀 Live Demo

* **Frontend:** [https://extracker-web-app.onrender.com]
* **Backend API:** [https://extraker-project-server.onrender.com]

---

## ✨ Features

### 🔐 Authentication & Security

* JWT‑based authentication
* HttpOnly cookies for enhanced security
* OTP verification via email
* Forgot / Reset password flow
* Protected routes

### 📊 Expense Management

* Add, edit, and delete expenses
* Category‑wise expense tracking
* Date‑based filtering
* Interactive charts & summaries

### 🖥️ User Experience

* Responsive UI
* Clean dashboard layout
* Form validation with error handling
* Loading & success states
* Light/Dark Mode

---

## 🧱 Tech Stack

### Frontend

* React
* Redux Toolkit
* React Query
* React Icons
* Chart.JS
* Formik
* Yup
* Vite
* CSS

### Backend

* Node.js
* Express.js
* MongoDB & Mongoose
* JWT Authentication
* Nodemailer (Email + OTP)
* Cloudinary

---

## 📁 Project Structure

```bash
Expense_Tracker_Project/
│
├── node/        # Backend (Express, MongoDB)
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   └── utils
│
└── my-app/      # Frontend (React, Redux, Vite)
    ├── src
    │   ├── components
    │   ├── pages
    │   ├── redux
    │   ├── services
    │   └── utils
    └── public
```
---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/expense-tracker.git
cd Expense_Tracker_Project
```

### 2️⃣ Backend Setup

```bash
cd node
npm install
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd my-app
npm install
npm run dev
```
