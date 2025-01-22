# Campus Pulse: A Web App for Finding Roommates and Campus Events

Campus Pulse is a web-based application designed to enhance university student engagement by helping them find compatible roommates and discover campus events. Built using the principles of **Human-Computer Interaction (HCI)**, this project aims to provide a seamless and engaging experience for university students, fostering a sense of community and connection.

---

## 🎥 Links

- **[Project Demo Video](https://youtu.be/wx5Owg7nqF0)**: Watch the full demo of Campus Pulse showcasing its features.
- **[Presentation Video](https://youtu.be/whcI4JllTRQ)**: View the team presentation discussing the design process and implementation.
- **[User Feedback Video](https://youtu.be/tahAq-TR6JQ)**: See real user feedback on the app and how it influenced design improvements.
- - **[User Feedback Video - 2](https://youtube.com/shorts/D7MPXf43S7s)**: See another real user feedback on the app and how it influenced design improvements.

---

## 📖 Table of Contents

- [Project Goal](#project-goal)
- [Features](#features)
- [HCI Principles and Design Process](#hci-principles-and-design-process)
  - [1. User-Centered Design](#1-user-centered-design)
  - [2. Prototyping](#2-prototyping)
  - [3. HCI Principles Applied](#3-hci-principles-applied)
  - [4. Early Storyboarding](#4-early-storyboarding)
  - [5. Usability Testing](#5-usability-testing)
  - [6. Accessibility Review](#6-accessibility-review)
- [Technology Stack](#technology-stack)
- [🛠️ Getting Started](#🛠️-getting-started)
  - [Prerequisites](#prerequisites)
  - [📂 Project Setup](#📂-project-setup)
  - [🖥️ Running the Server](#🖥️-running-the-server)
  - [🌐 Running the Frontend](#🌐-running-the-frontend)
- [Key Achievements](#key-achievements)
- [Future Scope](#future-scope)
- [Acknowledgements](#acknowledgements)

---

## Project Goal

The primary goal of Campus Pulse was to apply the principles of **Human-Computer Interaction (HCI)** to design and develop an application that prioritizes usability, accessibility, and engagement. Through iterative prototyping, user-centered design, and thorough evaluations, we aimed to create an intuitive and user-friendly platform.

## Features

- **Roommate Finder**: Match with compatible roommates based on lifestyle preferences and values.
- **Event Discovery**: Explore and register for campus events, from academic workshops to social gatherings.
- **Personalized Recommendations**: Receive tailored suggestions for roommates and events based on user preferences.
- **Real-time Notifications**: Get reminders for upcoming events and updates on your profile.
- **Accessibility Enhancements**: Fully compliant with accessibility standards, including WAVE, Colorblindly, and usability principles.
- **User-friendly Design**: Intuitive navigation and visually appealing interface to boost engagement.

## HCI Principles and Design Process

### 1. **User-Centered Design**
- **Persona Building**: Developed detailed personas representing different user types (e.g., international students, local students) to ensure the app met diverse needs.
- **User Stories**: Created user stories to define functionalities, e.g., *"As a student, I want to search for compatible roommates so that I can find someone with similar interests and habits."*

### 2. **Prototyping**
- **Low-Fidelity Prototype**: Developed hand-drawn sketches to outline basic layouts and flows.
- **Mid-Fidelity Prototype**: Used **Figma** to create interactive wireframes with more detailed designs.
- **High-Fidelity Prototype**: Designed pixel-perfect, interactive prototypes with all UI elements.
- Each prototyping stage incorporated user feedback, leading to refinements in layout, navigation, and feature placement.

### 3. **HCI Principles Applied**
- **Laws of Simplicity**: Ensured minimal cognitive load by decluttering interfaces and focusing on essential elements.
- **Tidwell Patterns**: Applied proven UI design patterns for consistency and usability.
- **Nielsen’s Heuristic Evaluation**: Evaluated prototypes against Nielsen's heuristics (e.g., visibility of system status, user control, and error prevention).

### 4. **Early Storyboarding**
- Created early storyboards to map user journeys and identify potential pain points, which informed the app's core functionalities.

### 5. **Usability Testing**
- Conducted usability testing during each prototype stage to identify and resolve issues related to navigation, readability, and functionality.
- **Engagement**: Focused on improving engagement by refining features like real-time notifications, roommate recommendations, and event filters.

### 6. **Accessibility Review**
- Evaluated the app's accessibility using:
  - **WAVE (Web Accessibility Evaluation Tool)**: Automated checks for WCAG compliance.
  - **Colorblindly**: Manual testing for colorblindness simulations.
  - **IBM Accessibility Checker**: Ensured adherence to accessibility guidelines for universal usability.

## Technology Stack

### Backend
- **Node.js** and **Express.js**: For a scalable and efficient backend.
- **Mongoose**: ODM for MongoDB.
- **MongoDB Atlas**: Cloud-based database solution.

### Frontend
- **React**: For building interactive and dynamic user interfaces.
- **Figma**: Used for prototyping and user interface design.

---

## 🛠️ Getting Started

Follow these instructions to run the project locally.

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v14 or above)
- **npm** (v7 or above)

---

### 📂 Project Setup

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd campus-pulse
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

---

### 🖥️ Running the Server

To start the server, run:

```bash
npm run start
```

The server will start on `localhost:3000` (default port).

---

### 🌐 Running the Frontend

1. Navigate to the frontend directory:

   ```bash
   cd front-end
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm run dev
   ```

The frontend will start at:

```
http://localhost:5173
```

## Key Achievements
	• Engagement Boost: Improved user engagement by 63.6% through iterative design enhancements and real-time event notifications.
	• Accessibility Compliance: Ensured the app is accessible to all users, including those with disabilities, by following WCAG standards.
	• Data-Driven Design: Integrated survey mechanisms to gather user feedback and iteratively enhance features.

## Future Scope
	• Expansion to support additional universities.
	• Advanced roommate and event recommendation algorithms.
	• Enhanced social features and community-building tools.

## Acknowledgements
   This project was developed as part of **CS 545: Human-Computer Interaction** in the **Fall 2024 semester** at **Stevens Institute of Technology**, under the guidance of **Professor    Gregg Vesonder**.
   We extend our gratitude to Professor Gregg Vesonder for his guidance and support throughout the development of Campus Pulse.
