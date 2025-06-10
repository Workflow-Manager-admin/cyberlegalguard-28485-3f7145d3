import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * SimulatedRisksStep: Simulates practical cyber (phishing/email) and legal (contract) risk events.
 * Includes a basic phishing simulation and interactive contract red-flag educational popups.
 */
function SimulatedRisksStep() {
  // Simple phishing scenario state
  const [phishingStep, setPhishingStep] = useState(0);
  const [phishingResult, setPhishingResult] = useState(null);

  // Contract red-flag tips
  const contractFlags = [
    {
      title: "Auto-Renewal Trap",
      description:
        "Contracts that automatically renew without explicit notice can cost you money. Always look for renewal clauses and set reminders.",
    },
    {
      title: "Ambiguous Termination Terms",
      description:
        "Watch for vague language about when and how you can exit the contract. Clear, written notice periods protect your interests.",
    },
    {
      title: "Uncapped Liability",
      description:
        "If a contract makes you responsible for all losses or damages without a cap, your risk is unlimited. Negotiate for reasonableness.",
    },
    {
      title: "One-Sided Arbitration",
      description:
        "When only one party can choose arbitration or the location is far from you, dispute resolution can be unfair.",
    },
  ];
  const [flagPopup, setFlagPopup] = useState(null);

  // Step-by-step phishing scenario simulation
  function handlePhishingChoice(choice) {
    if (phishingStep === 0) {
      setPhishingStep(1);
      if (choice === "click") {
        setPhishingResult("danger");
      } else {
        setPhishingResult("safe");
      }
    }
  }

  function resetPhishing() {
    setPhishingStep(0);
    setPhishingResult(null);
  }

  // Red-flag popup modal content
  function RedFlagPopup({ flagIdx, onClose }) {
    const flag = contractFlags[flagIdx];
    return (
      <div
        style={{
          position: "fixed",
          zIndex: 1001,
          left: 0,
          top: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(10,35,69,0.85)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={onClose}
        aria-modal="true"
        tabIndex={-1}
      >
        <div
          style={{
            background: "#08263e",
            borderRadius: 12,
            padding: "28px 34px",
            boxShadow: "0 8px 42px #00eaff40",
            maxWidth: 400,
            color: "#fff",
            textAlign: "center",
            position: "relative"
          }}
          onClick={e => e.stopPropagation()}
        >
          <div style={{fontSize:24, color:"#00FFFF", fontWeight:700, marginBottom:12}}>
            🚩 {flag.title}
          </div>
          <div style={{fontSize:16, color:"#EBF5FF"}}>{flag.description}</div>
          <button
            className="btn"
            style={{marginTop:22, background: "#02bbc9", fontWeight:600}}
            onClick={onClose}
            autoFocus
          >
            Got it
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>Simulated Risk Scenarios</h2>
      <div className="description" style={{ marginTop: 6, marginBottom: 28 }}>
        Step into real-world situations: learn to spot phishing attempts and recognize contract red-flags.
      </div>

      {/* Phishing Simulation */}
      <section style={{
        background: "#0c2b53b0",
        padding: "24px 18px",
        borderRadius: 10,
        marginBottom: 44,
        boxShadow: "0 2px 12px #00cfff25",
        maxWidth: 500,
        marginLeft: "auto",
        marginRight: "auto"
      }}>
        <div style={{fontSize:18, fontWeight: 600, marginBottom:10, color:"#00FFC9"}}>
          1. Phishing Email Mini-Simulation
        </div>
        
        {phishingStep === 0 && (
          <div>
            <div style={{
              background:"#fff1",
              borderLeft: "5px solid #00FFC9",
              borderRadius:8,
              padding: "12px 18px",
              marginBottom: 18
            }}>
              <div style={{fontSize:15.5, color:"#ccdfff"}}>
                You receive this email:
                <br/>
                <span style={{
                  display: "block",
                  background: "#02192a",
                  padding: "8px 14px",
                  borderRadius: 7,
                  margin: "10px 0",
                  fontFamily: "monospace",
                  color:"#fff"
                }}>
                  Subject: Action Required! Suspicious activity detected<br/>
                  From: account-security@amazan-secure.com<br/>
                  <br/>
                  Hi User,<br />
                  We detected suspicious login attempts on your account.<br />
                  To secure your account, <b>please verify your info here</b>:<br/>
                  <br/>
                  <a href="http://amazan-secure-update.com/verify" style={{color:"#4AE6FF"}}>(amazan-secure-update.com/verify)</a><br/>
                  <br/>
                  Failure to act will result in <span style={{color:"#FFB347"}}>account suspension</span>.<br/>
                  <br />
                  Thanks,<br/>
                  Ama<span style={{textDecoration:"line-through"}}>zon</span> Security Team
                </span>
              </div>
              <div style={{
                marginTop: 8,
                fontSize: 15,
                color: "#91e3ff",
              }}>
                What will you do?
              </div>
              <div style={{
                display: "flex",
                gap: 16,
                marginTop: 14,
                flexWrap: "wrap"
              }}>
                <button
                  className="btn"
                  style={{background:"#FF5D5D", color:"#fff"}}
                  onClick={() => handlePhishingChoice("click")}
                >Click the Link</button>
                <button
                  className="btn"
                  style={{background:"#48FED9", color:"#000"}}
                  onClick={() => handlePhishingChoice("ignore")}
                >Ignore and Check Account Straight on Official Site</button>
              </div>
            </div>
          </div>
        )}
        {phishingStep === 1 && phishingResult && (
          <div>
            {phishingResult === "danger" ? (
              <div style={{
                background:"#320c13",
                color:"#FFD0D0",
                borderLeft: "5px solid #FF4E75",
                borderRadius:8,
                padding: "15px 17px",
                margin:"12px 0 16px 0"
              }}>
                <b>Oh no! This was a phishing attempt.</b>
                <br/>Never click on suspicious links, even if the message looks urgent.
                <br/>
                <br/>
                <span style={{color:"#FFB347"}}>Red flags:</span>
                <ul style={{paddingLeft:22, margin: "4px 0"}}>
                  <li>Sender's address is not the company's real domain</li>
                  <li>Urgent language and threats of suspension</li>
                  <li>Strange URL that imitates a real site</li>
                  <li>Poor branding or spelling mistakes</li>
                </ul>
                <span style={{fontSize:13, color:"#ffe988"}}>Always verify from official apps/websites directly.</span>
              </div>
            ) : (
              <div style={{
                background:"#003d29",
                color:"#B4FFD1",
                borderLeft: "5px solid #1CFF99",
                borderRadius:8,
                padding: "14px 16px",
                margin:"12px 0 16px 0"
              }}>
                <b>Well done! </b>You recognized a suspicious email and avoided clicking the link.
                <br/>
                <span style={{fontSize:14, color:"#CCFFD0"}}>Always access your account via direct bookmarks or official apps, especially if the email seems urgent or suspicious.</span>
              </div>
            )}
            <button className="btn" style={{marginTop:10}} onClick={resetPhishing}>Try Again</button>
          </div>
        )}
      </section>

      {/* Contract Red-Flag Interactive "Doc" */}
      <section style={{
        background: "#13365eab",
        padding: "20px 18px",
        borderRadius: 10,
        boxShadow: "0 2px 12px #FFD44A25",
        maxWidth: 500,
        margin: "0 auto"
      }}>
        <div style={{fontSize:18, fontWeight: 600, marginBottom:10, color:"#FFD44A"}}>
          2. Contract Red-Flag Spotter
        </div>
        <div style={{marginBottom:12, color:"#FFF5DC", fontSize:15}}>
          Tap on <span style={{color:"#FFD44A", fontWeight:600}}>highlighted terms</span> below to learn why they matter:
        </div>
        <div style={{
          background:"#fff1",
          borderRadius:8,
          fontSize:16,
          padding: "15px 13px",
          minHeight:60,
          marginBottom:2
        }}>
          This Agreement will <span
            style={{
              cursor:"pointer",
              background:"#FFB347",
              color:"#000",
              borderRadius:4,
              padding:"0 6px"
            }}
            tabIndex={0}
            aria-label="Red flag: auto-renewal"
            onClick={()=>setFlagPopup(0)}
            onKeyPress={e=>e.key==="Enter"&&setFlagPopup(0)}
          >automatically renew</span> each year unless either party provides written notice twenty days before expiration.
          The <span
            style={{
              cursor:"pointer",
              background:"#FFD44A",
              color:"#000",
              borderRadius:4,
              padding:"0 6px"
            }}
            tabIndex={0}
            aria-label="Red flag: ambiguous termination"
            onClick={()=>setFlagPopup(1)}
            onKeyPress={e=>e.key==="Enter"&&setFlagPopup(1)}
          >termination terms</span> are described in Section 5.
          Any party is liable for <span
            style={{
              cursor:"pointer",
              background:"#FF4E75",
              color:"#fff",
              borderRadius:4,
              padding:"0 7px"
            }}
            tabIndex={0}
            aria-label="Red flag: uncapped liability"
            onClick={()=>setFlagPopup(2)}
            onKeyPress={e=>e.key==="Enter"&&setFlagPopup(2)}
          >all losses, damages, or claims</span> with no stated maximum.
          In the event of a dispute, <span
            style={{
              cursor:"pointer",
              background:"#CFE2FF",
              borderRadius:4,
              color:"#232657",
              padding:"0 7px"
            }}
            tabIndex={0}
            aria-label="Red flag: one-sided arbitration"
            onClick={()=>setFlagPopup(3)}
            onKeyPress={e=>e.key==="Enter"&&setFlagPopup(3)}
          >arbitration will be conducted in New York at provider's sole discretion</span>.
        </div>
      </section>
      {flagPopup !== null && (
        <RedFlagPopup flagIdx={flagPopup} onClose={()=>setFlagPopup(null)} />
      )}

      <div style={{marginTop:30, fontSize:14, color:"var(--text-secondary)", textAlign:"center"}}>
        These simulations are for educational purposes. <br/>
        Knowing warning signs helps protect you &mdash; online and in contracts!
      </div>
    </div>
  );
}

export default SimulatedRisksStep;
