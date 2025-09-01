import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="container" style={{ marginTop: 40 }}>
      <div className="panel">
        <div className="hero">
          <div>
            <h1 className="headline">Find the right tutor, fast</h1>
            <p className="subhead">Parents post requests. Teachers bid. You pick the best match.</p>
            <div className="grid-2">
              <div className="card">
                <img className="card-img" src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop" alt="Parent helping student at home" />
                <h3>I'm a Parent/Student</h3>
                <p className="muted">Post your learning need by class, subject and area.</p>
                <Link className="btn" to="/request">Create Request</Link>
              </div>
              <div className="card">
                <img className="card-img" src="https://images.unsplash.com/photo-1596495578065-3b3d8d2a1d49?q=80&w=1200&auto=format&fit=crop" alt="Indian teacher explaining" />
                <h3>I'm a Teacher</h3>
                <p className="muted">Create your profile and start bidding on requests.</p>
                <Link className="btn" to="/teacher-profile">Create Profile</Link>
              </div>
            </div>
          </div>
          <img className="hero-img" src="https://images.unsplash.com/photo-1517976487492-576ea6b2936d?q=80&w=1600&auto=format&fit=crop" alt="Student studying at home" />
        </div>
      </div>
    </div>
  );
}

export default Landing;


