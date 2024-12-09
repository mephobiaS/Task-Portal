### TaskManagePortal

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

##### PROJECT REQUIREMENTS

# **Task 1: Project/Task Management Portal**

Add this to your readme file.

#### **Story:**

You are tasked with developing a **Project/Task Management Portal** for a team of professionals using **Angular** on the front end and integrated with **Firebase** for authentication and data storage. The system aims to streamline project and task management with role-based access control and efficient workflows.

---

## **Story Flow**

#### **1. Project Setup (10%)**

The application is built using Angular for the front end and with Firebase Firestore as the database. You need to configure:

- Firebase authentication for OTP-based login.
- An API for task management, on a cloud environment.

#### **2. Authentication & Authorization (15%)**

- **Login Scenarios:**

  1.  **Scenario 1:** A user logs in with a valid mobile number and receives an OTP from Firebase. They enter the OTP and are redirected to their dashboard based on their assigned role (Admin or Team Member).
  2.  **Scenario 2:** A user logs in with an invalid OTP, and an error message is displayed.

- Use **Auth Guards** to protect routes:
  - Admin routes (e.g., project creation, task assignment).
  - Team Member routes (e.g., task status updates).

---

#### **3. User Interface (15%)**

- **Admin UI Features:**

  - Dashboard: Overview of all projects and tasks.
  - Forms for creating projects and tasks.
  - List of team members with an interface to assign roles.

- **Team Member UI Features:**

  - Dashboard: View assigned tasks with details like project name, description, deadline, and current status.
  - Update status (`Pending`, `In Progress`, `Completed`) and add comments to tasks.

- **UI Expectations:**
  - Use Angular Material/ any other library for a professional look and feel.
  - Ensure responsiveness for desktop (and mobile views if time permits).

---

#### **4. Problem Solving (15%)**

- Implement logic for **task assignments**:

  - Admins can assign tasks to team members.
  - Tasks can only be updated by the assigned member.

- **Edge Case Handling:**
  - Ensure that tasks cannot be deleted without admin confirmation.
  - Validate that only one user is assigned per task.

---

#### **5. Role-Based CRUD Operations (10%)**

- Admins can:

  - Create and manage projects.
  - Assign and reassign tasks.

- Team Members can:
  - View their tasks.
  - Update task status and add comments.

---

#### **6. Angular & TypeScript Concepts (10%)**

- **Services:** Create a `TaskService` and `AuthService` for managing data and authentication logic.
- **Interfaces:** Define `Task` and `User` interfaces for strongly typed data models.
- **Lifecycle Hooks:** Use `ngOnInit` to fetch tasks and users on component initialization.
- **Pipes:** Add a custom pipe to filter tasks by status (`Pending`, `In Progress`, `Completed`).

---

#### **7. Coding Standards (10%)**

- Follow the best practices outlined in the **Osmosys GitHub Angular standards**:
  - Modularize code by separating services, components, and models.
  - Use clear and consistent naming conventions.

---

#### **8. Code Quality (5%)**

- Optimize for reusability:
  - Create reusable components for task cards and user lists.
  - Ensure minimal duplication of logic in services.

---

#### **9. Deployment & Submission (10%)**

- Deploy the application using Firebase Hosting.
- Use Git for version control with regular commits and proper commit messages.
- Submit the project by pushing to a GitHub repository.

---

### **Dummy Data**

**Users:**

- **Admin:**

  - Name: Alice Admin
  - Email: alice.admin@example.com
  - Role: Admin

- **Team Members:**
  - Name: Bob User
  - Email: bob.user@example.com
  - Role: Team Member
  - Name: Charlie Member
  - Email: charlie.member@example.com
  - Role: Team Member

**Tasks:**

1. **Task:** Design Wireframes

   - **Project:** Mobile App Development
   - **Assigned To:** Bob User
   - **Status:** Pending

2. **Task:** Develop Backend APIs
   - **Project:** E-commerce Website
   - **Assigned To:** Charlie Member
   - **Status:** In Progress

---

### **Expected Deliverables**

