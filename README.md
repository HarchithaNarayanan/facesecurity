# Cognitive-Aware Login System

A next-generation biometric authentication system that combines **facial recognition** with a **user-defined facial gesture** to create a secure, passwordless login experience. This project demonstrates how cognitive awareness — the ability to verify both *who* a user is and *what* they do — can strengthen digital identity verification beyond traditional passwords and PINs.

---

## Project Information

| Field | Details |
|-------|---------|
| **Project Name** | Cognitive-Aware Login System |
| **Innovator** | [Your Name Here] |
| **Start Date** | [Start Date] |
| **End Date** | [End Date] |
| **Live Preview** | https://id-preview--04361d76-d4c8-43ad-b498-aa84c992d821.lovable.app |
| **Published URL** | https://facesecurity.lovable.app |

---

## Table of Contents

1. [Introduction](#introduction)
2. [Problem Statement](#problem-statement)
3. [Proposed Solution](#proposed-solution)
4. [System Architecture](#system-architecture)
5. [Key Features](#key-features)
6. [Technology Stack](#technology-stack)
7. [Application Structure](#application-structure)
8. [Pages and Routes](#pages-and-routes)
9. [Installation and Setup](#installation-and-setup)
10. [Usage Guide](#usage-guide)
11. [Security Considerations](#security-considerations)
12. [Model Architecture](#model-architecture)
13. [Training Pipeline](#training-pipeline)
14. [Future Enhancements](#future-enhancements)
15. [License](#license)

---

## Introduction

Passwords have been the dominant form of authentication for decades, but they suffer from well-known weaknesses: weak user choices, credential stuffing, phishing, and forgotten credentials. Biometric authentication offers a compelling alternative, yet a static biometric such as a face or fingerprint can still be spoofed if an attacker captures a high-quality image or replica.

The **Cognitive-Aware Login System** addresses this by adding a second, dynamic factor: a **secret facial gesture** chosen by the user. During enrollment, the user registers their face and selects a gesture such as a wink, head nod, smile sequence, or eyebrow raise. During login, the system verifies both the user's identity and the performed gesture before granting access.

---

## Problem Statement

Traditional authentication methods face serious challenges:

- **Credential Theft:** Stolen username/password pairs are sold and reused across services.
- **Phishing and Social Engineering:** Users are tricked into revealing login details.
- **Password Fatigue:** Complex password requirements lead to reuse, sticky notes, and frequent resets.
- **Static Biometric Risks:** A face or fingerprint alone, once leaked or copied, cannot be changed like a password.

People need an authentication method that is:

- Secure against theft and replay attacks
- Easy to use without memorizing credentials
- Hard to fake, even if biometric data is captured
- Adaptable to everyday devices with a camera

---

## Proposed Solution

This system introduces a **two-factor cognitive authentication** flow:

1. **Face Recognition Factor** — Confirms the user's physical identity by analyzing facial landmarks and generating a unique face embedding.
2. **Gesture Authentication Factor** — Confirms a secret action known only to the user, adding a dynamic, changeable layer of security.

Because the gesture is performed live during authentication, it acts as a liveness check and protects against simple photo or video replay attacks. The user can also change their gesture if they ever feel it has been observed.

---

## System Architecture

The authentication pipeline follows a clear sequence from camera input to access decision:

```
Camera Input (WebRTC)
        |
        v
Face Detection (Haar Cascade / MTCNN)
        |
        v
Face Encoding (FaceNet / DeepFace)
        |
        v
Gesture Recognition (MediaPipe / Custom CNN)
        |
        v
Matching & Decision Engine
        |
        v
Access Granted / Access Denied
```

### Component Responsibilities

| Stage | Responsibility |
|-------|------------------|
| **Camera Input** | Captures live video stream from the user's device camera using the WebRTC `getUserMedia` API. |
| **Face Detection** | Locates the face within the video frame using classical cascades or deep-learning detectors. |
| **Face Encoding** | Converts the detected face into a compact numerical embedding that uniquely represents the user's identity. |
| **Gesture Recognition** | Analyzes facial landmarks over time to classify the user's chosen gesture. |
| **Matching Engine** | Compares the new face embedding and gesture classification against enrolled records. |
| **Decision Engine** | Grants or denies access based on similarity thresholds and gesture correctness. |

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Face Recognition** | Uses neural network-based facial analysis to identify users from live camera input. |
| **Gesture Authentication** | Allows users to define a secret facial gesture that must be performed to complete login. |
| **Liveness Detection** | The live gesture requirement helps prevent spoofing with static photos or pre-recorded videos. |
| **Passwordless Experience** | Users authenticate without typing or remembering passwords. |
| **Modern UI** | Built with a responsive, animation-rich interface for a smooth user experience. |

---

## Technology Stack

### Frontend

- **React 18** — Component-based user interface library
- **TypeScript** — Type-safe JavaScript for robust development
- **Tailwind CSS** — Utility-first CSS framework for styling
- **shadcn/ui** — Accessible, reusable UI components
- **Framer Motion** — Smooth animations and transitions
- **React Router v6** — Client-side routing and navigation

### Media and Camera

- **WebRTC `getUserMedia` API** — Secure camera access from the browser

### Build Tool

- **Vite 5** — Fast development server and optimized production builds

### Recommended Backend / ML (for production deployment)

- **Python** with **OpenCV**, **dlib**, **FaceNet**, or **DeepFace** for face recognition
- **MediaPipe** or a **Custom Convolutional Neural Network (CNN)** for gesture recognition
- **Secure cloud database** with encryption at rest and in transit

---

## Application Structure

```
/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Application pages (Landing, Enroll, Login, Dashboard, Report)
│   ├── hooks/              # Custom React hooks (camera, animation, etc.)
│   ├── lib/                # Utility functions and helpers
│   ├── styles/             # Global and component styles
│   ├── App.tsx             # Main application component with routes
│   └── main.tsx            # Application entry point
├── index.html              # HTML entry point
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── vite.config.ts          # Vite build configuration
```

---

## Pages and Routes

| Route | Description |
|-------|-------------|
| `/` | **Landing Page** — Introduces the system, its benefits, and how it works. |
| `/enroll` | **Enrollment Page** — Captures the user's face and lets them choose a secret gesture. |
| `/login` | **Login Page** — Verifies the user's face and prompts for the enrolled gesture. |
| `/dashboard` | **Secure Dashboard** — Accessible only after successful authentication. |
| `/report` | **Project Report** — Styled project documentation page with optional PDF export. |

---

## Installation and Setup

### Prerequisites

- Node.js 18 or later
- npm, yarn, or pnpm package manager
- A modern web browser with camera support
- (Optional) A secure backend for production biometric storage

### Step-by-Step Setup

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate into the project folder
cd <YOUR_PROJECT_NAME>

# Step 3: Install project dependencies
npm install

# Step 4: Start the local development server
npm run dev
```

The application will be available at `http://localhost:5173` by default. Open this URL in a browser and allow camera access when prompted.

### Build for Production

```sh
npm run build
```

This command generates an optimized `dist` folder ready for deployment to any static hosting provider.

---

## Usage Guide

### First-Time Enrollment

1. Navigate to the `/enroll` route.
2. Allow camera access when the browser requests permission.
3. Position your face within the on-screen frame.
4. Capture your face embedding.
5. Choose and record a secret facial gesture (for example: wink, nod, or smile).
6. Confirm enrollment.

### Logging In

1. Navigate to the `/login` route.
2. Allow camera access.
3. Look at the camera so the system can recognize your face.
4. Perform your enrolled gesture when prompted.
5. If both factors match, you are redirected to the dashboard.

### Tips for Best Results

- Use good, even lighting on your face.
- Keep the camera at eye level.
- Avoid wearing items that heavily obscure your face during enrollment and login.
- Perform gestures clearly and at a moderate speed.

---

## Security Considerations

- **Encrypt Biometric Data:** Face embeddings and gesture records must be encrypted at rest and in transit using strong encryption such as AES-256.
- **Use a Secure Backend:** This frontend demo stores data locally for illustration. In production, biometric information should never be stored in browser local storage without encryption.
- **Implement Liveness Detection:** Combine gesture recognition with blink detection, head movement, or challenge-response prompts to prevent spoofing.
- **Apply Rate Limiting:** Limit repeated failed login attempts to prevent brute-force attacks.
- **Follow Privacy Regulations:** Comply with GDPR, CCPA, or other applicable data protection laws when handling biometric information.
- **Never Trust Client-Side State Alone:** Production authentication decisions must be validated on a secure server.

---

## Model Architecture

The proposed machine-learning architecture has two parallel branches:

### 1. Face Recognition Branch

```
Input Image
    |
    v
Face Detection (MTCNN / Haar Cascade)
    |
    v
Aligned Face Crop
    |
    v
FaceNet / DeepFace Embedding Network
    |
    v
128-D or 512-D Face Embedding
    |
    v
Similarity Comparison (Cosine / Euclidean)
```

### 2. Gesture Recognition Branch

```
Video Frames
    |
    v
Facial Landmark Extraction (MediaPipe Face Mesh)
    |
    v
Temporal Sequence of Landmarks
    |
    v
Custom CNN / LSTM / Transformer Classifier
    |
    v
Gesture Classification
```

---

## Training Pipeline

1. **Data Collection:** Gather face images and gesture videos from consenting users under varied lighting, angles, and backgrounds.
2. **Preprocessing:** Detect and align faces; normalize landmarks and frames.
3. **Face Model Training:** Fine-tune a pretrained FaceNet or DeepFace model on the collected face dataset.
4. **Gesture Model Training:** Train a temporal classifier on sequences of facial landmarks labeled by gesture class.
5. **Validation:** Evaluate face recognition accuracy with metrics such as accuracy, precision, recall, and ROC-AUC.
6. **Threshold Tuning:** Set similarity and confidence thresholds that balance security and usability.
7. **Deployment:** Serve models through a secure backend API with rate limiting and logging.

---

## Future Enhancements

- Add robust liveness detection using blink, head movement, and challenge-response prompts.
- Implement a secure cloud backend for encrypted biometric storage and server-side verification.
- Add multi-device profile synchronization.
- Support additional authentication factors such as email or SMS one-time passwords.
- Provide a guided onboarding tutorial for first-time users.
- Improve gesture recognition with larger, more diverse training datasets.
- Add accessibility features such as audio prompts and alternative authentication paths.

---

## License

[Your License Here]

---

*Report generated for Cognitive-Aware Login System Project*
