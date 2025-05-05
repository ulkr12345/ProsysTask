
# Exam Registration App

This project is a frontend-focused exam registration system developed for a technical interview task for the Angular Developer position. The application allows school teachers to register subjects, students, and exam results for secondary school students.

The project is built using Angular and TypeScript for the frontend. Since there is no real backend, JSON Server is used to simulate RESTful API endpoints.

## Project Structure

The project has the following structure:

```
ExamRegistration/
├── API/              # JSON Server-based mock API
├── Frontend/         # Angular application
```

## Features

- Subject registration (code, name, grade, teacher name/surname)
- Student registration (ID, name, surname, grade)
- Exam result registration (subject, student, date, score)
- Full CRUD operations with fake API integration

## Technologies Used

- Angular 17, TypeScript
- JSON Server (for simulating REST API)
- HTML5, SCSS
- (Optional) Angular Material for UI components

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v18 or later)
- Angular CLI (`npm install -g @angular/cli`)
- JSON Server (`npm install -g json-server`)

---

### Step 1: Install Dependencies

Install dependencies for both frontend and mock API.

```bash
# Install for API
cd API
npm install

# Install for Angular frontend
cd ../Frontend
npm install
```

---

### Step 2: Run the JSON Server (Mock API)

```bash
cd ../API
json-server --watch db.json --port 3000
```

This will start a fake REST API at: `http://localhost:3000`

---

### Step 3: Run the Angular Application

```bash
cd ../Frontend
ng serve
```

Angular app will be available at: `http://localhost:4200`

The app will connect to the mock API running on port `3000`.

---

## Notes

- All mock data (subjects, students, exams) are stored in `API/db.json`.
- The application works entirely in the browser using the fake API; no real backend or database is needed.
- Designed and implemented as a technical assignment to demonstrate Angular development skills.

---

## Author

Prepared by Ulkar Jafarli for the Angular Developer position technical interview.
