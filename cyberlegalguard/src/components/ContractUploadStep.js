import React, { useRef, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * ContractUploadStep: Allows users to upload, paste, or type contracts/agreements.
 * Performs mock contract analysis (placeholder, no NLP) and displays fake/extracted risks.
 */
function ContractUploadStep() {
  const fileInput = useRef(null);

  // State for contract document input
  const [contractText, setContractText] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock analyzer - simulate extracting risks from contract text
  // PUBLIC_INTERFACE
  function analyzeContract(text) {
    setLoading(true);
    // Placeholder: extract "risks" by keyword or just give fake results for demonstration
    // (Real logic would use NLP/GPT, but this is stubbed for now)
    setTimeout(() => {
      if (!text || text.trim().length < 20) {
        setAnalysisResult({
          risks: [],
          summary: "No significant content found. Please provide more contract details.",
        });
      } else {
        // Fake logic: flag "termination", "arbitration", "liability", "confidential"
        const lowerText = text.toLowerCase();
        const risks = [];
        if (lowerText.includes("termination")) {
          risks.push({
            title: "Early Termination Clause",
            severity: "Medium",
            description: "The contract allows early termination, which might expose you to business interruptions or fees.",
          });
        }
        if (lowerText.includes("arbitration")) {
          risks.push({
            title: "Mandatory Arbitration",
            severity: "Low",
            description: "All disputes are resolved via arbitration. This can limit your access to courts.",
          });
        }
        if (lowerText.includes("liability") || lowerText.includes("indemnify")) {
          risks.push({
            title: "Uncapped Liability",
            severity: "High",
            description: "You may be responsible for unlimited damages. Negotiate for a reasonable cap.",
          });
        }
        if (lowerText.includes("confidential")) {
          risks.push({
            title: "Confidentiality Obligations",
            severity: "Medium",
            description: "You are required to keep information confidential. Breaches may result in legal consequences.",
          });
        }
        // Always add a couple of generic mock risks if short
        if (risks.length === 0) {
          risks.push({
            title: "No obvious risky clauses found",
            severity: "Low",
            description: "Contract appears simple, but always review thoroughly or consult an expert.",
          });
        }
        setAnalysisResult({
          summary: "Automated risk review complete. Highlighted below:",
          risks,
        });
      }
      setLoading(false);
    }, 1200);
  }

  // PUBLIC_INTERFACE
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onload = (evt) => {
        setContractText(evt.target.result);
        setAnalysisResult(null); // Reset previous result
      };
      reader.readAsText(file);
    }
  }

  // PUBLIC_INTERFACE
  function handleAnalyzeClick(e) {
    e.preventDefault();
    analyzeContract(contractText);
  }

  // PUBLIC_INTERFACE
  function handlePasteOrEdit(e) {
    setContractText(e.target.value);
    setUploadedFileName("");
    setAnalysisResult(null);
  }

  // PUBLIC_INTERFACE
  function handleSampleFill() {
    // Provide a realistic short contract sample for demo
    const sample = `This Agreement may be terminated by either party with 30 days notice.
All disputes shall be resolved by binding arbitration.
The party agrees to indemnify and hold harmless the other for all liabilities.
All information is to remain confidential.`;
    setContractText(sample);
    setUploadedFileName("Sample_Agreement.txt");
    setAnalysisResult(null);
  }

  return (
    <div>
      <h2>Contract Upload & Risk Analysis</h2>
      <p>
        Upload your contract or paste text below for instant analysis.{" "}
        <span style={{ color: "var(--base-light)", fontWeight: 500 }}>
          No data is stored – processing is local.
        </span>
      </p>

      {/* Upload section */}
      <div
        style={{
          display: "flex",
          gap: 14,
          margin: "26px 0 16px 0",
          alignItems: "center",
        }}
      >
        {/* Hidden file input */}
        <input
          type="file"
          accept=".txt,.doc,.docx,.pdf,.rtf"
          style={{ display: "none" }}
          ref={fileInput}
          onChange={handleFileChange}
        />
        <button
          className="btn"
          type="button"
          onClick={() => fileInput.current && fileInput.current.click()}
          aria-label="Upload contract"
        >
          Upload File
        </button>
        <span style={{
          color: uploadedFileName ? "var(--base-light)" : "var(--text-secondary)",
          fontSize: 15, fontWeight: 500, minWidth: 60
        }}>
          {uploadedFileName || "No file selected"}
        </span>
        <button
          className="btn"
          type="button"
          style={{ background: "#444", border: "1px solid #00FFF0" }}
          onClick={handleSampleFill}
        >
          Use Sample
        </button>
      </div>

      {/* Paste/edit area */}
      <textarea
        placeholder="Paste or type contract/agreement text here..."
        style={{
          width: "100%",
          minHeight: 150,
          fontSize: 16,
          padding: 12,
          marginTop: 4,
          border: "1.5px solid var(--border-color)",
          borderRadius: 6,
          background: "#0a406a38",
          color: "var(--text-color)"
        }}
        value={contractText}
        onChange={handlePasteOrEdit}
        spellCheck={false}
      />

      {/* Analyze button */}
      <div style={{ margin: "20px 0 0 0", display: "flex", justifyContent: "flex-end" }}>
        <button
          className="btn btn-large"
          type="button"
          onClick={handleAnalyzeClick}
          disabled={!contractText || loading}
        >
          {loading ? "Analyzing..." : "Analyze Contract"}
        </button>
      </div>

      {/* Analysis results */}
      {analysisResult && (
        <div style={{
          marginTop: 30,
          padding: 20,
          background: "#013d55b4",
          borderRadius: 8,
          boxShadow: "0 2px 16px #00ffff33"
        }}>
          <div style={{
            fontSize: 19, fontWeight: 600, color: "var(--base-light)",
            marginBottom: 14
          }}>
            Risk Assessment
          </div>
          <div style={{ marginBottom: 12, color: "#B8F5FF", fontSize: 16 }}>
            {analysisResult.summary}
          </div>
          <ul style={{
            listStyle: "none", padding: 0,
            margin: 0, textAlign: "left"
          }}>
            {analysisResult.risks.map((risk, idx) => (
              <li key={idx} style={{
                margin: "0 0 18px 0",
                background: "#fff1",
                borderLeft: `5px solid ${
                  risk.severity === "High" ? "#FF4D4D"
                  : risk.severity === "Medium" ? "#FF9800"
                  : "#00FFA5"
                }`,
                borderRadius: 6,
                padding: "10px 16px"
              }}>
                <div style={{ fontWeight: 600, fontSize: 17 }}>
                  {risk.title}  
                  <span style={{
                    marginLeft: 8,
                    fontSize: 14,
                    fontWeight: 500,
                    color:
                      risk.severity === "High" ? "#FF4D4D"
                      : risk.severity === "Medium" ? "#FF9800"
                      : "#00FFA5"
                  }}>
                    [{risk.severity} Risk]
                  </span>
                </div>
                <div style={{
                  fontSize: 15,
                  color: "var(--text-secondary)",
                  marginTop: 2,
                  paddingLeft: 2
                }}>
                  {risk.description}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* User assurance note */}
      <div style={{
        marginTop: 28, fontSize: 13,
        color: "var(--text-secondary)"
      }}>
        <span role="img" aria-label="lock" style={{ marginRight: 7 }}>🔒</span>
        This step analyzes documents in your browser. No data is sent or stored.
      </div>
    </div>
  );
}

export default ContractUploadStep;
