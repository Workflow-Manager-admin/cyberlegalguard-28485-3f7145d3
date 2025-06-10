import React, { useEffect, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * DashboardStep: Combines cyber hygiene quiz and contract analysis data (stub/mock version).
 * Calculates and displays Digital Safety Index ("Low", "Medium", "High").
 * Prepares data structure for later detailed dashboard reporting.
 * TODO: Connect wizard data context or prop drill input data for live app use.
 */
function DashboardStep() {
  // For now, using MOCKED previous-state input as placeholders
  // Simulate Cyber Quiz answers
  const mockQuizAnswers = {
    q1: "reuse_some", // e.g. not unique password
    q2: "sometimes",  // 2FA not always
    q3a: "yes_but_safe", // clicked phishing link, but didn't enter info
    q4: "cautious", // some public exposure
    q5a: "occasional" // only occasional backups
    // ...etc
  };

  // Simulate analyzed contract risks (from ContractUploadStep)
  const mockContractAnalysis = {
    summary: "Automated risk review complete. Highlighted below:",
    risks: [
      {
        title: "Early Termination Clause",
        severity: "Medium",
        description: "The contract allows early termination, which might expose you to business interruptions or fees.",
      },
      {
        title: "Uncapped Liability",
        severity: "High",
        description: "You may be responsible for unlimited damages. Negotiate for a reasonable cap.",
      }
    ]
  };

  /**
   * Mock logic for Digital Safety Index combining cyber/contract inputs.
   * Cyber risk: points for unsafe habits; Contract risk: points for risk severities.
   * Returns: { index: "Low"/"Medium"/"High", score, breakdown }
   */
  function computeDigitalSafetyIndex(quiz, contract) {
    let cyberScore = 0;
    // Penalize unsafe password reuse
    if (quiz.q1 === "same_all") cyberScore += 2;
    else if (quiz.q1 === "reuse_some") cyberScore += 1;
    // 2FA
    if (quiz.q2 === "never") cyberScore += 2;
    else if (quiz.q2 === "sometimes") cyberScore += 1;
    // Phishing awareness
    if (quiz.q3a) {
      if (quiz.q3a === "yes_info") cyberScore += 2;
      else if (quiz.q3a === "yes_but_safe") cyberScore += 1;
    }
    // Privacy practices
    if (quiz.q4 === "public") cyberScore += 2;
    else if (quiz.q4 === "cautious") cyberScore += 1;
    // Backups or Wi-Fi
    if (quiz.q5a && (quiz.q5a === "none" || quiz.q5a === "occasional")) cyberScore += 1;

    // Contract risk: Each "High" = 2, "Medium" = 1, "Low" = 0
    let contractScore = 0;
    if (contract && Array.isArray(contract.risks)) {
      for (const risk of contract.risks) {
        if (risk.severity === "High") contractScore += 2;
        else if (risk.severity === "Medium") contractScore += 1;
      }
    }

    // Combine scores for a max of 10 ("high risk"), 5-7 ("medium"), lower ("low")
    const total = cyberScore + contractScore;
    let index, color;
    if (total >= 7) { index = "High"; color = "#FF4D4D"; }
    else if (total >= 4) { index = "Medium"; color = "#FFD44A"; }
    else { index = "Low"; color = "#00FFD0"; }

    return {
      index,
      color,
      score: total,
      details: {
        cyberScore,
        contractScore,
        quiz,
        contract
      }
    };
  }

  // Compute when mounts
  const [report, setReport] = useState(null);

  useEffect(() => {
    // In live app, get actual state from parent/context or wizard.
    // Here: mock demo only.
    const result = computeDigitalSafetyIndex(mockQuizAnswers, mockContractAnalysis);
    setReport(result);
  }, []);

  if (!report) {
    // Loading indicator
    return (
      <div>
        <h2>Dashboard</h2>
        <p>Preparing your Digital Safety Index&#8230;</p>
      </div>
    );
  }

  // Final UI
  return (
    <div>
      <h2>Dashboard</h2>
      <div style={{
        margin: "18px auto 24px auto",
        padding: "18px",
        background: "#061f36ef",
        borderRadius: 10,
        boxShadow: "0 2px 14px #00ffd033",
        maxWidth: 480
      }}>
        <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8, color: report.color }}>
          Digital Safety Index: {report.index}
        </div>
        <div style={{ color: "var(--text-secondary)", marginBottom: 7 }}>
          Your Digital Safety Index is a combined score reflecting both your cyber habits and any legal/contract risk flagged.
        </div>
        <div>
          <span style={{
            fontSize: 15,
            fontWeight: 500,
            background: report.color,
            color: "#111",
            padding: "2px 10px",
            borderRadius: 6,
            marginRight: 7
          }}>
            {report.index} Risk
          </span>
          <span style={{ fontSize: 14, color: "#AAA", marginLeft: 7 }}>
            (Score: {report.score} / 10)
          </span>
        </div>
        <div style={{ marginTop: 18 }}>
          <ul style={{ paddingLeft: 15, margin: 0 }}>
            <li><b>Cyber Hygiene Score:</b> {report.details.cyberScore}</li>
            <li><b>Contract Risk Score:</b> {report.details.contractScore}</li>
          </ul>
        </div>
      </div>
      <div style={{margin:"30px auto 22px auto", maxWidth: 500}}>
        <h3 style={{ color: "#00ffd6", fontSize: 19, marginBottom:8, marginTop:8 }}>
          Summary of Risks Identified
        </h3>
        <ul style={{color:"#FFD44A", paddingLeft:16}}>
          {report.details.contract.risks.map((risk, i) => (
            <li key={i}>
              <span style={{
                fontWeight: 600,
                color: risk.severity === "High"
                  ? "#FF4D4D"
                  : risk.severity === "Medium"
                  ? "#FF9800"
                  : "#8ae5c5"
              }}>{risk.title} [{risk.severity}]</span>
              <span style={{ color: "#B6F5FF", marginLeft:7 }}>{risk.description}</span>
            </li>
          ))}
        </ul>
      </div>
      <div style={{marginTop:28, fontSize:14, color:"var(--text-secondary)", maxWidth:500}}>
        <b>How is this score calculated?</b><br/>
        Assessment combines your quiz answers and contract risks you uploaded. As best practice:
        <ul style={{margin:"6px 0 0 14px", color:"#C3CEF0"}}>
          <li>Use unique passwords and 2FA for all accounts.</li>
          <li>Avoid clicking unknown links, check sender domains, and keep info private.</li>
          <li>For contracts: Watch for uncapped liability, auto-renewals, and ambiguous exit terms.</li>
        </ul>
        <div style={{marginTop: 7}}>Your full report (with improvement tips) will be available soon.</div>
      </div>
    </div>
  );
}

export default DashboardStep;
