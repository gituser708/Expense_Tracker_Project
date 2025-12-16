import {
  FaMoneyBillWave,
  FaChartPie,
  FaBullseye,
  FaShieldAlt,
  FaMobileAlt,
  FaSearchDollar,
} from "react-icons/fa";
import "./Other.css";

const Services = () => {
  const financialTools = [
    {
      title: "Expense Tracking",
      description:
        "Log daily expenses with smart categorization and visual summaries.",
      icon: <FaMoneyBillWave size={40} />,
    },
    {
      title: "Budget Planning",
      description:
        "Set monthly budgets and monitor spending trends in real time.",
      icon: <FaChartPie size={40} />,
    },
    {
      title: "Savings Goals",
      description:
        "Create and track custom savings goals with progress indicators.",
      icon: <FaBullseye size={40} />,
    },
  ];

  const userBenefits = [
    {
      title: "Financial Clarity",
      description: "Understand where your money goes and how to optimize it.",
      icon: <FaSearchDollar size={40} />,
    },
    {
      title: "Secure Data",
      description: "Your financial data is encrypted and stored securely.",
      icon: <FaShieldAlt size={40} />,
    },
    {
      title: "Mobile Friendly",
      description:
        "Access your dashboard anytime, anywhere with responsive design.",
      icon: <FaMobileAlt size={40} />,
    },
  ];

  const renderCard = ({ title, description, icon }, index) => (
    <div key={index} className="service-card">
      <div className="service-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );

  return (
    <section className="services-section">
      <div className="container">
        <h1>What ExTracker Offers</h1>

        <div className="card-group">{financialTools.map(renderCard)}</div>

        <h2>Why Users Choose Us</h2>

        <div className="card-group">{userBenefits.map(renderCard)}</div>
      </div>
    </section>
  );
};

export default Services;
