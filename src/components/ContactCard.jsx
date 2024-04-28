import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";

import { deleteDoc, doc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import AddAndUpdateContact from "./AddAndUpdateContact";
import useDisclouse from "../hooks/useDisclouse";
import { toast } from "react-toastify";


const ContactCard = ({ contact }) => {
  
  const {isOpen,onClose,onOpen} = useDisclouse();


  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact Deleted Successfully")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        key={contact.id}
        className="mt-1 bg-yellow flex justify-between p-2 rounded-lg items-center"
      >
        <div className="flex gap-1">
          <HiOutlineUserCircle className="text-orange text-4xl" />

          <div className="">
            <h2 className="">{contact.name}</h2>
            <p className="">{contact.email}</p>
          </div>
        </div>
        <div className="flex text-2xl">
          <RiEditCircleLine onClick={onOpen} className="cursor-pointer"/>
          <IoMdTrash
            onClick={() => deleteContact(contact.id)}
            className="text-orange cursor-pointer "
          />
        </div>
      </div>
       <AddAndUpdateContact contact={contact} isUpdate isOpen={isOpen} onClose={onClose}/>
    </>
  );
};

export default ContactCard;
