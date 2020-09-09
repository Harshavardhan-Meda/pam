import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function useOutsideAlerter(ref, setHidden) {
  function handleClickOutside(event) {
    if (ref.current
      && !ref.current.contains(event.target)
      && !event.target.classList.contains('security--profile-image')) {
      setHidden(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
}


const HeaderProfile = ({ hidden, setHidden, firstName, lastName, email, customerContactId }) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setHidden);
  return (
    <>
      {hidden && (
        <div className="security--header__popover" ref={wrapperRef}>
          <div className="security--header__popover--focus">
            <section
              className="security--header__popover__header security--header__popover__profile__header"
            >
              <span
                className="security--profile-image
                security--header__popover__profile__header__icon
                security--profile-image--large"
              >{ firstName[0] }{ lastName[0] }
              </span>
              <div>
                <span className="security--header__popover__profile__header__title">{ firstName } { lastName }</span>
                <span className="security--header__popover__profile__header__email">{ email }</span>
              </div>
            </section>
            <section className="security--header__popover__footer">
              <a
                href={`https://portal.sec.ibm.com/mss/user/profile.mss?userId=${customerContactId}`}
                className="bx--link security--header__popover__link"
              >Edit profile
              </a>
              <a href="/api/logout" className="bx--link security--header__popover__link">Sign out</a>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

HeaderProfile.propTypes = {
  hidden: PropTypes.bool.isRequired,
  setHidden: PropTypes.bool.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  customerContactId: PropTypes.string.isRequired
};

export default HeaderProfile;
