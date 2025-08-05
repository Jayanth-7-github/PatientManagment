

# Patient Lab Booking System

A full-stack web application for registering patients, managing lab tests, booking tests, and downloading test reports. Includes user authentication via JWT tokens for secure access.

---

## Features

* **Patient Registration**
  Users can register by providing basic details (name, age, gender, phone, address, email).
  Upon registration, a JWT token is generated for session management.

* **Patient Login**
  Registered patients can log in using their ID  to retrieve their booking history securely.

* **Lab Tests Management**
  Admin or authorized users can create and manage lab tests with details such as test name, description, and price.

* **Booking Tests**
  Patients can book lab tests. Bookings are linked to patient and test records.

* **Bookings History**
  Patients can view their own bookings history after login. Only bookings for the authenticated user are shown.

* **Report Download**
  Patients can download their test reports (PDF) anytime using their authentication token.

* **JWT-based Authentication**
  Secure API endpoints protect patient data. Tokens expire after 1 hour.

---

## Tech Stack

| Layer          | Technology                               |
| -------------- | ---------------------------------------- |
| Frontend       | React, React Router, Axios, Tailwind CSS |
| Backend        | Node.js, Express.js                      |
| Database       | MongoDB with Mongoose                    |
| Authentication | JSON Web Tokens (JWT)                    |
| Styling        | Tailwind CSS                             |
| API Testing    | Postman or any REST client               |

---

## Setup & Installation

### Backend

1. Cloned the repo and navigate to the backend folder:

   ```bash
   git clone <repo-url>
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Created a `.env` file in the backend root and add:

   ```
   PORT=3211
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

### Frontend

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   cd vite-project
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the React app:

   ```bash
   npm run dev
   ```

---

## Usage

* Register a new patient via the registration form.
* Save the returned token in localStorage for session persistence.
* Use the login page to authenticate and access your bookings.
* Book lab tests and view booking history.
* Download test reports from booking history.
* Save the patientId to relogin anytime.

---

## API Endpoints

| Method | Endpoint        | Description                        | 
| ------ | --------------- | ---------------------------------- | 
| POST   | `/api/patients` | Register new patient               | 
| POST   | `/api/login`    | Patient login                      | 
| GET    | `/api/bookings` | Get bookings for logged-in patient | 
| POST   | `/api/bookings` | Book a lab test                    | 
| GET    | `/api/tests`    | Get all lab tests                  | 
| POST   | `/api/tests`    | Create new lab test                | 
| GET    | `/:id/report`   | Download booking report PDF        | 

---

## Notes

* JWT tokens expire in 1 hour; refresh tokens or re-login as needed.
* Reports are dummy PDFs in the example and should be replaced with real generated files.
* Protect sensitive routes on the frontend using React Router guards or similar mechanisms.
* If the patient wants to download the pdf again they have to use patientId to login so they should secure the  patientId



