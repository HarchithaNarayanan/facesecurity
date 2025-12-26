import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileText, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Report = () => {
  const reportRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const downloadPDF = async () => {
    if (!reportRef.current) return;
    
    const html2pdf = (await import("html2pdf.js")).default;
    
    const opt = {
      margin: [10, 10, 10, 10] as [number, number, number, number],
      filename: "Cognitive_Aware_Login_System_Project_Report.pdf",
      image: { type: "jpeg" as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm" as const, format: "a4" as const, orientation: "portrait" as const },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] as const }
    };

    html2pdf().set(opt).from(reportRef.current).save();
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-8 print:hidden">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <Button onClick={downloadPDF} className="bg-primary hover:bg-primary/90">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>

        {/* Report Content */}
        <div 
          ref={reportRef} 
          className="bg-white text-gray-900 p-8 rounded-lg shadow-xl"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {/* Cover Page */}
          <div className="text-center mb-12 pb-12 border-b-2 border-gray-300">
            <div className="flex justify-center mb-6">
              <FileText className="w-16 h-16 text-cyan-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-8">PROJECT REPORT</h1>
            
            <div className="space-y-4 text-lg">
              <div>
                <span className="font-semibold text-gray-700">Title of Project:</span>
                <p className="text-2xl font-bold text-cyan-700 mt-1">Cognitive-Aware Login System</p>
              </div>
              <div className="mt-6">
                <span className="font-semibold text-gray-700">Name of the Innovator:</span>
                <p className="text-xl mt-1">[Your Name Here]</p>
              </div>
              <div className="flex justify-center gap-12 mt-6">
                <div>
                  <span className="font-semibold text-gray-700">Start Date:</span>
                  <p className="mt-1">[Start Date]</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">End Date:</span>
                  <p className="mt-1">[End Date]</p>
                </div>
              </div>
            </div>
          </div>

          {/* Day 1 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-cyan-700 border-b-2 border-cyan-200 pb-2 mb-4">
              Day 1: Empathise &amp; Define
            </h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Step 1: Understanding the Need</h3>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">Which problem am I trying to solve?</h4>
                <p className="text-gray-600">
                  Traditional password-based authentication systems are vulnerable to security breaches, 
                  phishing attacks, and credential theft. Users struggle to remember complex passwords, 
                  leading to weak password practices or frequent resets.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">Who is affected by this problem?</h4>
                <ol className="list-decimal list-inside text-gray-600 space-y-1">
                  <li>Individual users concerned about account security</li>
                  <li>Organizations handling sensitive data</li>
                  <li>Financial institutions requiring strong authentication</li>
                  <li>Healthcare providers needing HIPAA-compliant access</li>
                  <li>Anyone tired of remembering multiple passwords</li>
                </ol>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">How did I find out about this?</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm">☑ Online Research</span>
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm">☑ AI Tools</span>
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm">☑ Observation</span>
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm">☑ Industry Reports</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Step 2: What is the problem?</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <p className="text-gray-600"><strong>Password Fatigue:</strong> Users create weak, reused passwords across multiple platforms</p>
                <p className="text-gray-600"><strong>Security Vulnerabilities:</strong> Passwords can be stolen, guessed, or phished</p>
                <p className="text-gray-600"><strong>Single-Factor Weakness:</strong> Traditional systems rely on &quot;something you know&quot; alone</p>
                <p className="text-gray-600"><strong>Spoofing Attacks:</strong> Basic facial recognition can be fooled by photos or videos</p>
                <p className="text-gray-600"><strong>User Friction:</strong> Complex security measures frustrate users and reduce adoption</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Why is this problem important to solve?</h3>
              <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                Authentication is the gateway to all digital services. Weak authentication leads to data breaches 
                costing billions annually, identity theft affecting millions of users, loss of trust in digital platforms, 
                and regulatory compliance failures. A cognitive-aware biometric system solves these issues by combining 
                &quot;something you are&quot; (face) with &quot;something you do&quot; (gesture), creating a virtually unbreakable authentication layer.
              </p>
            </div>

            <div className="bg-cyan-50 p-4 rounded-lg border-l-4 border-cyan-500">
              <h4 className="font-semibold text-cyan-800 mb-2">AI Tools used for Step 1 and 2:</h4>
              <ol className="list-decimal list-inside text-gray-600">
                <li><strong>ChatGPT:</strong> Used to research authentication vulnerabilities and user pain points</li>
                <li><strong>Perplexity AI:</strong> Used to analyze current biometric solutions and their limitations</li>
              </ol>
            </div>
          </section>

          {/* Day 2 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-cyan-700 border-b-2 border-cyan-200 pb-2 mb-4">
              Day 2: Ideate
            </h2>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Step 3: List at least 5 different solutions</h3>
              <ol className="list-decimal list-inside space-y-2 bg-gray-50 p-4 rounded-lg">
                <li className="text-gray-600"><strong>Cognitive-Aware Login System</strong> – Combines face recognition with user-defined gestures for dual-layer biometric authentication</li>
                <li className="text-gray-600"><strong>Voice + Face Fusion</strong> – Uses voice patterns combined with facial features for authentication</li>
                <li className="text-gray-600"><strong>Behavioral Biometrics</strong> – Analyzes typing patterns, mouse movements, and device handling</li>
                <li className="text-gray-600"><strong>Liveness Detection Only</strong> – Enhanced facial recognition with anti-spoofing measures</li>
                <li className="text-gray-600"><strong>Gesture-Only Authentication</strong> – Hand gesture recognition without facial components</li>
              </ol>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Step 4: My favourite solution</h3>
              <p className="text-gray-600 bg-cyan-50 p-4 rounded-lg border-l-4 border-cyan-500">
                My favourite solution is the <strong>Cognitive-Aware Login System</strong>, which combines face recognition 
                with user-defined facial gestures (like winking, raising eyebrows, or nodding) to create a multi-factor 
                biometric authentication that is both secure and personalized.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Step 5: Why am I choosing this solution?</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  <li><strong>Multi-Factor Security:</strong> Combines two biometric factors without requiring external devices</li>
                  <li><strong>Anti-Spoofing:</strong> Photos and videos cannot replicate live gestures</li>
                  <li><strong>Personalization:</strong> Users choose their own secret gesture, making it unique</li>
                  <li><strong>Convenience:</strong> No passwords to remember, no hardware tokens to carry</li>
                  <li><strong>Scalability:</strong> Can be implemented on any device with a camera</li>
                  <li><strong>User Engagement:</strong> Interactive gestures make authentication feel modern and secure</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Day 3 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-cyan-700 border-b-2 border-cyan-200 pb-2 mb-4">
              Day 3: Prototype &amp; Test
            </h2>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Step 6: Prototype – Building my first version</h3>
              
              <h4 className="font-semibold text-gray-700 mb-2">What will my solution look like?</h4>
              <p className="text-gray-600 mb-4">A cyberpunk-themed web application with:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-cyan-700 mb-2">1. Landing Page (/)</h5>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Animated hero section with scanning effects</li>
                    <li>Feature cards highlighting security advantages</li>
                    <li>Interactive architecture diagram</li>
                    <li>Security metrics display</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-cyan-700 mb-2">2. Enrollment Page (/enroll)</h5>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Real-time camera feed with face detection</li>
                    <li>Scanning animation overlay</li>
                    <li>Gesture selection grid</li>
                    <li>Progress indicators</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-cyan-700 mb-2">3. Login Page (/login)</h5>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Face scanning with verification</li>
                    <li>Gesture recognition prompt</li>
                    <li>Authentication status indicators</li>
                    <li>Fallback options</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-cyan-700 mb-2">4. Dashboard (/dashboard)</h5>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>User profile information</li>
                    <li>Security score display</li>
                    <li>Recent login activity</li>
                    <li>Settings access</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Step 7: Test – Getting Feedback</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-800 mb-2">👍 What works well:</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Stunning cyberpunk UI with glassmorphism effects</li>
                    <li>Smooth animations and scanning effects</li>
                    <li>Intuitive enrollment flow</li>
                    <li>Clear security messaging</li>
                    <li>Responsive design across devices</li>
                  </ul>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
                  <h4 className="font-semibold text-amber-800 mb-2">🔧 What needs improvement:</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Integrate actual ML models for face recognition</li>
                    <li>Add more gesture options</li>
                    <li>Implement backend authentication</li>
                    <li>Add accessibility features</li>
                    <li>Include multi-language support</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-cyan-50 p-4 rounded-lg border-l-4 border-cyan-500">
              <h4 className="font-semibold text-cyan-800 mb-2">AI Tools used for Step 6-7:</h4>
              <ul className="list-disc list-inside text-gray-600">
                <li><strong>ChatGPT:</strong> Helped create security architecture and user flow design</li>
                <li><strong>Lovable AI:</strong> Used to design and build the website with framer-motion animations</li>
                <li><strong>GitHub:</strong> Used to store and share the project files</li>
              </ul>
            </div>
          </section>

          {/* Day 4 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-cyan-700 border-b-2 border-cyan-200 pb-2 mb-4">
              Day 4: Showcase
            </h2>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Step 8: Presenting my Innovation</h3>
              
              <div className="text-center bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-lg mb-6">
                <p className="text-gray-600 mb-2">Final Project Title:</p>
                <h4 className="text-2xl font-bold text-cyan-700">Cognitive-Aware Login System</h4>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">Problem Statement:</h4>
                <p className="text-gray-600">
                  Traditional authentication relies on passwords that are easily forgotten, stolen, or compromised. 
                  Basic biometrics can be spoofed using photos or videos.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">My Innovation:</h4>
                <p className="text-gray-600 mb-3">
                  I created a Cognitive-Aware Login System using Lovable AI that combines:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li><strong>Face Recognition:</strong> Identifies the user&apos;s unique facial features</li>
                  <li><strong>Gesture Authentication:</strong> Requires a secret facial gesture (wink, nod, smile)</li>
                  <li><strong>Liveness Detection:</strong> Ensures a real person is present, not a photo</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">Tools Used:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm">Lovable AI</span>
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm">React + TypeScript</span>
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm">Framer Motion</span>
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm">Tailwind CSS</span>
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm">ChatGPT</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-green-800 mb-2">Impact of My Innovation:</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Eliminates password-related security risks</li>
                  <li>Prevents photo/video spoofing attacks</li>
                  <li>Provides a seamless user experience</li>
                  <li>Sets a new standard for biometric authentication</li>
                </ul>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Step 9: Reflections</h3>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">What did I enjoy the most during this project-based learning activity?</h4>
                  <p className="text-gray-600">
                    I enjoyed designing the cyberpunk aesthetic with glassmorphism effects and creating the scanning animations. 
                    Building an interactive face scanner component and seeing the gesture selection flow come alive was the most rewarding part.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">What was my biggest challenge during this project-based learning activity?</h4>
                  <p className="text-gray-600">
                    My biggest challenge was implementing smooth camera access across different browsers and creating responsive 
                    animations that work on all devices. I also faced difficulty in balancing security messaging with user-friendly design.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Architecture */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-cyan-700 border-b-2 border-cyan-200 pb-2 mb-4">
              Technical Architecture
            </h2>

            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs mb-6 overflow-x-auto">
              <pre>{`┌─────────────────────────────────────────────────────────────┐
│                    INPUT LAYER                               │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────┐  │
│  │ Camera Feed │ -> │ Face Detect │ -> │ Gesture Capture │  │
│  └─────────────┘    └─────────────┘    └─────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  PROCESSING LAYER                            │
│  ┌──────────────────┐    ┌──────────────────────────────┐   │
│  │ Face Embeddings  │    │ Gesture Feature Extraction   │   │
│  │ (128-dim vector) │    │ (Landmark + Motion Analysis) │   │
│  └──────────────────┘    └──────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 AUTHENTICATION LAYER                         │
│  ┌─────────────────┐    ┌─────────────────────────────────┐ │
│  │ Face Matching   │ +  │ Gesture Sequence Verification  │ │
│  │ (Cosine Sim.)   │    │ (DTW / Sequence Matching)      │ │
│  └─────────────────┘    └─────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   OUTPUT LAYER                               │
│              ┌─────────────────────────┐                     │
│              │ Authentication Decision │                     │
│              │   (GRANT / DENY)        │                     │
│              └─────────────────────────┘                     │
└─────────────────────────────────────────────────────────────┘`}</pre>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Security Advantages</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-cyan-100">
                    <th className="border border-gray-300 p-2 text-left">Advantage</th>
                    <th className="border border-gray-300 p-2 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 font-semibold">Anti-Spoofing</td>
                    <td className="border border-gray-300 p-2">Static images cannot perform gestures</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-2 font-semibold">Liveness Detection</td>
                    <td className="border border-gray-300 p-2">Real-time gesture validates live presence</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-semibold">Dual-Factor</td>
                    <td className="border border-gray-300 p-2">Requires both biometric factors to match</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-2 font-semibold">Personalization</td>
                    <td className="border border-gray-300 p-2">User-defined gestures are unique secrets</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-semibold">No Passwords</td>
                    <td className="border border-gray-300 p-2">Eliminates credential theft risks</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-2 font-semibold">Encrypted Storage</td>
                    <td className="border border-gray-300 p-2">Biometric data never stored in plain text</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Implementation Stack</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="font-semibold text-cyan-700">Frontend</p>
                <p className="text-sm text-gray-600">React 18, TypeScript</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="font-semibold text-cyan-700">Styling</p>
                <p className="text-sm text-gray-600">Tailwind CSS</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="font-semibold text-cyan-700">Animations</p>
                <p className="text-sm text-gray-600">Framer Motion</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="font-semibold text-cyan-700">UI Components</p>
                <p className="text-sm text-gray-600">shadcn/ui</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="font-semibold text-cyan-700">Camera</p>
                <p className="text-sm text-gray-600">WebRTC API</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="font-semibold text-cyan-700">Routing</p>
                <p className="text-sm text-gray-600">React Router v6</p>
              </div>
            </div>
          </section>

          {/* Links */}
          <section className="text-center bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-cyan-700 mb-4">Project Links</h2>
            <div className="space-y-2">
              <p className="text-gray-600">
                <strong>PROJECT LINK:</strong> [Your Lovable App URL]
              </p>
              <p className="text-gray-600">
                <strong>GITHUB LINK:</strong> [Your GitHub Repository URL]
              </p>
            </div>
            <p className="text-sm text-gray-500 mt-6 italic">
              Report generated for Cognitive-Aware Login System Project
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Report;
