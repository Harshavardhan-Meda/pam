/* eslint-disable jsx-a11y/role-supports-aria-props */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactPiwik from 'react-piwik';
import './collapsible-panel.scss';
import { ReactComponent as DownArrow } from '../../../assets/common/down_arrow_16.svg';
import { ReactComponent as UpArrow } from '../../../assets/common/up_arrow_16.svg';

class CollapsiblePanel extends Component {
  constructor(props) {
    super(props);
    const { collapsed } = props;
    this.state = { collapsed };
    this.handleCollapse = this.handleCollapse.bind(this);
  }

  handleCollapse() {
    const { collapsed } = this.state;
    this.setState({ collapsed: !collapsed });
    this.trackEvent(!collapsed);
  }

  trackEvent(collapsed) {
    const { piwikCategory, label } = this.props;
    if (piwikCategory) {
      const action = collapsed ? 'collapsed' : 'expanded';
      const name = `${label} section was ${collapsed ? 'collapsed' : 'expanded'}`;
      // 'trackEvent', category, action, [name], [value]
      ReactPiwik.push(['trackEvent', piwikCategory, action, name]);
    }
  }

  render() {
    const { children, label, itemCount } = this.props;
    const { collapsed } = this.state;

    return (
      <div className="collapsible-panel">
        <div
          className="title"
          onClick={() => this.handleCollapse()}
          role="presentation"
          data-cy={`collapsiblePanelTitle-${label}`}
          aria-expanded={!collapsed}
        >
          <span>{label}</span>
          {itemCount > 0 && <span>{` (${itemCount})`}</span>}
          <div className="collapse-arrow">{collapsed ? <DownArrow /> : <UpArrow />}</div>
        </div>
        {collapsed === false && <div className="items">{collapsed === false && children}</div>}
      </div>
    );
  }
}

CollapsiblePanel.propTypes = {
  label: PropTypes.string.isRequired,
  itemCount: PropTypes.number,
  children: PropTypes.node,
  collapsed: PropTypes.bool,
  piwikCategory: PropTypes.string
};
CollapsiblePanel.defaultProps = {
  itemCount: 0,
  children: [],
  collapsed: true,
  piwikCategory: undefined
};

export default CollapsiblePanel;
