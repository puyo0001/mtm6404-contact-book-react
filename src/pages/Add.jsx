import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import db from "../utils/db";

export const Add = () => {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "contacts"), contact);
      navigate("/");
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  return (
    <div className="form-container">
      <div className="buttons">
        <Link to="/" className="back-to">
          <span className="material-symbols-outlined">arrow_back</span>
          <span>Contacts</span>
        </Link>
      </div>
      <h2>Add New Contact</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-field">
            <input
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <input
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <input
              name="phoneNumber"
              placeholder="Phone Number"
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <input
              name="address"
              placeholder="Address"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row" style={{ justifyContent: "flex-end" }}>
          <button type="submit" className="update-button">
            Add Contact
          </button>
        </div>
      </form>
    </div>
  );
};
