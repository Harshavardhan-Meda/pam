/*
Licensed Materials - Property of IBM
* (c) Copyright IBM Corporation 2017. All Rights Reserved.
*/
import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Component } from 'react';
import { Button } from 'carbon-components-react';
import { ReactComponent as ImageShare } from '../../../../assets/common/share_blue_16.svg';
import './stream-actions.scss';

export default class StreamActions extends Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: true };
  }

  toggleShareOptions() {
    this.setState((prevState) => ({ collapsed: !prevState.collapsed }));
  }

  render() {
    const { components } = this.props;
    const { collapsed } = this.state;

    return (
      <div className="stream-actions">
        <Button
          kind="ghost"
          data-cy="streamItem-actionButton"
          className={classNames('share', collapsed ? '' : 'active')}
          onClick={() => this.toggleShareOptions()}
        >
          <ImageShare className="image" />
        </Button>
        {collapsed ? null : (
          <div className="options">
            {components.map((component) => (
              <Button kind="ghost" onClick={() => this.toggleShareOptions()}>
                {component}
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  }
}

StreamActions.propTypes = { components: PropTypes.arrayOf(PropTypes.node).isRequired };
