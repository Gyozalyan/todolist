import React, { useState } from 'react';
import styles from'./Nav.module.css';
import { Button } from 'react-bootstrap';


const ContactUs = ()=>{
const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic here
    console.log('Form submitted!');
  };

  return (
   
       
      <div className={styles.fill}>     
      <div>
      <h2 className={styles.contactPageTitle}>We'd Love to hear From You !</h2>
      <form onSubmit={handleFormSubmit} className={styles.contactForm}>
        <label htmlFor="name" className={styles.label}>Full name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.textInputs}
        />
        <label htmlFor="email" className={styles.label}>Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Example@gmail.com'
          className={styles.textInputs}
        />
        <label htmlFor="message" className={styles.label}>Message</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={styles.textInputs}
        />
         <Button variant="success" className={styles.submit}>Submit</Button>
      </form>
      </div> 
 </div>  
    
  );

}

export default ContactUs