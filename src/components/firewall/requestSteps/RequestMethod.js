import React from 'react';

const RequestMethod = () => {
  const style = { marginBottom: '10px', marginTop: '20px' };
  return (
    <>
      <h3>Choose Request Method</h3>
      <p style={style}>What would you like to request?</p>
      <ul>
        <li>
          <input type="radio" className="radioRequestClass" name="request" id="request" value="1" />
          Submit a standred change(allowing/denying traffic)
          <br />
        </li>
        <li>
          <input type="radio" className="radioRequestClass" name="request" id="request" value="2" />
          SUpload Changes collected in XLS template/ other file
          <br />
        </li>
      </ul>
    </>
  );
};

export default RequestMethod;
