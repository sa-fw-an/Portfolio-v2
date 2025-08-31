import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span className="footer__copyright">
           © {new Date().getFullYear()} Safwan Sayeed. All rights reserved.
        </span>
        <div className="visit-counter-box flex items-center gap-2 bg-gray-800 text-gray-300 p-1.5 rounded-lg shadow-sm mt-2 sm:mt-0 sm:ml-4">
          <span className="text-sm font-medium">🤵 Views</span>
          <img
            src="https://hits.sh/safwansayeed.live.svg?style=round&label= &color=black"
            alt="Website visitor count"
            className="h-6 w-12"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
