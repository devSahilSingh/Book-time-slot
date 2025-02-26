# 📌 React-Node booking slot Application

This is a Booking slot web application built using **React + Redux** for the frontend and **Node.js + Express** for the backend. 
It allows users to book hourly slots between **9 AM - 5 PM**, store the appointments in a **local database (MongoDB)**, and manage them via a REST API.

## 🛠 Tech Stack

### Frontend:
- **React.js** (with Redux for state management)
- **React Router** (for navigation)
- **Bootstrap** (for styling)
- **Axios** (for API calls)

### Backend:
- **Node.js + Express.js** (REST API)
- **MongoDB** (for data storage)
- **Mongoose** (ORM for database operations)

## 🎯 Features

✅ View available time slots from **9 AM - 5 PM**  
✅ Click on a time slot to enter **user details (first name, last name, phone number)**  
✅ Booked slots are **marked in red**  
✅ Click on a booked slot to **view & edit** the details  
✅ **Clear appointment** button to delete a booking  
✅ **API Endpoints** to fetch, create, update, and delete appointments  
✅ **Responsive UI** (Bootstrap)  
✅ **Deployed version** (Vercel & Render)  


## 📂 Folder Structure

### **Frontend (React)**
```
client/
│── src/
│   ├── components/
│   ├── assets/
│   ├── reducers/
│   ├── store.js
│── public/
│── package.json
│── .env
│── README.md
```


### **Backend (Node.js)**

```
server/
│── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│── package.json
│── .env
│── README.md
```

---

## 🚀 Getting Started

### **1️⃣ Clone the repositories**

# Clone frontend
git clone [https://github.com/devSahilSingh/Book-time-slot.git](https://github.com/devSahilSingh/Book-time-slot.git)

cd client

# Clone backend
git clone [https://github.com/devSahilSingh/Book-time-slot.git](https://github.com/devSahilSingh/Book-time-slot.git)

cd server


---

### **2️⃣ Setup & Run the Backend (Node.js)**

#### **Install dependencies**

cd server

npm install

npm start/node server.js

Add .env file in root

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.gvrfe.mongodb.net/<database>?retryWrites=true&w=majority&appName=Cluster0

Server will be running at: http://localhost:5000

### **3️⃣ Setup & Run the Frontend (React)**
cd client

npm install

npm run dev

Server will be running at: http://localhost:5173

Add .env file in root

VITE_API_URL=http://localhost:5000 


📌 ### **API Endpoints (Backend)**

# Get all booked slots
GET /api/slots

# Get booked slots by index
GET /api/slots/index/:index

# Book a time slot
POST /api/slots

# Update a booked slot
PUT /api/slots/:id

# Delete a booked slot
DELETE /api/slots/:id


🌍 ### **Deployment**

# Frontend deployed on Vercel
# Backend deployed on Render

👨‍💻 ### **Author**

Sahil singh
GitHub: [https://github.com/devSahilSingh](https://github.com/devSahilSingh)
Email: devsahil009@gmail.com







