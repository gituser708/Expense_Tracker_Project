import "./Other.css";

const About = () => {
  return (
    <section className="about-section">
      <div className="container">
        <h1>About ExTracker</h1>

        <p>
          ExTracker is your personal finance companion—designed to help you
          track expenses, manage budgets, and visualize your financial growth.
          Whether you're a student, freelancer, or working professional,
          ExTracker gives you the tools to take control of your money.
        </p>

        <p>
          With intuitive dashboards, smart categorization, and real-time
          insights, ExTracker transforms financial chaos into clarity. Built
          with React and backed by secure data flows, it’s fast, reliable, and
          tailored for everyday use.
        </p>

        <p>
          Our mission is simple: empower users to make informed financial
          decisions with confidence and ease.
        </p>

        {/* NEW SECTIONS BELOW */}

        <h2>Why We Built ExTracker</h2>
        <p>
          Managing money shouldn’t feel overwhelming. Many people struggle with
          scattered expenses, unclear budgets, and lack of visibility into where
          their money actually goes. ExTracker was created to solve this problem
          by offering a clean, simple, and powerful platform that keeps your
          finances organized in one place.
        </p>

        <h2>What Makes ExTracker Different</h2>
        <ul className="about-list">
          <li>Real-time expense tracking with clean visual insights</li>
          <li>Smart categorization that adapts to your spending habits</li>
          <li>
            Interactive dashboards that make financial data easy to understand
          </li>
          <li>Secure and privacy-focused architecture</li>
          <li>Fast, responsive, and built with modern web technologies</li>
        </ul>

        <h2>Our Vision</h2>
        <p>
          We envision a world where everyone—regardless of background—can
          understand and manage their finances effortlessly. ExTracker aims to
          become the go-to platform for personal financial clarity, helping
          users build better habits and achieve long-term stability.
        </p>

        <h2>Who We Serve</h2>
        <p>
          ExTracker is built for anyone who wants better control over their
          money:
        </p>
        <ul className="about-list">
          <li>Students managing monthly allowances</li>
          <li>Freelancers tracking irregular income</li>
          <li>Working professionals balancing expenses and savings</li>
          <li>Families planning budgets together</li>
        </ul>

        <h2>The Technology Behind Extracker</h2>
        <p>
          Extracker is powered by a modern tech stack including React, Node.js,
          Express, and MongoDB. The interface is optimized for speed,
          accessibility, and smooth user experience. Every feature is built with
          scalability and security in mind, ensuring your financial data stays
          protected.
        </p>

        <h2>Our Commitment</h2>
        <p>
          We are committed to continuous improvement—adding new features,
          refining the experience, and listening to user feedback. Extracker is
          not just a tool; it’s a growing ecosystem designed to help you build a
          healthier financial future.
        </p>
      </div>
    </section>
  );
};

export default About;
