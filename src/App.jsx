import React from "react";
import Header from "./components/Header";
import './App.css';
import { Footer } from "./components/Footer";
import Summarizer from "./components/Summarizer";

function App() {
  return (
    <div className="app">

  {/* Header Section */}
  <Header className="app-header" />

  {/* Main Content */}
  <main className="app-main">
     <div className="container">


    {/* Hero Section */}
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          Summarize anything in <span className="highlight">seconds.</span>
        </h1>
        <p className="hero-subtitle">
           our AI cuts through the noise to deliver the insights that actually matter. Transform hours of dense reading into seconds of clarity, empowering you to make faster decisions without missing a single critical detail.
        </p>
      </div>
    </section>

    {/* Summarizer Component */}
    <Summarizer className="app-summarizer" />
</div>
  </main>

  {/* Footer Section */}
  <Footer className="app-footer" />

</div>

  );
}

export default App;
