# 🚗 Car Rental Management System

**Project Type:** Full-Stack Web Application (Microservices Architecture)  
**Developed By:** [Your Name/Team Name]  
**Internship At:** Cognizant  
**Location:** Vijayawada, Andhra Pradesh, India

---

## 🌟 Project Overview

[cite_start]This **Car Rental Management System** is a web-based application designed to serve the needs of car rental businesses of all sizes[cite: 4266]. [cite_start]Developed as part of an internship at Cognizant, it provides a complete solution for listing, booking, and managing rental vehicles[cite: 4267].

[cite_start]The system is built on a modern **microservices architecture** to ensure scalability and maintainability[cite: 4294]. [cite_start]The backend consists of independent services for handling users, cars, and bookings, while the frontend is a dynamic and responsive single-page application built with **React**[cite: 4298].

---

## ✨ System Architecture & Modules

The application is modularized into several key services and modules to handle distinct functionalities:

### Microservices Architecture
[cite_start]The backend is composed of the following core microservices[cite: 4294]:
* [cite_start]**User Service:** Manages all user-related operations, including registration, login, and profile updates[cite: 4295].
* [cite_start]**Car Service:** Handles the vehicle inventory, including adding, updating, and deleting car details[cite: 4297].
* [cite_start]**Booking Service:** Manages the entire car booking lifecycle, from creation to confirmation and cancellation[cite: 4296].
* [cite_start]**API Gateway & Discovery Server:** Implemented to manage requests and service communication effectively within the microservices ecosystem[cite: 4299].

### Core Modules
* [cite_start]**User Module:** Allows users to register, log in, and manage their profiles[cite: 4287].
* [cite_start]**Vehicle Module:** Enables administrators to add, edit, and delete vehicles from the system's inventory[cite: 4288].
* **Booking Modules (User & Admin):**
    * [cite_start]**For Users:** Allows registered users to book cars, view past bookings with vehicle details, and cancel their bookings[cite: 4289, 4290].
    * [cite_start]**For Admins:** Provides a comprehensive view of all bookings, filterable by car and by customer[cite: 4291].
* [cite_start]**Admin Dashboard Module:** A synopsis view for administrators, showing key metrics like the total number of registered users, listed vehicles, and total bookings[cite: 4292].

---

## 👥 User Roles & Functionalities

The system supports two primary user roles with distinct capabilities:

### **👤 Registered User**
Any user can register on the portal to access the following features:
* [cite_start]Securely log in and recover their password[cite: 4271, 4272].
* [cite_start]Browse the car catalog, view vehicle pictures, and see fare information for specific locations[cite: 4289].
* [cite_start]Book a car for desired dates[cite: 4275].
* [cite_start]View their complete booking history[cite: 4276].
* [cite_start]Update their personal profile and password[cite: 4277, 4278].

### **👑 Administrator**
The admin is the superuser with full control over the website's operations:
* [cite_start]Manage the entire vehicle inventory (create, edit, delete cars)[cite: 4281, 4282].
* [cite_start]Oversee all user bookings, with the authority to confirm or cancel them[cite: 4283].
* [cite_start]View the details of all registered users[cite: 4284].
* [cite_start]Access a dashboard with aggregate data on registered users, total bookings, and more[cite: 4285].

---

## 📊 Application Flowcharts

Here are the visual workflows for key processes in the system.

**1. User Registration & Login Flow**
PLACE USER REGISTRATION & LOGIN FLOWCHART HERE

* **Description:** A new user visits the site and navigates to the registration page. They fill in their details and submit the form. The system validates the data and creates a new user profile. The user can then log in using their email and password. [cite_start]A "Forgot Password" option is available for account recovery[cite: 4271, 4272].

**2. Car Booking Flow**
PLACE CAR BOOKING FLOWCHART HERE

* **Description:** A logged-in user searches for cars. They enter their desired pick-up/drop-off locations and dates. The system displays available cars with pictures and fares. The user selects a car, confirms the booking details, and submits the request. The booking is created with a 'Pending' status. [cite_start]The user can view this booking in their history[cite: 4289].

**3. Admin Booking Management Flow**
PLACE ADMIN BOOKING MANAGEMENT FLOWCHART HERE

* **Description:** The admin logs into their dashboard and navigates to the booking management section. They can view a list of all bookings. [cite_start]The admin can review a 'Pending' booking and choose to either 'Confirm' or 'Cancel' it based on vehicle availability and other factors[cite: 4283].

---

## 🗄️ Database Schema

The system uses a MySQL database with the following primary tables. The relationship between them is illustrated in the ER Diagram.

### Entity-Relationship (ER) Diagram
PLACE ER DIAGRAM IMAGE HERE

### Tables
* **tblUser\_Profile:** Stores all user information, including credentials and contact details. [cite_start]The `UserRole` column distinguishes between 'Admin' and 'Customer'[cite: 4304].
* [cite_start]**tblVehicle\_Inventory:** Contains details for each vehicle, such as brand, model, registration number, daily rental rate, and an image URL[cite: 4309].
* **tblRental\_Booking:** This table links users and vehicles. [cite_start]It stores all booking information, including start/end dates, fare amount, booking status ('Pending', 'Confirmed', 'Cancelled'), and pickup/drop-off locations[cite: 4312].

---

## 📸 Project Screenshots

Here are some visual representations of the Car Rental Management System in action:

**1. Login / Registration Page**
PLACE LOGIN PAGE IMAGE HERE

**2. User Dashboard / Home Page**
PLACE USER PAGE IMAGE HERE

**3. Car Listing Page**
PLACE CAR LISTING PAGE IMAGE HERE

**4. Booking Confirmation Page**
PLACE BOOKING CONFIRMATION PAGE HERE

**5. Admin Dashboard**
PLACE ADMIN DASHBOARD PAGE IMAGE HERE

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
