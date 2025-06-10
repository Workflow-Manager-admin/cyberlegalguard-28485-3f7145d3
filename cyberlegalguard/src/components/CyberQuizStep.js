import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * CyberQuizStep: Adaptive cyber hygiene quiz with dynamic questions.
 * Manages 5–7 questions, adapts follow-ups based on answer, and fits into main step navigation.
 * Integrates with parent navigation (e.g., disables parent "Next" if not done).
 */
function CyberQuizStep({ onComplete }) {
  // Define the base quiz questions and dynamic follow-ups
  const questions = [
    {
      id: "q1",
      text: "How do you typically create passwords for your online accounts?",
      options: [
        { label: "I use the same/similar password everywhere", value: "same_all" },
        { label: "I reuse passwords for some sites", value: "reuse_some" },
        { label: "I create unique, strong passwords for each site", value: "unique" },
        { label: "I use a password manager to generate/store passwords", value: "manager" },
      ],
      followup: {
        // Ask about 2FA only if not using a password manager
        condition: (answer) => answer !== "manager",
        nextId: "q2",
      },
    },
    {
      id: "q2",
      text: "Do you use two-factor authentication (2FA) for important accounts (email, banking, etc.)?",
      options: [
        { label: "No, never", value: "never" },
        { label: "Sometimes, when required", value: "sometimes" },
        { label: "Most important accounts", value: "important" },
        { label: "All accounts that support it", value: "all" },
      ],
      followup: {
        // Phishing only if occasionally/skipping 2FA
        condition: (a) => a === "never" || a === "sometimes",
        nextId: "q3a",
        elseId: "q3b",
      },
    },
    // If weak/no 2FA, branch: phishing awareness
    {
      id: "q3a",
      text: "Have you ever clicked a suspicious link in an email or message (phishing)?",
      options: [
        { label: "Yes, and entered info", value: "yes_info" },
        { label: "Yes, but realized before sharing info", value: "yes_but_safe" },
        { label: "No, always spot them", value: "no" },
      ],
      followup: {
        nextId: "q4"
      },
    },
    // If 2FA good, skip to device security
    {
      id: "q3b",
      text: "How often do you update your main device (phone/computer) OS/software?",
      options: [
        { label: "Rarely/Only when forced", value: "rarely" },
        { label: "Sometimes, after reminders", value: "sometimes" },
        { label: "Usually update promptly", value: "prompt" },
        { label: "Automatic updates always on", value: "auto" },
      ],
      followup: {
        nextId: "q4"
      },
    },
    {
      id: "q4",
      text: "Which best describes how you manage your online privacy?",
      options: [
        { label: "Share a lot publicly/social media is open", value: "public" },
        { label: "Careful with personal info, but have public posts", value: "cautious" },
        { label: "Profiles are mostly private", value: "private" },
        { label: "Review all app/site permissions carefully", value: "review" },
      ],
      followup: {
        // Conditional for cloud backup if very public
        condition: (a) => a === "public" || a === "cautious",
        nextId: "q5a",
        elseId: "q5b",
      },
    },
    {
      id: "q5a",
      text: "Do you back up important files/photos in a secure way (cloud or offline)?",
      options: [
        { label: "No regular backups", value: "none" },
        { label: "Occasional manual backups", value: "occasional" },
        { label: "Automatic cloud/service backups", value: "cloud" },
        { label: "Both cloud and offline backups", value: "both" },
      ],
      followup: {}
    },
    {
      id: "q5b",
      text: "Do you ever use public/shared Wi-Fi for sensitive tasks (banking, shopping, etc.)?",
      options: [
        { label: "Yes, often and without precautions", value: "yes_unprotected" },
        { label: "Sometimes, but use VPN/protection", value: "sometimes_vpn" },
        { label: "Rarely or never", value: "rarely" },
      ],
      followup: {}
    }
  ];

  // Step through question sequence adaptively
  const [quizPath, setQuizPath] = useState(["q1"]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Get current question object
  const currentQid = quizPath[currentIndex];
  const currentQ = questions.find((q) => q.id === currentQid);

  // PUBLIC_INTERFACE
  function handleAnswer(value) {
    // Save answer
    const newAnswers = { ...answers, [currentQid]: value };

    // If at last question, trigger completion
    let nextPath = [...quizPath];
    let newIndex = currentIndex;

    // Only add next question if not at the end
    if (!isLastQuestion()) {
      // Determine next based on followup logic
      let follow = currentQ.followup || {};
      let nextId = null;

      if (follow.condition) {
        if (follow.condition(value)) {
          nextId = follow.nextId;
        } else if (follow.elseId) {
          nextId = follow.elseId;
        }
      } else {
        nextId = follow.nextId;
      }

      if (nextId && nextId !== quizPath[currentIndex + 1]) {
        nextPath = [...quizPath.slice(0, currentIndex + 1), nextId];
      } else {
        // If we've gone back then forward, keep forward path pure
        nextPath = nextPath.slice(0, currentIndex + 1);
        if (nextId) nextPath.push(nextId);
      }
      newIndex++;
    }

    setAnswers(newAnswers);
    setQuizPath(nextPath);
    setCurrentIndex(newIndex);

    // If this answer means we're done (no follow-up), complete quiz
    const nextQ = questions.find((q) => q.id === nextPath[newIndex]);
    if (!nextQ) {
      setCompleted(true);
      if (typeof onComplete === "function") {
        onComplete(newAnswers);
      }
    }
  }

  // Move to previous question (for review)
  // PUBLIC_INTERFACE
  function handleBack() {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }

  function isLastQuestion() {
    // If the next step was not determined, or already in last
    return !currentQ.followup?.nextId && !currentQ.followup?.elseId;
  }

  function handleNext() {
    // Only allow Next if the current answer exists
    if (answers[currentQid]) {
      handleAnswer(answers[currentQid]);
    }
  }

  // Show a basic quiz summary when completed
  if (completed) {
    return (
      <div>
        <h2>Your Cyber Hygiene Summary</h2>
        <ul style={{ textAlign: "left", margin: "18px auto", maxWidth: 480 }}>
          {quizPath.map((qid, idx) => {
            const q = questions.find(q => q.id === qid);
            const val = answers[qid];
            const option = q.options.find(o => o.value === val);
            return (
              <li key={qid} style={{ marginBottom: 12 }}>
                <strong>{q.text}</strong>
                <br />
                <span style={{ color: "var(--base-light)" }}>{option ? option.label : val}</span>
              </li>
            );
          })}
        </ul>
        <div style={{margin:"24px auto", maxWidth:420}}>
          <span className="subtitle" style={{ color:"#34FFA1" }}>
            Thank you! You can proceed to Contract Analysis.
          </span>
        </div>
      </div>
    );
  }

  // Main quiz UI
  return (
    <div>
      <h2>Cyber Hygiene Quiz</h2>
      <div style={{ fontSize: 18, fontWeight: 500, margin: "18px 0 4px 0" }}>
        {currentIndex + 1}. {currentQ.text}
      </div>
      <div role="list" style={{display:"flex", flexDirection:"column", gap:10}}>
        {currentQ.options.map(opt => (
          <button
            key={opt.value}
            type="button"
            className="btn"
            style={{
              background: answers[currentQid] === opt.value ? "var(--base-light)" : "rgba(0,255,255,0.14)",
              color: answers[currentQid] === opt.value ? "#000" : "#fff",
              border: answers[currentQid] === opt.value ? "2px solid #00FFFF" : "1px solid var(--border-color)",
              fontWeight: answers[currentQid] === opt.value ? 600 : 400,
              cursor: "pointer",
              textAlign: "left",
              width: "100%",
              fontSize: 17,
            }}
            aria-pressed={answers[currentQid] === opt.value}
            onClick={() => handleAnswer(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
        <button
          className="btn"
          onClick={handleBack}
          disabled={currentIndex === 0}
          aria-label="Back to previous question"
        >
          Back
        </button>
        <span>
          Question {currentIndex + 1} of {quizPath.length}
        </span>
        <button
          className="btn btn-large"
          onClick={handleNext}
          disabled={!answers[currentQid]}
          aria-label={isLastQuestion() ? "Finish quiz" : "Next question"}
        >
          {isLastQuestion() ? "Finish" : "Next"}
        </button>
      </div>
      <div style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 18 }}>
        Your answers are private and used only for generating your safety report.
      </div>
    </div>
  );
}

export default CyberQuizStep;
