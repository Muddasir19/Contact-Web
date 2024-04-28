import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import Modal from "./components/Modal";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from "./components/NotFoundContact";

const App = () => {
  const [contacts, setContacts] = useState([]);

  const { isOpen, onClose, onOpen } = useDisclouse();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        //const contactsSnapshot = await getDocs(contactsRef);

        onSnapshot(contactsRef,(snapshot) => {

          const contactsList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactsList);

          return contactsList

        } )

        
      }
       catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);


  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");
        //const contactsSnapshot = await getDocs(contactsRef);

        onSnapshot(contactsRef,(snapshot) => {

          const contactsList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });

          const filteredContacts = contactsList.filter((contact) =>
          contact.name.toLowerCase().includes(value.toLowerCase())
          );

          setContacts(filteredContacts);

          return filteredContacts;

        } )


  }

  return (
    <>
      <div className=" max-auto max-w-[370px] px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="flex flex-grow relative items-center ml-2">
            <FiSearch className="absolute text-3xl text-white" />
            <input
            onChange={filterContacts}
              type="text"
              className="h-10 flex-grow rounded-md border border-white
       bg-transparent text-white pl-9"
            />

            <AiFillPlusCircle
              onClick={onOpen}
              className="text-4xl text-white gap-2 cursor-pointer"
            />
          </div>
        </div>
        <div>
          {contacts.length <= 0 ? <NotFoundContact/> :
          contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
        <AddAndUpdateContact isOpen={isOpen} onClose={onClose} />
        <ToastContainer position="bottom-center" />
      {/* {isOpen && <div>True</div> || <div>Flase</div> } */}

      
    </>
  );
};

export default App;
