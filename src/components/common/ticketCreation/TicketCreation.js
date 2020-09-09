import React from 'react';
import qs from 'qs';
import PropTypes from 'prop-types';
import { useHistory, Redirect } from "react-router-dom"
import Type from './type/Type';
import './ticket-creation.scss';
import StreamHeader from '../../stream/common/streamHeader/StreamHeader';
import ticketList from './TicketList';
export default function TicketCreation({ location: { search } }) {
  const { type } = qs.parse(search, { ignoreQueryPrefix: true });
  let history = useHistory() 
  return (
    <>
      <StreamHeader title="Create New Request" streamType="new-ticket" />
      <div className="ticket-creation" >
        {ticketList[type].map(({ sectionTitle, sectionDescription, data }) => (
          <>
            <div className="container" >
              <h4>{sectionTitle}</h4>
              <span className="ticket-creation-description">{sectionDescription}</span>
            </div>
            <div className="type-container" >
              {data.map(({ title, description, url ,path}) => (
               <div onClick={()=>{ history.replace(path)}}>
                  <Type
                  title={title}
                  description={description}
                  url={url}
                />
               </div>
              ))}
            </div>
          </>
        ))}
      </div>
      <span>
      </span>

    </>
  );
}

TicketCreation.propTypes = {
  location: PropTypes.shape({ search: PropTypes.func.isRequired }).isRequired
};
