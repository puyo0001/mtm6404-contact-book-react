import { useEffect, useState } from "react";
import db from "../utils/db";
import { doc, getDoc } from "firebase/firestore";
import { useParams, Link } from "react-router-dom";
import { Contact } from "../App";

export const Details = () => {
  const { id } = useParams();
  const [contact, setContact] = useState({});

  const fetchContactById = async (contactId) => {
    const docRef = doc(db, "contacts", contactId);
    const docsSnapshot = await getDoc(docRef);

    if (docsSnapshot.exists()) {
      setContact({
        id: docsSnapshot.id,
        ...docsSnapshot.data(),
      });
    } else {
      console.log("document does not exist!");
      return null;
    }
  };

  useEffect(() => {
    console.log("Fetching contact with id:", id);
    fetchContactById(id);
  }, [id]);

  console.log(contact);

  return (
    <div className="contact-details">
      <div className="buttons">
        <Link to="/" className="back-to">
          <span className="material-symbols-outlined">arrow_back</span>
          <span>Contacts</span>
        </Link>
        <Link to={`/update/${contact.id}`}>
          <button className="edit">Edit</button>
        </Link>
      </div>
      <h2>
        {contact.firstName} {contact.lastName}
      </h2>
      <div className="contact-info">
        <p>Email</p>
        <a className="email-a" href={`mailto:${contact.email}`}>
          {contact.email}
        </a>
      </div>
      <div className="contact-info">
        <p> Phone</p>
        <p>{contact.phoneNumber}</p>
      </div>
      <div className="contact-info">
        <p>Address</p>
        <p>{contact.address}</p>
      </div>
    </div>
  );
};
