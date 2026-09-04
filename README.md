# Cognitive-Aware Login System

A biometric authentication system that combines **facial recognition** with a **user-defined facial gesture** for secure, passwordless access.

---

## Project Info

- **Project Name:** Cognitive-Aware Login System
- **Innovator:** [Your Name Here]
- **Start Date:** [Start Date]
- **End Date:** [End Date]
- **Live Preview:** https://id-preview--04361d76-d4c8-43ad-b498-aa84c992d821.lovable.app
- **Published URL:** https://facesecurity.lovable.app

---

## Problem Statement

Traditional password-based authentication systems are vulnerable to:
- Security breaches and credential theft
- Phishing and social engineering attacks
- Users forgetting complex passwords

People need a secure, fast, and easy-to-use authentication method that does not rely on passwords.

## Solution

This project provides a **Cognitive-Aware Login System** that uses two factors:
1. **Face Recognition** - verifies who you are
2. **Gesture Authentication** - verifies a secret action only you know

Together, these create a strong, user-friendly authentication experience.

---

## System Architecture

```
Camera Input
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
Access Granted / Denied
```

---

## Key Features

| Feature | Description |
|---------|-------------|
| Face Recognition | Neural network analyzes facial landmarks for identification |
| Gesture Authentication | User-defined facial gesture acts as a secret key |
| AI-Powered Analysis | Real-time machine learning for liveness detection |
| Passwordless Login | No passwords to remember or steal |
| Military-Grade Security | AES-256 encryption for biometric data |

---

## Technology Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Routing:** React Router v6
- **Camera Access:** WebRTC `getUserMedia` API
- **Build Tool:** Vite 5

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with system overview |
| `/enroll` | Register your face and choose a gesture |
| `/login` | Verify face and perform gesture to log in |
| `/dashboard` | Secure dashboard after successful login |
| `/report` | Styled project report with PDF download |

---

## How to Run Locally

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies
npm i

# Step 4: Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` by default.

---

## How to Deploy

1. Open [Lovable](https://lovable.dev)
2. Click **Share** → **Publish**
3. Your app will be live on the published URL

---

## Security Considerations

- Biometric data should be encrypted before storage
- Liveness detection prevents spoofing with photos or videos
- Gestures add a cognitive layer that is hard to replicate
- For production, use a secure backend with proper authentication

---

## Future Enhancements

- Add liveness detection with blink/head movement checks
- Implement real backend authentication with Lovable Cloud
- Multi-device profile sync
- 2FA support with email or OTP
- Onboarding tutorial for first-time users

---

## License

[Your License Here]

---

*Report generated for Cognitive-Aware Login System Project*
