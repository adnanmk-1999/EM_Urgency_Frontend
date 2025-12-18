<p align="center">
  <img src="docs/em-urgency-logo.png" alt="EM-Urgency Logo" width="140"/>
</p>

<h1 align="center">EM-Urgency: Emergency Alert & Response Management System</h1>

<p>
  A centralized, role-based emergency communication platform built with <b>React</b>, designed to deliver critical alerts, track responses, and improve organizational readiness during emergencies.
  <br/>
  Seamlessly integrates with a <b>Node.js + Express + Sequelize</b> backend for authentication, role-based access control, alert delivery, response tracking, and analytics.
</p>

<p align="center">
  <img src="docs/ui-demo.gif" alt="EM-Urgency UI Demo" width="800"/>
</p>


# 📚 Table of Contents

Jump to a section:

1. [🏥 About the Application](#-about-the-application)
2. [📐 Architecture & Backend Overview](#-architecture--backend-overview)
3. [✨ Features](#-features)
4. [🚀 Getting Started](#-getting-started-with-the-app)
5. [🧭 How to Use the App](#-how-to-use-the-app)
6. [🔮 Future Enhancements](#-future-enhancements)
7. [🔗 Related Repository (Backend)](#-related-repository-backend)
8. [📄 Author](#-author)


# 🚨 About the Application

**EM-Urgency** is a centralized emergency alert and response management system designed to help organizations communicate critical information quickly and reliably during emergency situations.

The application enables administrators to create and distribute alerts to targeted audiences — such as all users, specific departments, locations, or individual employees — while allowing recipients to acknowledge and respond to these alerts in a structured manner. This ensures that important messages are not only delivered, but also **tracked and acted upon**.

EM-Urgency focuses on:
- Timely communication during emergencies or critical events
- Controlled alert distribution based on organizational structure
- Response tracking to measure awareness and readiness
- Administrative insights through charts and analytics

The system is built with a modern, role-based architecture:
- **Administrators** manage alerts, recipients, and analytics dashboards
- **Users** receive notifications, view alerts, and submit responses

By combining a user-friendly frontend with a robust backend and integrated email notifications, EM-Urgency provides a reliable platform for improving organizational preparedness and emergency response workflows.

<p align="center">
  <img src="docs/em-urgency-demo.gif" alt="EM-Urgency Demo" width="850"/>
</p>


# 📐 Architecture & Backend Overview

EM-Urgency follows a **client–server architecture** with a clear separation between the frontend user interface and the backend application logic. The system is designed to support secure communication, role-based access control, alert distribution, response tracking, and analytics.

## High-Level Architecture

- **Frontend**:  
  A React-based single-page application responsible for user interaction, alert creation, response submission, and data visualization.

- **Backend**:  
  A RESTful API built using **Node.js**, **Express**, and **Sequelize ORM**, handling authentication, business logic, database interactions, and email notifications.

- **Database**:  
  A relational database (MySQL for development) that stores users, alerts, responses, roles, and organizational metadata.

- **Email Service**:  
  Integrated email notification system using **Nodemailer**, responsible for delivering alerts to users and collecting responses via secure links.


## Backend Design Overview

The backend is organized into a modular structure consisting of:

- **Controllers**  
  Handle HTTP requests, validate inputs, and coordinate between services and data access layers.

- **Data Access Objects (DAO)**  
  Encapsulate database operations using Sequelize models, ensuring clean separation of persistence logic.

- **Models**  
  Define database schemas and relationships for entities such as:
  - Users
  - Alerts
  - Responses
  - Departments
  - Locations
  - Roles
  - User–Alert mappings

- **Middleware**  
  Provides authentication, authorization, and role-based access control to protect sensitive routes.

Overall, the backend architecture of EM-Urgency emphasizes **modularity, clarity, and reliability**, making it suitable for both academic use and real-world deployment scenarios.


# ✨ Features

EM-Urgency provides a role-based feature set designed to support efficient emergency communication, response tracking, and administrative oversight. The application distinguishes clearly between **Admin** and **User** roles, ensuring controlled access and a streamlined experience for each user group.


## 👨‍💼 Admin Features

Admins are responsible for creating alerts, selecting recipients, monitoring responses, and analyzing alert effectiveness.

### 🔔 Alert Creation & Management
- Create emergency alerts with a **subject**, **message**, and **date**
- Save alerts as **Draft** before sending
- Edit or delete alerts while in Draft or Failed state
- Send alerts only when finalized

### 🎯 Targeted Alert Distribution
Admins can send alerts to:
- **All users**
- **Department-specific users**
- **Location-specific users**
- **Individually selected users** (via searchable table)

This allows precise targeting of recipients based on organizational structure.

### 📧 Email Notification System
- Automatic email notifications sent to selected recipients
- Emails include alert details and a response link
- Reliable delivery using Nodemailer with secure authentication
- Inline email branding and templates for consistency

### 📊 Alert Status Tracking
- Track alert lifecycle states:
  - Draft
  - Sent
  - Failed
- Monitor how many users received each alert
- Prevent editing or deletion of alerts once successfully sent

### 📈 Analytics & Visualization
- **Pie Chart**: Displays alert status distribution (Sent / Draft / Failed)
- **Bar Chart**: Shows response statistics (Responded vs Unresponded)
- Date-based filtering for historical insights
- Interactive charts for better administrative decision-making

### 🛡️ Role-Based Access Control
- Admin-only access to alert creation, recipient selection, and analytics
- Protected routes to prevent unauthorized actions


## 👤 User Features

Users interact with alerts sent by administrators and provide responses.

### 📥 Alert Inbox
- View all alerts sent to the user
- Alerts displayed with subject, message, and status
- Clear distinction between pending and responded alerts

### ✅ Structured Alert Response
- Respond to alerts by **Accepting** or **Rejecting**
- Responses captured via a dedicated response dialog
- Prevents multiple or duplicate responses

### 📬 Email-Based Interaction
- Receive alerts directly via email
- Secure link redirects users to the application login page
- Ensures accessibility even when users are not actively logged in

### 🔐 Secure Authentication
- Login using username and password
- Google Sign-In support for simplified authentication
- Session handling with JWT-based security


## ⚙️ General Application Features

- Clean, responsive user interface built with React
- Consistent UI styling across pages and dashboards
- Error handling and user feedback via notifications
- Modular and extensible architecture for future enhancements

Overall, EM-Urgency provides a balanced feature set that supports **rapid emergency communication**, **accountability through response tracking**, and **administrative insight through analytics**, making it suitable for organizational and institutional use.


# 🚀 Getting Started with the App

This repository contains **only the frontend** of the **EM-Urgency** application.  
To use the app fully, it must be connected to the **backend API**, which handles authentication, roles, alerts, responses, email notifications, and analytics.

You can run the frontend in two ways:

1. **Locally with Node.js**  
2. **Using Docker (recommended)**

Because this project was developed using a specific Node.js environment, running it locally may require matching a compatible Node version.  
Using Docker provides a clean, consistent environment and is therefore the **recommended approach**.


## 🐳 Running the Frontend with Docker (Recommended)

This is the easiest and most reliable method, especially on systems where Node.js versions differ.

### ✅ Prerequisites (Docker method)

- **Docker** installed and running:
  - Docker Desktop (Windows / macOS), or
  - Docker Engine (Linux)
- **Git** (to clone the repository)
- A running **EM-Urgency backend API** reachable from inside the container  

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/EM_Urgency_Frontend
cd EM_Urgency_Frontend
```

---

### 2️⃣ Create the `.env` File

```env
REACT_APP_API_BASE_URL=http://localhost:4000
```

Replace this URL with your backend’s deployed address if applicable.

---

### 3️⃣ Build and Run the Docker Container

```bash
docker compose up --build
```

The application will be available at:

```
http://localhost:3000
```

---

## 💻 Running the Frontend Locally (Manual Method)

If you prefer running the application without Docker, ensure that your **Node.js version is compatible** with the one used during development.

### ✅ Prerequisites (Local Node.js method)

- **Node.js installed** (preferably Node 14)
- **npm** or **yarn**
- A running **EM-Urgency backend API**

---

### 1️⃣ Install Dependencies

```bash
npm install
```

---

### 2️⃣ Configure Backend API URL

```env
REACT_APP_API_BASE_URL=http://localhost:4000
```

---

### 3️⃣ Start the Development Server

```bash
npm start
```

The app will be available at:

```
http://localhost:3000
```

# 🧭 How to Use the App

Once the frontend is running and connected to the backend, you can log in using the **pre-seeded user accounts** provided by the backend database.  
These accounts are automatically created during backend initialization and allow you to explore all application features without manually creating users.

New user accounts can be created later by an **Admin user** through backend management functionality.


## 🔐 Default Login Accounts (Seeded Data)

| Role    | Username              | Password    | Access Level Description |
|---------|-----------------------|-------------|--------------------------|
| **Admin** | admin1999       | Admin@123   | Full access to alerts, user selection, analytics dashboards, and system management |
| **User**  | bob1999        | Bob@123    | Can receive alerts, view messages, and submit responses |

> These accounts are intended for **development and testing purposes only**.  
> They allow you to quickly explore both **Admin** and **User** workflows within EM-Urgency.


After logging in:
- **Admins** can create and send alerts, choose recipients, and view analytics.
- **Users** can receive alerts via email and respond through the application interface.


# 🔮 Future Enhancements

The EM-Urgency platform is designed to be extensible and can be enhanced further to support more advanced emergency communication and monitoring needs. Potential future improvements include:

- **Multi-channel notifications**  
  Extend alert delivery beyond email to include SMS, push notifications, and in-app alerts.

- **Real-time alert status updates**  
  Use WebSockets to provide live updates on alert delivery and user responses without page refresh.

- **Advanced role-based access control**  
  Introduce finer-grained permissions for different administrative roles.

- **Alert scheduling and escalation**  
  Allow alerts to be scheduled in advance and automatically escalated if no response is received.

- **Improved analytics and reporting**  
  Add downloadable reports, historical trend analysis, and response-time metrics.

- **Mobile-friendly and PWA support**  
  Enhance the user experience on mobile devices and support offline access where applicable.

- **Multi-language support**  
  Enable internationalization for organizations operating across multiple regions.

These enhancements aim to make EM-Urgency more scalable, responsive, and suitable for real-world enterprise deployment.


# 🔗 Related Repository (Backend)

The EM-Urgency application is supported by a dedicated backend service that handles all core business logic and system operations, including:

- User authentication and authorization
- Role-based access control (Admin / User)
- Alert creation and distribution
- Email notification delivery
- Response tracking and persistence
- Analytics data for dashboards

You can find the backend repository here:

👉 **EM-Urgency Backend Repository:**  
https://github.com/adnanmk-1999/EM_Urgency_Backend

> Please refer to the backend repository for detailed setup instructions, API documentation, database schema, and environment configuration.


# 👤 Author  
Developed by **Adnan**  
Software Developer & Robotics Engineer