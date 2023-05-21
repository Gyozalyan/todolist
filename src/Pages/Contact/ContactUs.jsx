
import styles from "./ContactUs.module.css";
import FormAPI from "../../API/FormAPI";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/isLoading";




const formAPI = new FormAPI();

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const ContactUs = () => {
  const dispatch = useDispatch();

  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [nameErrorMessage, setNameErrorMessage] = useState(null);
  const [textErrorMessage, setTextErrorMessage] = useState(null);

  const handleSubmit = async () => {
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const message = messageRef.current.value;

    if (!name) {
      setNameErrorMessage("Name is required");
    } else {
      setNameErrorMessage(null);
    }

    if (!email) {
      setEmailErrorMessage("Email is required");
      
    } else{ setEmailErrorMessage(null);}
   

    if(!message){
      setTextErrorMessage("Message is required")
      return;
    }

    setTextErrorMessage(null)

    if (!emailRegex.test(email)) {
      setEmailErrorMessage("Email is not valid");
      return;
    }

    setEmailErrorMessage(null);
    if (nameErrorMessage) {
      return;
    }

    const form = {
      name,
      email,
      message,
    };

    try {
      dispatch(setLoader(true));
      await formAPI.sendForm(form);
      toast.success("Your task has been added successfully");
      emailRef.current.value = "";
      nameRef.current.value = "";
      messageRef.current.value = "";
    } 
    
    
    catch (err) {
      toast.error(err.message);
    }

    finally{
      dispatch(setLoader(false))
    }
  };

  return (
    <div className={styles.fill}>
      <div>
        <h2 className={styles.contactPageTitle}>
          We'd Love to hear From You !
        </h2>
        <div className={styles.contactForm}>
          <label htmlFor="name" className={styles.label}>
            Full name*
          </label>
          <input
            ref={nameRef}
            type="text"
            id="text"
            className={`${styles.textInput}  ${
              nameErrorMessage ? styles.invalid : ""
            }`}
          />
          <label htmlFor="email" className={styles.label}>
            Email*
          </label>
          <input
            ref={emailRef}
            type="email"
            id="email"
            placeholder="example@gmail.com"
            className={`${styles.textInput}  ${
              emailErrorMessage ? styles.invalid : ""
            }`}
          />
          <label htmlFor="message" className={styles.label}>
            Message*
          </label>
          <textarea
            ref={messageRef}
            id="message"
            className={`${styles.textInput}  ${
              textErrorMessage ? styles.invalid : ""
            }`}
            rows={5}
          />
          <Button
            variant="success"
            className={`${styles.submit} mb-3`}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          {nameErrorMessage && (
            <h4 className={styles.errorMessage}>{nameErrorMessage}</h4>
          )}
          {emailErrorMessage && (
            <h4 className={styles.errorMessage}>{emailErrorMessage}</h4>
          )}
          {textErrorMessage && (
            <h4 className={styles.errorMessage}>{textErrorMessage}</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

