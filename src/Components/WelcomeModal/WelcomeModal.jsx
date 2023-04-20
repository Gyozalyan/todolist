import React, { useState } from 'react';

function WelcomeModal({provideName}) {
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(true);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name !== '') {
      setShowModal(false);
    }
  };

  return (
    <div>
      {showModal && (
        <div className="modal">
          <form onSubmit={handleSubmit}>
            <label>
              Enter Your Name:
              <input type="text" value={name} onChange={handleNameChange} />
            </label>
            <button type="submit" onClick={()=>{provideName(name)}}>Submit</button>
          </form>
        </div>
      )}
   
    </div>
  );
}

export default WelcomeModal;
