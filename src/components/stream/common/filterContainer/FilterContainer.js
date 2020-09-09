import { Button } from 'carbon-components-react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import ReactPiwik from 'react-piwik';
import { stringify, parse } from 'qs';
import { withRouter } from 'react-router-dom';
import { resetFilters, setFilters, toggleFilters, toggleFilterValue } from '../../../../actions/filters';
import { initialState as initialFilters } from '../../../../reducers/filters';
import ConditionalWrapper from '../../../common/conditionalWrapper/ConditionalWrapper';
import Priority from '../../../common/priority/Priority';
import './filter-container.scss';
import FilterButton from './filterButton/FilterButton';

export class FilterContainer extends Component {
  constructor(props) {
    super(props);
    const {
      dispatch,
      history,
      streamType,
      filters,
      location: { search }
    } = this.props;
    history.push({ search: stringify(filters, { encodeValuesOnly: true, indices: false }) });
    if (search) {
      dispatch(setFilters(streamType, parse(search, { ignoreQueryPrefix: true })));
    }
  }

  shouldComponentUpdate(nextProps) {
    const { history, filters } = this.props;
    if (this.filtersChanged(filters, nextProps.filters)) {
      history.push({ search: stringify(nextProps.filters, { encodeValuesOnly: true, indices: false }) });
      return true;
    }
    return false;
  }

  componentDidUpdate(prevState) {
    const { dispatch, callback, filters, browser } = this.props;
    if (browser.greaterThan.small && this.filtersChanged(prevState.filters, filters)) {
      dispatch(callback(filters));
    }
  }

  getChangeHandler(filter, key) {
    const { dispatch, streamType } = this.props;
    return () => dispatch(toggleFilterValue(streamType, filter.name, key, filter.multiSelect));
  }

  filtersChanged(prevFilters, filters) {
    return !_.isEqual(prevFilters, filters);
  }

  submitFilters() {
    const { dispatch, filters, callback, streamType } = this.props;
    dispatch(toggleFilters(streamType));
    dispatch(callback(filters));
  }

  wrapPriority(priority) {
    return (children) => <Priority priority={priority}>{children}</Priority>;
  }

  handleReset() {
    const { dispatch, streamType } = this.props;
    dispatch(resetFilters(streamType));
    ReactPiwik.push(['trackEvent', 'filters', 'resetFilters']);
  }

  render() {
    const { filterSchema, filters, streamType } = this.props;
    return (
      <div className="filter-container" aria-label="Filters container" data-cy="filterContainer">
        <div className="filter-header">
          <h2>Filters</h2>
          {this.filtersChanged(initialFilters[streamType], filters) && (
            <Button className="reset" onClick={() => this.handleReset()}>
              Reset
            </Button>
          )}
        </div>
        {filterSchema.map((filter) => (
          <div
            className="filter-buttons"
            key={filter.name}
            role="menu"
            title={filter.title}
            aria-label={`${filter.label} filters`}
          >
            <h3>{filter.label}</h3>
            {Object.entries(filter.values).map(([key, label]) => (
              <ConditionalWrapper
                key={key}
                condition={filter.name === 'priority'}
                wrapComponent={this.wrapPriority(key)}
              >
                <FilterButton
                  key={key}
                  role={filter.multiSelect ? 'menuitemcheckbox' : 'menuitemradio'}
                  type={filter.multiSelect ? 'checkbox' : 'radio'}
                  isChecked={
                    filter.multiSelect ? filters[filter.name].includes(key) : filters[filter.name].type === key
                  }
                  label={label}
                  onClick={this.getChangeHandler(filter, key)}
                  filter={filter}
                />
              </ConditionalWrapper>
            ))}
          </div>
        ))}
        <MediaQuery maxWidth={768}>
          <Button className="filters-confirm-button bx--btn bx--btn--primary" onClick={() => this.submitFilters()}>
            OK
          </Button>
        </MediaQuery>
      </div>
    );
  }
}

FilterContainer.propTypes = {
  streamType: PropTypes.string.isRequired,
  filterSchema: PropTypes.arrayOf(PropTypes.object).isRequired,
  filters: PropTypes.shape({
    priority: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    status: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    timeframe: PropTypes.shape({
      start: PropTypes.string,
      end: PropTypes.string
    })
  }).isRequired,
  browser: PropTypes.shape({ greaterThan: PropTypes.shape({ small: PropTypes.bool.isRequired }) }).isRequired,
  dispatch: PropTypes.func.isRequired,
  callback: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  location: PropTypes.shape({ search: PropTypes.func.isRequired }).isRequired
};

const mapStateToProps = (state, ownProps) => ({
  filters: state.filters[ownProps.streamType],
  browser: state.browser
});

export const ConnectedFilterContainer = connect(mapStateToProps)(FilterContainer);

export default withRouter(ConnectedFilterContainer);
