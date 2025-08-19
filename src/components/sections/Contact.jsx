import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { sectionsData } from '../../constants/sections';
import { personalInfo } from '../../constants/personal';

const Contact = () => {
  const container = useRef();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useGSAP(() => {
    gsap.fromTo(container.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: container.current, start: 'top 80%' } });
  }, { scope: container });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData); // Integrate EmailJS or API here
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="section-margin h-[3000px] w-full">
      <section ref={container} id="contact" className="section w-1/2 py-[1000px] px-[4%] bg-[--color-background] overflow-hidden rounded-tl-[700px] mr-auto">
        <div className="progress-bar-wrapper-right absolute top-0 right-0">
          <div className="progress-wrapper h-0 w-3 z-[9999]">
            <div className="progress-bar h-screen w-full bg-[--color-pink] origin-top scale-y-100"></div>
          </div>
        </div>

        <div className="section-intro-wrapper relative py-[20%] px-[5%] border-b-2 border-[--color-pink] pb-[400px]">
          <div className="section-title relative text-[--color-pink]">
            <span className="section-title-text block text-4xl font-medium origin-left skew-y-[25deg] z-[1] uppercase">
              {sectionsData.contact.title}
            </span>
            <span className="styleOne absolute top-0 block w-full max-w-[278px] h-[60px] border border-[--color-pink] origin-left skew-y-[-25deg]"></span>
            <span className="styleTwo absolute top-20 block w-full max-w-[278px] h-[60px] border border-[--color-pink] origin-left skew-y-[-25deg]"></span>
            <span className="styleThree absolute top-20 block w-full max-w-[278px] h-[60px] origin-left skew-y-[25deg] bg-[--color-pink]"></span>
          </div>
          <div className="section-number absolute bottom-[15px] right-0 text-[--color-pink] text-2xl">
            {sectionsData.contact.number}
          </div>
        </div>

        <div className="section-detail-wrapper relative py-[20%] px-[5%]">
          <h3 className="section-heading text-lg font-bold leading-[1.8] mb-8 text-[--color-text]">
            {sectionsData.contact.subtitle}
          </h3>
          
          <p className="section-text leading-8 mb-12 text-base text-[--color-text]">
            {sectionsData.contact.description}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[--color-text] mb-2">Full Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-[--color-pink] rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-pink] bg-transparent text-[--color-text]" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[--color-text] mb-2">Email Address</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-[--color-pink] rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-pink] bg-transparent text-[--color-text]" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[--color-text] mb-2">Your Message</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows="6" className="w-full px-4 py-2 border border-[--color-pink] rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-pink] bg-transparent text-[--color-text]"></textarea>
            </div>
            <button type="submit" className="w-full bg-[--color-pink] text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">Send Message</button>
          </form>

          <div className="mt-16 text-center">
            <p className="text-[--color-text] mb-4">© 2025 {personalInfo.name}. All rights reserved.</p>
            <div className="flex justify-center space-x-4 text-sm text-[--color-text]">
              <a href="#" className="hover:text-[--color-pink]">Terms & Conditions</a>
              <span>|</span>
              <a href="#" className="hover:text-[--color-pink]">Privacy Policy</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
