/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import PropTypes from 'prop-types';
import React from 'react';
import './filter-button.scss';

const FilterButton = (props) => {
  const { label, type, onClick, isChecked, role, filter } = props;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  const getIcon = (filt) => {
    if (filt && filt.Icon) {
      const { Icon, name } = filt;
      return <Icon className={name} />;
    }
  };

  return (
    <label htmlFor={label} className="filter-button" key={label} tabIndex={0} onKeyDown={(e) => handleKeyDown(e)}>
      <input
        type={type}
        id={label}
        value={label}
        checked={isChecked}
        role={role}
        onClick={onClick}
        aria-checked={isChecked}
        tabIndex={-1}
      />
      <div className="filter-icon-label">
        {getIcon(filter)}
        {label}
      </div>
      <span className="checkmark" />
    </label>
  );
};

FilterButton.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  filter: PropTypes.shape.isRequired
};

export default FilterButton;
