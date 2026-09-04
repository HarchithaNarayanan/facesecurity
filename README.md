# Cognitive-Aware Login System 🔐

A TypeScript + React web prototype exploring passwordless authentication through facial verification and user-defined facial gestures.

**Project Type:** Software Prototype  
**Focus:** Biometric Authentication · Security UX · React · TypeScript

---

## 📌 Overview

Traditional password-based authentication can expose users to problems such as password reuse, phishing, credential theft, and password fatigue.

The Cognitive-Aware Login System explores an alternative authentication experience by combining:

- 👤 Facial verification
- 👁️ User-defined facial gestures
- 📷 Real-time camera interaction
- 🔐 Multi-step authentication flow
- ⚡ Interactive security-focused UI

The prototype demonstrates how "something you are" (face) and "something you do" (gesture) can be combined into a personalized authentication workflow.

---

## 🎯 Problem Statement

Password-based authentication creates several usability and security challenges:

- Users often reuse or forget passwords.
- Passwords can be stolen or phished.
- Single-factor authentication provides limited protection.
- Static facial images can potentially be used in spoofing scenarios.
- Strong security mechanisms can introduce additional user friction.

This project explores a more interactive authentication experience using facial verification together with a user-selected gesture.

---

## 💡 Proposed Solution

The system provides a multi-step authentication prototype:

```
             ┌─────────────────┐
             │   Camera Feed   │
             └────────┬────────┘
                      │
                      ▼
             ┌─────────────────┐
             │ Face Detection  │
             └────────┬────────┘
                      │
                      ▼
             ┌─────────────────┐
             │ Gesture Capture │
             └────────┬────────┘
                      │
              ┌───────┴────────┐
              ▼                ▼
       Face Verification   Gesture Check
              │                │
              └───────┬────────┘
                      ▼
             ┌─────────────────┐
             │ Auth Decision   │
             │   GRANT / DENY  │
             └─────────────────┘
```

---

## ✨ Key Features

### 🏠 Landing Page

- Project introduction
- Security-focused messaging
- Animated interface
- Interactive architecture visualization
- Navigation to enrollment and login

### 📝 Enrollment

Users can interact with a real-time camera interface and select a gesture as part of the proposed authentication workflow.

Available gesture options include:

- Left Eye Wink
- Right Eye Wink
- Both Eyebrows Raise
- Head Nod
- Smile
- Custom Gesture

### 🔑 Login

The prototype demonstrates a two-step authentication experience:

- Face scanning / verification
- Gesture confirmation

The interface provides authentication status feedback throughout the process.

### 📊 Dashboard

The dashboard provides a simulated authenticated-user experience containing:

- User profile information
- Security score
- Recent login activity
- Device management
- Account settings

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | Frontend application |
| TypeScript | Type-safe development |
| Vite | Development and build tooling |
| Tailwind CSS | Styling |
| shadcn/ui | UI components |
| Framer Motion | Animations |
| React Router v6 | Application routing |
| WebRTC `getUserMedia` API | Camera access |
| React Hooks | State management |

---

## 🧠 Authentication Concept

The proposed architecture combines two biometric signals:

### 1. Facial Verification

The system concept uses facial characteristics as the first authentication factor.

### 2. Gesture Authentication

The user selects a personalized facial gesture such as a wink, eyebrow raise, nod, or smile.

The combination is intended to provide an additional layer beyond facial verification alone.

---

## 🔬 Technical Architecture

The project report defines the proposed processing pipeline as:

```
Input Layer
    │
    ├── Camera Feed
    │
    ├── Face Detection
    │
    └── Gesture Capture
            │
            ▼
Processing Layer
    │
    ├── Face Embeddings
    │
    └── Gesture Feature Extraction
            │
            ▼
Authentication Layer
    │
    ├── Face Matching
    │
    └── Gesture Sequence Verification
            │
            ▼
Output
    │
    └── Authentication Decision
```

The project explores concepts including face embeddings, cosine similarity, landmark/motion analysis, and sequence matching as part of the proposed architecture.

---

## 🖥️ Application Flow

```
Landing Page
      │
      ▼
   Enroll
      │
      ├── Camera Access
      ├── Face Scan
      └── Gesture Selection
              │
              ▼
            Login
              │
              ├── Face Verification
              └── Gesture Confirmation
                      │
                      ▼
                  Dashboard
```

---

## 📂 Project Structure

```
facesecurity/
│
├── public/
├── src/
│
├── PROJECT_REPORT.md
├── README.md
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── components.json
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/HarchithaNarayanan/facesecurity.git
```

Navigate into the project:

```bash
cd facesecurity
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will then be available through the local development URL provided by Vite.

---

## 📸 Application Screens

**Landing Page**  
Cyberpunk-inspired landing interface introducing the authentication concept.

**Enrollment**  
Camera-based enrollment flow with facial scanning and gesture selection.

**Login**  
Facial verification and gesture confirmation workflow.

**Dashboard**  
Authenticated-user dashboard containing security and account information.

---

## 🧪 Testing & Feedback

The prototype was reviewed by:

- Classmates
- Project mentor
- Security-conscious users
- UX peers

Feedback highlighted:

- Intuitive enrollment flow
- Responsive interface
- Clear security messaging
- Interactive animations
- Modern visual design

---

## 🔮 Future Improvements

The current version is a prototype, and several areas can be developed further:

- Integrate production-ready ML models for facial recognition
- Implement a backend authentication service
- Expand gesture recognition capabilities
- Add accessibility improvements
- Add multilingual support
- Strengthen production-grade security and biometric data handling

---

## 📚 What I Learned

Through this project, I explored:

- Designing authentication workflows
- React component-based development
- TypeScript application development
- Browser camera access using WebRTC
- Client-side routing
- Responsive UI design
- Security-focused UX
- Biometric authentication concepts
- Translating a security problem into an interactive software prototype

---

## 👩‍💻 Author

**Harchitha Narayanan**

Computer Science Engineering Student  
Interested in Full-Stack Development, Software Engineering, TypeScript, React and Node.js.

**GitHub:** [https://github.com/HarchithaNarayanan](https://github.com/HarchithaNarayanan)

---

## ⭐ Project

If you find this project interesting, consider giving the repository a star and exploring the implementation.
