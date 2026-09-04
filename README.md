# Cognitive-Aware Login System

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

A biometric authentication prototype that combines **facial recognition** with a **user-defined facial gesture** for a secure, passwordless login experience.

> **Demo Notice:** This is a frontend prototype built for experimentation and demonstration. The face and gesture recognition logic in the current build is simulated for UI/UX evaluation. Production use requires a secure backend, encrypted biometric storage, and real ML models.

---

## Live Demo

- **Preview:** https://id-preview--04361d76-d4c8-43ad-b498-aa84c992d821.lovable.app
- **Published:** https://facesecurity.lovable.app

---

## What It Does

Traditional passwords are easy to forget, reuse, and steal. Biometric login is better, but a static face or fingerprint can still be spoofed with a photo or video.

This project adds a **cognitive layer**: after recognizing your face, the system asks you to perform a secret gesture that only you know — a wink, head nod, smile, or eyebrow raise. Because the gesture is dynamic and changeable, it acts as both a second factor and a lightweight liveness check.

### Authentication Flow

```
Camera Input (WebRTC)
        |
        v
Face Detection
        |
        v
Face Encoding
        |
        v
Gesture Recognition
        |
        v
Match + Decision → Access Granted / Denied
```

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Face Recognition** | Detects and identifies the user from live camera input. |
| **Gesture Authentication** | User-defined facial gesture acts as a secret second factor. |
| **Liveness Defense** | Live gesture requirement helps resist photo/video replay attacks. |
| **Passwordless UX** | No passwords to type, remember, or steal. |
| **Cyberpunk UI** | Dark, animated interface built with Tailwind CSS and Framer Motion. |

---

## Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Routing:** React Router v6
- **Camera Access:** WebRTC `getUserMedia`
- **Build Tool:** Vite 5

### Recommended Production ML Stack

- **Face Detection:** MTCNN, Haar Cascade, or RetinaFace
- **Face Encoding:** FaceNet, DeepFace, or ArcFace
- **Gesture Recognition:** MediaPipe Face Mesh + custom CNN / LSTM / Transformer
- **Backend:** Secure cloud API with encrypted biometric storage

---

## Project Structure

```
/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components (AuthFlow, FaceScanner, etc.)
│   ├── pages/              # Route pages (Index, Enroll, Login, Dashboard, Report, NotFound)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── App.tsx             # Main app with route definitions
│   ├── main.tsx            # Entry point
│   ├── index.css           # Global styles
│   └── vite-env.d.ts       # Vite type declarations
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

---

## Pages and Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with system overview |
| `/enroll` | Register your face and choose a secret gesture |
| `/login` | Verify face and perform gesture to log in |
| `/dashboard` | Secure dashboard shown after successful authentication |
| `/report` | Project report page with documentation |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm
- A browser with camera support

### Install and Run

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Enter the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will open at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

The optimized static files will be in the `dist/` folder, ready for deployment to any static host.

---

## Usage

1. **Enroll:** Visit `/enroll`, allow camera access, and set up your face + secret gesture.
2. **Login:** Visit `/login`, look at the camera, and perform your gesture when prompted.
3. **Dashboard:** On success, you are taken to the protected dashboard.

> **Tip:** Use even lighting, keep the camera at eye level, and avoid heavy face coverings for the best results.

---

## Security Notes

- **Encrypt biometric data** at rest and in transit (AES-256 or equivalent).
- **Use a secure backend** for production; do not store raw biometric templates in browser storage.
- **Add liveness detection** such as blink detection, head movement, or challenge-response prompts.
- **Rate-limit login attempts** to prevent brute-force attacks.
- **Comply with privacy laws** (GDPR, CCPA, etc.) when collecting and storing biometric data.
- **Never rely on client-side state alone** for authentication decisions.

---

## Model Architecture

### Face Recognition Branch

```
Input Frame
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
Similarity Comparison → Identity Match
```

### Gesture Recognition Branch

```
Video Frames
    |
    v
Facial Landmark Extraction (MediaPipe Face Mesh)
    |
    v
Temporal Landmark Sequence
    |
    v
CNN / LSTM / Transformer Classifier
    |
    v
Gesture Classification
```

---

## Training Pipeline (Production)

1. **Data Collection** — Capture labeled face images and gesture videos from consenting users.
2. **Preprocessing** — Align faces, normalize landmarks, and augment data.
3. **Face Model Training** — Fine-tune a pretrained face embedding model.
4. **Gesture Model Training** — Train a temporal classifier on landmark sequences.
5. **Validation** — Measure accuracy, precision, recall, and ROC-AUC.
6. **Threshold Tuning** — Balance security (low false accepts) and usability (low false rejects).
7. **Deployment** — Serve models through a secure, rate-limited backend API.

---

## Future Enhancements

- Real face recognition and gesture classification models
- Secure cloud backend with encrypted biometric storage
- Robust liveness detection (blink, head movement, challenge-response)
- Multi-device profile sync
- Optional 2FA with email or SMS OTP
- Onboarding tutorial for first-time users
- Accessibility features (audio prompts, alternative auth paths)

---

## License

[Your License Here]

---

*Built as a biometric authentication research prototype.*
