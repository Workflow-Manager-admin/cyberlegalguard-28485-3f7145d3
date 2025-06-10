import React, { useState } from 'react';
import './App.css';

import WelcomeStep from './components/WelcomeStep';
import CyberQuizStep from './components/CyberQuizStep';
import ContractUploadStep from './components/ContractUploadStep';
import SimulatedRisksStep from './components/SimulatedRisksStep';
import DashboardStep from './components/DashboardStep';

// Order of steps as components
const stepComponents = [
  WelcomeStep,
  CyberQuizStep,
  ContractUploadStep,
  SimulatedRisksStep,
  DashboardStep,
];

const stepTitles = [
  "Welcome",
  "Cyber Hygiene Quiz",
  "Contract Analysis",
  "Simulated Risks",
  "Dashboard",
];

// PUBLIC_INTERFACE
function App() {
  // Tracks which step the user is at
  const [activeStep, setActiveStep] = useState(0);
  const TotalSteps = stepComponents.length;

  const StepComponent = stepComponents[activeStep];

  // Navigate steps, ensuring within bounds
  const handleNext = () => setActiveStep((s) => Math.min(TotalSteps - 1, s + 1));
  const handleBack = () => setActiveStep((s) => Math.max(0, s - 1));

  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <span className="subtitle" style={{ alignSelf: "center" }}>
              {stepTitles[activeStep]}
            </span>
            <button className="btn" disabled>
              {/* Placeholder for generic nav button (hidden/disabled) */}
            </button>
          </div>
        </div>
      </nav>

      <main>
        <div className="container" style={{ paddingTop: 110 }}>
          <div className="hero" style={{ minHeight: 420 }}>
            <StepComponent />
            <div style={{
              marginTop: 32,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              gap: 12,
              alignItems: 'center',
              maxWidth: 440
            }}>
              <button
                className="btn"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                Back
              </button>
              <span>Step {activeStep + 1} of {TotalSteps}</span>
              <button
                className="btn btn-large"
                onClick={handleNext}
                disabled={activeStep === TotalSteps - 1}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;