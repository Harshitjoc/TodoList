# To-Do List Web Application

## 📌 Project Overview
This is a **modern To-Do List web application** built using **HTML, CSS, JavaScript, and PostgreSQL**. It allows users to add, edit, delete, and mark tasks as completed, with features like filtering, metadata tracking, and database security best practices.

## ✨ Features
- **Task Management**: Add, edit, delete, and complete tasks.
- **Filtering**: Filter tasks based on status.
- **Responsive UI**: Fully mobile-friendly using Bootstrap.
- **Security**: Uses prepared statements to prevent SQL injection.
- **Performance**: Optimized frontend with debounced filtering.
- **Database Handling**: Graceful failure handling for database operations.

## 🛠 Tech Stack
- **Frontend**: HTML, CSS, JavaScript, Bootstrap
- **Backend**: Node.js (Express)
- **Database**: PostgreSQL
- **Deployment**: Can be hosted on any Node.js server

## 🚀 Installation
### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS recommended)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Git](https://git-scm.com/)

### Setup Instructions
1. **Clone the Repository:**
   ```sh
   [git clone https://github.com/your-username/todo-list.git](https://github.com/Harshitjoc/TodoList.git)
   cd todo-list
   ```
2. **Install Dependencies:**
   ```sh
   npm install
   ```
3. **Setup the Database:**
   - Create a PostgreSQL database
   - Run the SQL script (`db/init.sql`) to create tables
   ```sh
   psql -U your_user -d your_database -f database/schema.sql
   ```
4. **Configure Environment Variables:**
   - Copy `.env.example` to `.env`
   - Update database credentials in `.env`
5. **Start the Server:**
   ```sh
   npm start
   ```
6. **Access the App:**
   Open your browser and visit `http://localhost:3000`

## 📂 Folder Structure
```
/todo-list
│── /api               # Routes/Api and DB setup
│── /assets            # Css and Javascript
│── /db                # SQL scripts
│── index.html         # frontend
│── server.js          # Backend server files
│── .env               # Environment variables
│── package.json       # Node.js dependencies
│── README.md          # Project documentation
```

## 📊 Database Schema
```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔗 API Endpoints
| Method | Endpoint       | Description        |
|--------|---------------|--------------------|
| GET    | /tasks        | Fetch all tasks   |
| POST   | /tasks        | Add a new task    |
| PUT    | /tasks/:id    | Update a task     |
| DELETE | /tasks/:id    | Delete a task     |

## 📜 License
This project is licensed under the **MIT License**.
