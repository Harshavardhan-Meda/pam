import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as RightArrow } from '../../../../assets/common/right_arrow.svg';
import './type.scss';

export default function Type({ title, description, url }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="type">
      <header className="type-header">
        <h3>{title}</h3>
        <RightArrow />
      </header>
      <span className="type-description">{description}</span>
    </a>
  );
}

Type.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};
