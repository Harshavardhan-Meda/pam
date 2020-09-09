/* eslint-disable */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAlertCon } from '../../actions/alertCon';
import './alertcon.scss';

export class AlertCon extends Component {
  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.dispatch(getAlertCon());
  }

  render() {
    const { level } = this.props;
    return (
      <div className="alertcon">
        <p>
          <span className="alertcon__label">AlertCon</span>&trade; Threat Level
          <span className={`level level${level && level.substr(level.length - 1)}`}>
            {level && level.substr(level.length - 1)}
          </span>
        </p>
      </div>
    );
  }
}

AlertCon.propTypes = {
  level: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({ level: state.alertCon.level });

export default connect(mapStateToProps)(AlertCon);
