// import React, { useState } from 'react';
import styles from './ContactUs.module.css';
import { Button } from 'react-bootstrap';
import { useRef } from 'react';


const ContactUs = ()=>{
  const inputRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();
// const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');

  const handleFormSubmit = (event) => {
    return event.preventDefault();
 };

  const handleValues = () => {
    const contactPageValues = {};
    contactPageValues.name = inputRef.current.value
    contactPageValues.email = emailRef.current.value
    contactPageValues.message = messageRef.current.value
    console.log(contactPageValues)
    inputRef.current.value = ''
    emailRef.current.value = ''
    messageRef.current.value = ''


  }

  return (
   
       
      <div className={styles.fill}>     
      <div>
      <h2 className={styles.contactPageTitle}>We'd Love to hear From You !</h2>
      <form onSubmit={handleFormSubmit} className={styles.contactForm}>
        <label htmlFor="name" className={styles.label}>Full name</label>
        <input
        ref={inputRef}
          type="text"
                className={styles.textInputs}
        />
        <label htmlFor="email" className={styles.label}>Email</label>
        <input
         ref={emailRef}
          type="email"
          id="email"
          placeholder='Example@gmail.com'
          className={styles.textInputs}
        />
        <label htmlFor="message" className={styles.label}>Message</label>
        <textarea
        ref={messageRef}
          id="message"
          className={styles.textInputs}
        />
         <Button variant="success" className={styles.submit} onClick={handleValues}>Submit</Button>
      </form>
      </div> 
 </div>  
    
  );

}

export default ContactUs