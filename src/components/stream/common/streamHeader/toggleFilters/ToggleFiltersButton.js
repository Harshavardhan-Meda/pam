import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleFilters } from '../../../../../actions/filters';
import { ReactComponent as FilterIcon } from '../../../../../assets/common/filter_grey.svg';
import './toggle-filters-button.scss';

export class ToggleFiltersButton extends Component {
  toggleFilters() {
    const { dispatch, type } = this.props;
    dispatch(toggleFilters(type));
  }

  render() {
    return (
      <button
        type="button"
        className="toggle-filters-btn"
        data-cy="toggleFiltersButton"
        onClick={() => this.toggleFilters()}
        aria-label="Display filters"
      >
        <FilterIcon className="toggle-filters-icon" />
      </button>
    );
  }
}

ToggleFiltersButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

export default connect()(ToggleFiltersButton);
