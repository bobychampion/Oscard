const challengeCards = [
  {
    title: "The Infrastructure Gap",
    text: "Over 80 percent of community pharmacies and primary care clinics cannot fund multi-million-naira laboratory analyzers, limiting point-of-care diagnostics for millions."
  },
  {
    title: "The Liquidity Gap",
    text: "Diagnostics often require full upfront payment. Patients skip tests and self-medicate based on symptoms, fueling misdiagnosis, treatment failure, and long-term costs."
  },
  {
    title: "Distribution Challenges",
    text: "Manufacturers and reagent suppliers struggle to reach smaller providers due to fragmented channels, logistics inefficiencies, and high last-mile costs."
  }
];

const solutionCards = [
  {
    title: "Centralized Diagnostic Backbone",
    text: "Oscar Labs runs high-capacity centralized labs while partner pharmacies and clinics function as sample collection points. Partners provide advanced diagnostics without buying or maintaining hardware."
  },
  {
    title: "AI Logistics + Reagents as a Service",
    text: "The platform forecasts reagent demand, optimizes inventory, and coordinates sample pickup routes for faster turnaround and scalable operations with lower capital burden."
  },
  {
    title: "Community Pharmacy Integration",
    text: "Trusted local pharmacies evolve from dispensaries into diagnostic gateways, increasing access to accurate testing where communities already seek care."
  }
];

const financingCards = [
  {
    title: "Instant Diagnostic Micro-Financing",
    text: "Patients can access financing at participating pharmacies and clinics, with approvals processed in seconds through the Oscar platform."
  },
  {
    title: "Built for Access and Sustainability",
    text: "Healthcare credit is anchored in trusted community relationships, supporting stronger repayment outcomes than typical digital lending while expanding patient access."
  }
];

const purposeCards = [
  {
    title: "Our Mission",
    text: "Make accurate diagnostics accessible and affordable for every African community using AI technology and an asset-light Ghost Lab network."
  },
  {
    title: "Our Goal",
    text: "Build a scalable, reliable, intelligent diagnostic infrastructure that empowers providers, improves clinical decisions, and ensures timely patient care access."
  },
  {
    title: "The Vision",
    text: "Oscar Labs is building the AI-enabled diagnostic grid for Africa by combining intelligent logistics, Ghost Lab infrastructure, and community-based health financing."
  }
];

function Card({ title, text, feature = false }) {
  return (
    <article className={`card ${feature ? "feature" : ""}`.trim()}>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

export default function App() {
  return (
    <>
      <div className="site-bg"></div>

      <header className="nav-wrap">
        <nav className="nav container">
          <a href="#top" className="brand" aria-label="Oscar Labs home">
            <img className="brand-logo" src="/assets/images/oscarD-logo-header.png" alt="Oscar Diagnostics logo" />
          </a>
          <div className="nav-links">
            <a href="#challenge">Challenge</a>
            <a href="#solution">Solution</a>
            <a href="#financing">DNPL</a>
            <a href="#vision">Vision</a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="hero container">
          <div className="hero-copy reveal">
            <p className="eyebrow">An AI Powered Infrastructure for Africa's Diagnostic Grid</p>
            <h1>From guesswork to precision care.</h1>
            <p className="lead">
              Oscar Labs is building the invisible technology backbone that helps community pharmacies and clinics deliver
              high-accuracy diagnostics without owning expensive lab equipment.
            </p>
            <div className="hero-stats">
              <article>
                <h3>80%+</h3>
                <p>of clinics and pharmacies cannot afford modern diagnostic analyzers.</p>
              </article>
              <article>
                <h3>AI-Driven</h3>
                <p>logistics, inventory forecasting, and turnaround optimization across the network.</p>
              </article>
              <article>
                <h3>CareCova</h3>
                <p>Diagnose Now, Pay Later financing for patient affordability and access.</p>
              </article>
            </div>
          </div>
          <div className="hero-image reveal delay-1">
            <img src="/assets/images/hero_lab.png" alt="Black lab professional using advanced diagnostic interface" />
          </div>
        </section>

        <section id="challenge" className="container section reveal">
          <div className="section-head">
            <p className="eyebrow">1. The Challenge</p>
            <h2>Africa's Diagnostic Bottleneck</h2>
          </div>
          <div className="cards three-up">
            {challengeCards.map((card) => (
              <Card key={card.title} {...card} />
            ))}
          </div>
        </section>

        <section id="solution" className="container section reveal">
          <div className="section-head">
            <p className="eyebrow">2. The Oscar Labs Solution</p>
            <h2>AI Powered Ghost Lab Infrastructure</h2>
          </div>
          <div className="split-layout">
            <div className="stack">
              {solutionCards.map((card) => (
                <Card key={card.title} {...card} />
              ))}
            </div>
            <div className="image-stack">
              <img src="/assets/images/pharmacy.png" alt="Community pharmacy in Nigeria serving patients" />
            </div>
          </div>
        </section>

        <section id="financing" className="container section reveal">
          <div className="section-head">
            <p className="eyebrow">3. Strategic Financing</p>
            <h2>CareCova DNPL (Diagnose Now, Pay Later)</h2>
          </div>
          <div className="cards two-up">
            {financingCards.map((card) => (
              <Card key={card.title} {...card} feature />
            ))}
          </div>
        </section>

        <section id="vision" className="container section reveal">
          <div className="section-head">
            <p className="eyebrow">Mission, Goal, Vision</p>
            <h2>The Intelligent Infrastructure for Precision Healthcare at Scale</h2>
          </div>

          <div className="cards three-up">
            {purposeCards.map((card) => (
              <Card key={card.title} {...card} />
            ))}
          </div>

          <div className="closing-note">
            <img src="/assets/images/ai_grid.png" alt="Digital network visualizing connected healthcare intelligence" />
            <p>
              Oscar Labs is not simply a laboratory network. It is the intelligent infrastructure powering precision
              healthcare across Africa.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer container">
        <p>Oscar Labs • Starting in Nigeria, scaling across Africa.</p>
      </footer>
    </>
  );
}
