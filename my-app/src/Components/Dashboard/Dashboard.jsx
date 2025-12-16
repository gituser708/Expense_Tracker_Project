import React, { useState, useRef, useEffect } from "react";
import {useQuery} from '@tanstack/react-query';
import { listTransactionQuery } from '../../React_Query/transactionQuery/transactionQuery';
import {
  AiOutlineHome,
} from "react-icons/ai";
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BiBarChart, BiMessageDetail } from "react-icons/bi";
import { BsFolder } from "react-icons/bs";
import {
  FiUsers,
  FiDollarSign,
  FiBox,
  FiTrendingUp,
} from "react-icons/fi";
import { TbCategory2 } from "react-icons/tb";
import { IoWalletOutline } from "react-icons/io5";
import "../../style/Dashboard.css";
import TransactionChart from "../Transactions/TransactionChart";
import { withAuthProtection } from "../Auth/withAuthProtection";


 function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);


  const { data: transactions, isLoading, error, isFetched, refetch } = useQuery({
          queryFn:  listTransactionQuery,
          queryKey: ['transactions-lists'],
      });
  
      const totals = transactions?.reduce(
          (acc, transaction) => {
              if (transaction?.type === 'income') {
                  acc.income += transaction?.amount
              } else {
                  acc.expense += transaction?.amount
              };
              return acc;
          },
          { income: 0, expense: 0 },
  );


      
    const mostUsedCategory = (() => {
      if (!transactions || !Array.isArray(transactions)) return null;

      const counts = transactions.reduce((acc, t) => {
        const catName = t.category || "Uncategorized";
        acc[catName] = (acc[catName] || 0) + 1;
        return acc;
      }, {});

      const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);

      return {
        name: sorted[0]?.[0] || "N/A",
        count: sorted[0]?.[1] || 0,
      };
    })();


  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    }

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`sidebar ${sidebarOpen ? "open" : ""}`}
      >
        <div className="menu">
          <h2>Dashboard</h2>
          <nav>
            <Link to="/">
              <AiOutlineHome /> Home
            </Link>
            <Link to="/transaction-lists">
              <BiBarChart />
              My Transactions
            </Link>
            <Link to="/category-lists">
              <BsFolder /> Categories
            </Link>
            <Link to="/profile">
              <FiUsers /> My Profile
            </Link>
            <Link to="/add-category">
              {" "}
              <TbCategory2 /> Add Category
            </Link>
            <Link to="/add-transaction">
              {" "}
              <IoWalletOutline /> Add Transaction
            </Link>
            <Link to="/contact">
              <BiMessageDetail /> Help
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-bar">
          <button
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <GiHamburgerMenu color="grey" />
          </button>
          <h2 className="mobile-header">Dashboard</h2>
        </header>

        <section className="metrics">
          <div className="card">
            <div className="card-header">
              <h4>Total Income</h4>
              <FiDollarSign />
            </div>
            <p>{totals?.income?.toLocaleString() || 0}</p>
            <span className="up">{new Date().toDateString()} Till now</span>
          </div>
          <div className="card">
            <div className="card-header">
              <h4>Total Expense</h4>
              <FiBox />
            </div>
            <p>{totals?.expense?.toLocaleString() || 0}</p>
            <span
              style={
                totals?.income > totals?.expense
                  ? {
                      color: "#09b731ff",fontSize:'13px', fontWeight:'600'
                    }
                  : {color: "#de1024ff", fontSize:'13px' }
              }
            >
              <strong style={{
                color:'gray', fontSize:'13px'
              }}>Expense Status:</strong>{" "}
              {totals?.income > totals?.expense
                ? "Good"
                : "Bad"}
            </span>
          </div>
          <div className="card">
            <div className="card-header">
              <h4>Most Used Category</h4>
              <FiTrendingUp />
            </div>
            <p>{mostUsedCategory?.name || "N/A"}</p>

            <span className="up">
              {mostUsedCategory?.count || 0} transactions
            </span>
          </div>
        </section>

        <section className="content">
          <div className="chart-placeholder">
            <TransactionChart />
          </div>
        </section>
      </main>
    </div>
  );
};

export default withAuthProtection(Dashboard);