# Task Management System

A **full-stack Task Management System** built with **React** (frontend) and **Java Spring Boot** (backend) supporting **role-based task management**.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running Both Frontend & Backend](#running-both-frontend--backend)
- [Usage](#usage)

---

## Project Structure

```
Task-Management-System/
├── backend/            # Java Spring Boot backend
│   ├── src/main/java/  # Controllers, Models, Services
│   ├── src/main/resources/ # application.properties
│   └── pom.xml         # Maven dependencies
└── frontend/           # React frontend
    ├── src/            # Components and Pages
    ├── public/
    └── package.json    # npm dependencies & scripts
```

---

## Prerequisites

- **Java JDK 21+**
- **Maven**
- **Node.js 16+ & npm 6+**
- **MySQL** database (or any database configured in `application.properties`)
- Browser to access frontend

---

## Backend Setup (Spring Boot)

1. Navigate to the backend folder:

```bash
cd backend
```

2. Configure database in `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password
spring.jpa.hibernate.ddl-auto=update
```

3. Build the backend:

```bash
mvn clean install
```

4. Run the backend server:

```bash
mvn spring-boot:run
```

> Backend will run at `http://localhost:8080`

---

## Frontend Setup (React)

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run the frontend development server:

```bash
npm run dev
```

> Frontend will run at `http://localhost:5173` (Vite default port).
> API requests are proxied to `http://localhost:8080`.

---

## Running Both Frontend & Backend Simultaneously

Open two terminal windows/tabs:

1. **Backend:**

```bash
cd backend
mvn spring-boot:run
```

2. **Frontend:**

```bash
cd frontend
npm run dev
```

> Access the application at `http://localhost:5173`

---

## Usage

- **Login/Register:** Authenticate with your account
- **Role-based Access:**

  - `user`: Access `ManageTask`
  - `admin`: Access `ManageTask`, `ManageStatus` & `ManagePriority`
  - `superadmin`: Access `ManageTask` ,`ManageRole`, `ManageUser` , `ManageStatus` & `ManagePriority`

- **CRUD Operations:** Create, update, delete, and view tasks, users, priorities, and statuses

---
