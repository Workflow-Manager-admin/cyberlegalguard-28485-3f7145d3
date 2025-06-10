import React from "react";

/**
 * PUBLIC_INTERFACE
 * WelcomeStep: Brand-aligned welcome page for CyberLegalGuard.
 * Displays intro, brand messaging, 3-minute promise, and CTA button.
 * @param {object} props
 * @param {function} props.onStart - Callback for CTA ("Start Assessment")
 */
function WelcomeStep({ onStart }) {
  // Visual style: bold CTA, clear brand, inviting reassurance
  return (
    <div>
      <div className="subtitle" style={{ marginBottom: 8, letterSpacing: 1 }}>
        Welcome to
      </div>
      <div className="title" style={{ color: "var(--base-light)" }}>
        <span style={{ filter: "drop-shadow(0 0 8px #00ffff55)" }}>
          CyberLegalGuard
        </span>
      </div>
      <div
        className="description"
        style={{
          margin: "28px auto 18px auto",
          fontSize: "1.22rem",
          fontWeight: 400,
        }}
      >
        Your AI-powered companion for digital safety and legal peace of mind.<br />
        <br />
        <span style={{ color: "#fff", fontWeight: 500 }}>
          In just 3 minutes,
        </span>{" "}
        assess your online habits and review your contracts like an expert. Get a personalized Digital Safety Index, spot real risks, and get easy tips you can trust—instantly. <br />
        <br />
        <span style={{ color: "#00ffff", fontWeight: 500 }}>
          No jargon. No guesswork.<br/>
          Just smart, friendly guidance.
        </span>
      </div>
      <button
        className="btn btn-large"
        style={{
          marginTop: 28,
          fontWeight: 600,
          letterSpacing: 0.5,
          background: "linear-gradient(90deg,#00ffff,#0a406a 85%)",
          boxShadow: "0 4px 24px 0 #00ffff44",
        }}
        onClick={onStart}
        aria-label="Start your digital and legal risk assessment"
      >
        Start Assessment
      </button>
      <div style={{ fontSize: 14, marginTop: 18, color: "var(--text-secondary)" }}>
        Private. Fast. Created by Kavia, your trusted AI risk partner.
      </div>
    </div>
  );
}

export default WelcomeStep;
