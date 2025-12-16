import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "./Reudx/Slices/authSlice";
import { useMeQuery } from "./utils/useMeQuery";

import Home from "./Components/Home/Home";
import PublicNav from "./Components/Navbar/PublicNav";
import PrivateNav from "./Components/Navbar/PrivateNav";
import About from "./Components/Others/About";
import Service from "./Components/Others/Service";
import Contact from "./Components/Others/Contact";
import Register from "./Components/Users/Register";
import Login from "./Components/Users/Login";
import Profile from "./Components/Users/Profile";
import ForgotPassword from "./Components/Users/ForgotPassword";
import ResetPassword from "./Components/Users/ResetPassword";
import AddCategory from "./Components/Category/AddCategory";
import CategoryList from "./Components/Category/CategoryList";
import AddTransaction from "./Components/Transactions/AddTransaction";
import TransactionLists from "./Components/Transactions/TransactionLists";
import Dashboard from "./Components/Dashboard/Dashboard";


function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { data: meUser, isSuccess } = useMeQuery();

  useEffect(() => {
    if (isSuccess && meUser && !user) {
      dispatch(loginAction(meUser));
    }
  }, [isSuccess, meUser, user, dispatch]);

  return (
    <React.Fragment>
    <Router>
      {user ? <PrivateNav /> : <PublicNav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/category-lists" element={<CategoryList />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
        <Route path="/transaction-lists" element={<TransactionLists />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </Router>
      </React.Fragment>
  );
};

export default App;
