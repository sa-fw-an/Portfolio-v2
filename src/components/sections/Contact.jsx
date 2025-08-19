import React from 'react';
import { sectionsData } from '../../constants/sections';

const Contact = () => {
  return (
    <React.Fragment>
      <div className="section-intro-wrapper relative py-[20%] px-[5%] border-b-2 border-[var(--color-pink)] pb-[400px]">
        <div className="section-title relative text-[var(--color-pink)]">
          <span className="section-title-text block text-4xl font-medium origin-left skew-y-[25deg] z-[5] uppercase text-[var(--color-pink)]">
            {sectionsData.contact.title}
          </span>
          <span className="styleOne absolute top-0 block w-full max-w-[278px] h-[60px] border border-[var(--color-pink)] origin-left skew-y-[-25deg]"></span>
          <span className="styleTwo absolute top-20 block w-full max-w-[278px] h-[60px] border border-[var(--color-pink)] origin-left skew-y-[-25deg]"></span>
          <span className="styleThree absolute top-20 block w-full max-w-[278px] h-[60px] origin-left skew-y-[25deg] bg-[var(--color-pink)]"></span>
        </div>
        <div className="section-number absolute bottom-[15px] right-0 text-[var(--color-pink)] text-2xl">
          {sectionsData.contact.number}
        </div>
      </div>

      <div className="section-detail-wrapper relative py-[20%] px-[5%]">
        <h3 className="section-heading text-lg font-bold leading-[1.8] mt-16 text-[var(--color-text)]">
          {sectionsData.contact.subtitle}
        </h3>
        <p className="section-text leading-8 mt-[18px] text-base text-[var(--color-text)]">
          {sectionsData.contact.description}
        </p>
      </div>
    </React.Fragment>
  );
};

export default Contact;
