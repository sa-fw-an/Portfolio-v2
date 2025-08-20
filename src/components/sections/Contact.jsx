import React from 'react';
import { sectionsData } from '../../constants/sections';

const Contact = () => {
  return (
    <React.Fragment>
      <div className="section-intro-wrapper">
        <div className="section-title">
          <span className="section-title-text">
            {sectionsData.contact.title}
          </span>
          <span className="styleOne"></span>
          <span className="styleTwo"></span>
          <span className="styleThree"></span>
        </div>
        <div className="section-number">
          {sectionsData.contact.number}
        </div>
      </div>

      <div className="section-detail-wrapper">
        <h3 className="section-heading">
          {sectionsData.contact.subtitle}
        </h3>
        <p className="section-text">
          {sectionsData.contact.description}
        </p>
      </div>
    </React.Fragment>
  );
};

export default Contact;
