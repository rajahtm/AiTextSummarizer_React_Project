import React, { useState } from "react";
import { summarizeText } from "../services/geminiService";
import './summarizer.css';

const Summarizer = () => {
  // Text input
  const [inputText, setInputText] = useState("");

  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  // Summary configuration
  const [config, setConfig] = useState({
    length: "medium",
    tone: "professional",
    includeBulletPoints: true,
  });

  // Handle summarize button
  const handleSummarize = async () => {
    if (!inputText.trim() || inputText.length < 50) {
      setError("Please enter at least 50 characters to summarize.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const summary = await summarizeText(inputText, config);

      const originalWordCount = inputText.split(/\s+/).length;
      const summaryWordCount = summary.split(/\s+/).length;

      setResult({
        summary,
        originalWordCount,
        summaryWordCount,
        timestamp: Date.now(),
      });
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Copy summary
  const copyToClipboard = () => {
    if (!result?.summary) return;
      navigator.clipboard.writeText(result.summary);
      alert("Summary copied!");
    
  };

  // Clear all
  const handleClear = () => {
    setInputText("");
    setResult(null);
    setError(null);
  };

  return (
    <div className="summarizer">
  <div className="container">

    {/* INPUT SECTION */}
    <div className="input-section">

      {/* TEXTAREA */}
      <div className="textarea-card">
        <div className="textarea-header">
          <span className="label">Source Text</span>
          <span className="count">{inputText.length} characters</span>
        </div>

        <textarea
          className="textarea"
          placeholder="Paste your text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>

      {/* CONTROLS */}
      <div className="controls">

        {/* LENGTH & TONE */}
        <div className="control-card">
          <h3 className="card-title">Length & Tone</h3>

          {/* LENGTH */}
          <div className="field">
            <label>Summary Length</label>
            <div className="button-group">
              {["short", "medium", "long"].map((l) => (
                <button
                  key={l}
                  className={`option-btn ${
                    config.length === l ? "active" : ""
                  }`}
                  onClick={() => setConfig({ ...config, length: l })}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* TONE */}
          <div className="field">
            <label>Tone</label>
            <select
              className="select"
              value={config.tone}
              onChange={(e) =>
                setConfig({ ...config, tone: e.target.value })
              }
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="academic">Academic</option>
              <option value="creative">Creative</option>
            </select>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="action-card">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={config.includeBulletPoints}
              onChange={() =>
                setConfig({
                  ...config,
                  includeBulletPoints: !config.includeBulletPoints,
                })
              }
            />
            <span>Include Key Points</span>
          </label>

          <div className="action-buttons">
            <button className="btn secondary" onClick={handleClear}>
              Clear
            </button>

            <button
              className="btn primary"
              onClick={handleSummarize}
              disabled={isLoading}
            >
              {isLoading ? "Summarizing..." : "Summarize"}
            </button>
          </div>
        </div>
      </div>

      {/* ERROR */}
      {error && <div className="error">{error}</div>}
    </div>

    {/* RESULT SECTION */}
    <div className="result-section">
      <div className="result-card">

        <div className="result-header">
          <h2>Result Summary</h2>
          {result && (
            <button className="copy-btn" onClick={copyToClipboard}>
              Copy
            </button>
          )}
        </div>

        <div className="result-body">
          {isLoading && <p className="loading">Loading...</p>}

          {!isLoading && result && (
            <pre className="summary-text">{result.summary}</pre>
          )}

          {!isLoading && !result && (
            <p className="placeholder">Summary will appear here</p>
          )}
        </div>

        {result && (
          <div className="result-footer">
            <span>{result.summaryWordCount} words</span>
            <span>{new Date(result.timestamp).toLocaleTimeString()}</span>
          </div>
        )}
      </div>
    </div>

  </div>
</div>

  );
};

export default Summarizer;
