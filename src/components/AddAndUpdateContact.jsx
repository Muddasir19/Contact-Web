import React from "react";
import Modal from "./Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";

import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
// import { toast } from "react-toastify";

import * as Yup from "yup";

const contactsSchemaValidation = Yup.object().shape({
    name:Yup.string().required("Name is Required"),
    email:Yup.string().email("Invalid Email").required("Email is Required"),

})

const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, cont }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      // toast.success("Contact Added Successfully")
    } catch (error) {
      console.log(error);
    }
  };
  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      // toast.success("Contact Update Successfully")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
        validationSchema={contactsSchemaValidation}
          initialValues={
            // isUpdate
            //   ? { name: cont.name, email: cont.email }:
               { name: "", email: "" }
          }
          onSubmit={(values) => {
            isUpdate ? updateContact(values,contact.id) : addContact(values);
            onClose();
          }}
        >
          <Form className="flex flex-col gap-4 p-4 ">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <Field name="name" className="h-10 border" />
              <div>
                <ErrorMessage name="name"/>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <Field name="email" className="h-10 border" />
              <div>
                <ErrorMessage name="email"/>
              </div>
            </div>


            <button className="self-end border bg-orange px-3 py-1.5">
              {isUpdate ? "Update" : "Add"} Contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddAndUpdateContact;
