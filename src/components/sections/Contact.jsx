import React from 'react';
import { sectionsData } from '../../constants/sections';

const Contact = () => {
  const config = sectionsData.contact;

  return (
    <React.Fragment>
      <div className={`${config.triggerClass} section-margin`}></div>
      <section className={`section ${config.layout} ${config.cssClasses}`}>
        <div className={config.progressBar.wrapperClass}>
          <div className={`progress-bar ${config.progressBar.colorClass}`}></div>
        </div>
        
        <div className="section-intro-wrapper">
          <div className="section-title">
            <span className="section-title-text">
              {config.title}
            </span>
            <span className="styleOne"></span>
            <span className="styleTwo"></span>
            <span className="styleThree"></span>
          </div>
          <div className="section-number">
            {config.number}
          </div>
        </div>

        <div className="section-detail-wrapper">
          <h3 className="section-heading">
            {config.subtitle}
          </h3>
          <p className="section-text">
            {config.description}
          </p>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Contact;