1. Fully functional app meeting all the requirements.
2. Proper implementation of routing, guards, services, and interfaces.
3. Clean and modular code following Osmosys standards.
4. Hosted URL of the application and GitHub repository link.

---

### **Marks Distribution**

- **Project Setup:** 10 Marks
- **Authentication & Authorization:** 15 Marks
- **UI:** 15 Marks
- **Problem Solving:** 15 Marks
- **Role-Based CRUD:** 10 Marks
- **Angular & TypeScript Concepts:** 10 Marks
- **Coding Standards:** 10 Marks
- **Code Quality:** 5 Marks
- **Deployment & Submission:** 10 Marks

**Total:** 100 Marks  
**Pass Marks:** 70 Marks

### **Evaluation Criteria and Rules**

To successfully complete the assigned project and achieve a passing score, developers must adhere to the following evaluation criteria. Each criterion is designed to assess specific skills and competencies in Angular and Firebase development, along with adherence to coding standards and best practices.

---

## **Evaluation Criteria**

1. **Project Setup (Angular + Firebase) – 10%**

   - The project must be properly set up using Angular as the front end and Firebase for backend services such as authentication, Firestore for data storage, and hosting.
   - Ensure all dependencies are installed, and the environment is configured correctly for seamless integration with Firebase.

2. **User Authentication + Authorization (Auth Guard + Routing Configs) – 15%**

   - Implement a robust authentication system using Firebase Authentication (email/mobile login with OTP).
   - Authorization should be role-based, with proper routing guards to restrict access based on user roles (e.g., Admin, User).

3. **UI (User + Admin) – 15%**

   - Design a responsive and user-friendly interface for Admin and User dashboards.
   - Ensure proper navigation, intuitive layout, and a consistent theme throughout the application.

4. **Problem Solving – 15%**

   - Demonstrate logical and efficient solutions for the given problem scenarios.
   - Implement dynamic features such as form validation, real-time updates, and user-friendly workflows.

5. **Role-Based CRUD – 10%**

   - Implement Create, Read, Update, and Delete (CRUD) functionalities based on user roles.
   - Admins should manage users and tasks, while Users should interact with their assigned data.

6. **Angular + TypeScript Concepts – 10%**

   - Use Angular concepts such as Services, Lifecycle Hooks, and Pipes effectively.
   - Utilize TypeScript features like interfaces, generics, and strong typing to ensure clean and maintainable code.

7. **Coding Standards – 10%**

   - Follow Osmosys GitHub coding standards for Angular development.
   - Ensure proper file structure, modularization, naming conventions, and inline documentation.

8. **Code Quality – 5%**

   - Write reusable, optimized, and clean code.
   - Avoid redundancy and ensure scalability in the implemented features.

9. **Deployment + Submission – 10%**
   - Successfully deploy the project on Firebase Hosting without errors or bugs.
   - Ensure proper Git usage, including regular commits, meaningful commit messages, and adherence to GitHub standards.

---

### **Rules**

1. **Time Management**:

   - The test duration is **6 hours** (1:30 PM - 7:30 PM).
   - Projects must be submitted by **7:31 PM**. Late submissions will not be accepted.

2. **Submission Guidelines**:

   - Projects should be submitted as a GitHub repository link, including the deployed Firebase URL.
   - Ensure all necessary files and documentation are included in the repository.

3. **Usage of AI Tools**:

   - The use of generative AI tools (e.g., ChatGPT, Gemini, or similar AI-based extensions) is strictly prohibited.
   - However, developers are allowed to refer to official documentation and online resources for help.

4. **Teamwork**:

   - Projects must be completed individually. Collaboration with other developers is not permitted.

5. **Bug-Free Completion**:

   - Ensure the application is functional and free of critical bugs. Applications with unresolved errors will receive penalties in the final score.

6. **Pass Marks**:
   - A minimum score of **70 marks** is required to pass.
   - Passing developers will be recommended for project assignments, while those who fail will undergo an additional **7-10 days of training**.

By adhering to these guidelines and evaluation criteria, developers can demonstrate their competency in Angular development, Firebase integration, and project management.
