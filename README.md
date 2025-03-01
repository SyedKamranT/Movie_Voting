# Movie Voting Web Application

A real-time, interactive movie voting platform with **React (Vite) + Flask + MongoDB + Socket.IO** for seamless voting and dynamic updates.

---

## 🔹 Features
✅ **User Authentication** with JWT (Signup, Login)  
✅ **Role-Based Access** (Admins manage movies, users vote)  
✅ **Movie List** with dynamic fetching from the database  
✅ **Voting System** with real-time updates using Socket.IO  
✅ **Live Results Page** (Bar charts & Leaderboards)  
✅ **Responsive Design** (Desktop, Tablet, Mobile)  

---

## 📦 Tech Stack

### **Frontend:**
- 🖥️ **React + Vite** (Fast UI Rendering)
- 🎨 **Tailwind CSS** (Modern UI Styling)
- 🔗 **Axios** (API Requests)
- 🔄 **Socket.IO Client** (Real-time Voting Updates)

### **Backend:**
- 🚀 **Flask + Flask-SocketIO** (API & WebSockets)
- 🔑 **JWT Authentication** (Secure User Auth)
- 📊 **Pymongo + MongoDB** (Database for Movies & Votes)

---

## 🛠️ Installation & Setup

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/yourusername/movie-voting.git
cd movie-voting
```

### **2️⃣ Backend Setup (Flask)**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # For Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### **3️⃣ Frontend Setup (React + Vite)**
```bash
cd frontend
npm install
npm run dev
```

---

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|---------|-------------|
| **POST** | `/api/auth/login` | User Login (JWT) |
| **POST** | `/api/auth/signup` | User Signup |
| **GET** | `/api/movies` | Fetch Movies List |
| **POST** | `/api/movies/add` | Admin Adds Movies |
| **POST** | `/api/vote` | User Votes for a Movie |
| **GET** | `/api/results` | Get Live Voting Results |

---

## 🚀 Deployment
### **Backend (Flask)**
- **Docker:**  
```bash
docker-compose up --build
```
- **Render/Railway:** Deploy Flask API

### **Frontend (React)**
- **Vercel:** `vercel deploy`  
- **Netlify:** `npm run build && netlify deploy`  

---

## 📜 License
MIT License  

---

## 💡 Future Enhancements
🔹 **Add OAuth Login (Google, GitHub)**  
🔹 **Enhance Voting Security with Rate Limits**  
🔹 **Improve UI with Animations & Transitions**  

