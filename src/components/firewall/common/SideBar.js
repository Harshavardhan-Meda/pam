import React from 'react';
import PropTypes from 'prop-types';

const SideBar = ({ setPage }) => {
  const style = { marginBottom: '20px' };
  return (
    <div className="firewall-block">
      <h3>Request Step</h3>
      <p style={style}>It only takes a moment</p>
      <div>
        <ul>
          <li>
            <input type="radio" className="rc" name="s" onChange={(e) => setPage(e)} value="isFirst" defaultChecked />
            Choose Request Method
            <br /><br />
          </li>
          <li>
            <input type="radio" className="rc" name="s" onChange={(e) => setPage(e)} value="isNext" />
            Next Step
            <br />
          </li>
        </ul>
      </div>
    </div>
  );
};
SideBar.propTypes = {
  setPage: PropTypes.func.isRequired
};
export default SideBar;
