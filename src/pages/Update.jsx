import { useEffect, useState } from "react";
import db from "../utils/db";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { EditForm } from "../components/editform";
import { Link } from "react-router-dom";

export const UpdateContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState({});

  const fetchContactById = async (contactId) => {
    try {
      const docRef = doc(db, "contacts", contactId);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        setContact({ id: docSnapshot.id, ...docSnapshot.data() });
      } else {
        console.log("Document does not exist!");
      }
    } catch (error) {
      console.error("Error fetching contact:", error);
    }
  };

  const handleUpdate = async (updatedContact) => {
    try {
      const docRef = doc(db, "contacts", id);
      await updateDoc(docRef, updatedContact);
      navigate("/");
    } catch (error) {
      console.log("Error updating contact:", error);
    }
  };

  const handleContactDelete = async () => {
    const msg = "Are you sure you want to delete?";
    try {
      if (confirm(msg)) {
        const docRef = doc(db, "contacts", id);
        await deleteDoc(docRef);
        setContact({});
        navigate("/");
      } else {
        navigate(0);
      }
    } catch (error) {
      console.log("Error deleting contact!", error);
    }
  };

  useEffect(() => {
    fetchContactById(id);
  }, [id]);

  const DeleteButton = () => {
    return (
      <div className="delete-wrapper">
        <button onClick={handleContactDelete} className="delete-button">
          Delete Contact
        </button>
      </div>
    );
  };

  return (
    <div className="contact-details">
      <div className="buttons">
        <Link to="/" className="back-to">
          <span className="material-symbols-outlined">arrow_back</span>
          <span>Contacts</span>
        </Link>
      </div>
      <h2>Edit Contact</h2>
      {contact ? (
        <>
          <div className="update-container">
            <EditForm contact={contact} onUpdate={handleUpdate} />
          </div>
          <DeleteButton />
        </>
      ) : (
        <p>Loading contact details...</p>
      )}
    </div>
  );
};
