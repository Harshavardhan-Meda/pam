import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { addInvestigationComment, getInvestigationById } from './actions/investigations';
import { getProfile } from './actions/profile';
import { addRequestComment, getRequestById } from './actions/requests';
import Details from './components/common/leafDetails/LeafDetails';
import PortalBanner from './components/common/portalBanner/PortalBanner';
import Root from './components/root/Root';
import InvestigationStream from './components/stream/investigationStream/InvestigationStream';
import RequestStream from './components/stream/requestStream/RequestStream';
import SecurityStream from './components/stream/securityStream/SecurityStream';
import TicketCreation from './components/common/ticketCreation/TicketCreation';
import Firewall from './components/firewall/Firewall';
import NewRequest from './components/common/CreateService/NewRequest'


class AuthenticatedApp extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getProfile());
  }

  render() {
    return (
      <>
        <PortalBanner />
        <Switch>
          <Route
            path="/investigations/:id"
            render={() => (
              <Details
                getItemById={getInvestigationById}
                addCommentById={addInvestigationComment}
                type="investigation"
              />
            )}
          />
          <Route
            path="/requests/:id"
            render={() => <Details getItemById={getRequestById} addCommentById={addRequestComment} type="request" />}
          />
          <Switch>
            <Root>
              <main>
                <Route path="/stream/:filter?" component={SecurityStream} />
                <Route exact path="/investigations/:filter?" component={InvestigationStream} />
                <Route exact path="/requests/:filter?" component={RequestStream} />
                <Route exact path="/new-ticket/:type?" component={TicketCreation} />
                <Route exact path="/firewall/:type?" component={Firewall} />
                <Route exact path="/new-request" component={NewRequest} />
              </main>
            </Root>
          </Switch>
        </Switch>
      </>
    );
  }
}

AuthenticatedApp.propTypes = { dispatch: PropTypes.func.isRequired };

export default connect()(AuthenticatedApp);
