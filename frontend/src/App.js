import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/Landing";
import ParentRequestForm from "./pages/ParentRequestForm";
import TeacherProfileForm from "./pages/TeacherProfileForm";
import FindTeachers from "./pages/FindTeachers";
import FindRequests from "./pages/FindRequests";
import PlaceBid from "./pages/PlaceBid";
import ReviewBids from "./pages/ReviewBids";
import Payment from "./pages/Payment";


function App() {
  return (
    <BrowserRouter>
      <div className="nav">
        <div className="nav-inner">
          <div className="brand">
            <img
              src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4d6.svg"
              alt="Book"
            />
            <span>Jatin Home Tutor</span>
          </div>
          <div style={{ flex: 1 }} />
          <Link to="/">Home</Link>
          <Link to="/request">Parent/Student</Link>
          <Link to="/teacher-profile">Teacher</Link>
          <Link to="/find-teachers">Find Teachers</Link>
          <Link to="/find-requests">Find Requests</Link>
          <Link to="/place-bid">Place Bid</Link>
          <Link to="/review-bids">Review Bids</Link>
          <Link to="/payment">Payment</Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/request" element={<ParentRequestForm />} />
        <Route path="/teacher-profile" element={<TeacherProfileForm />} />
        <Route path="/find-teachers" element={<FindTeachers />} />
        <Route path="/find-requests" element={<FindRequests />} />
        <Route path="/place-bid" element={<PlaceBid />} />
        <Route path="/review-bids" element={<ReviewBids />} />
        <Route path="/payment" element={<Payment />} />  {/* ✅ Correct */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
