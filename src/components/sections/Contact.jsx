import React, { useRef, useState, useCallback, useMemo } from "react";
import emailjs from "@emailjs/browser";
import { sectionsData } from "@/constants/sections";
import { socialLinks } from "@/constants/social";
import useAlert from "@/hooks/useAlert.js";
import Alert from "@/components/ui/Alert.jsx";

const Contact = React.memo(() => {
  const config = useMemo(() => sectionsData.contact, []);
  const formRef = useRef();
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = useCallback(({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        await emailjs.send(
          "service_gzjwvpl",
          "template_equqbf9",
          {
            from_name: form.name,
            to_name: "Safwan Sayeed",
            from_email: form.email,
            to_email: "isafwansayeed@gmail.com",
            message: form.message,
          },
          "lrdw7LEOLqDJVYlVT",
        );

        showAlert({
          show: true,
          text: "Thank you for your message 😃",
          type: "success",
        });

        setTimeout(() => {
          hideAlert(false);
          setForm({ name: "", email: "", message: "" });
        }, 3000);
      } catch {
        showAlert({
          show: true,
          text: "I didn't receive your message 😢",
          type: "danger",
        });
      } finally {
        setLoading(false);
      }
    },
    [form, showAlert, hideAlert],
  );

  const memoizedSocialLinks = useMemo(
    () =>
      socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          aria-label={link.alt}
        >
          <img src={link.src} alt={link.alt} className="social-icon" />
        </a>
      )),
    [],
  );

  return (
    <React.Fragment>
      <div className={`${config.triggerClass} section-margin`}></div>
      <section className={`section ${config.layout} ${config.cssClasses}`}>
        <div className={config.progressBar.wrapperClass}>
          <div
            className={`progress-bar ${config.progressBar.colorClass}`}
          ></div>
        </div>

        <div className="section-intro-wrapper tan-text tan-border">
          <div className="section-title tan-text">
            <span className="section-title-text tan-text">{config.title}</span>
            <span className="styleOne tan-border"></span>
            <span className="styleTwo tan-border"></span>
            <span className="styleThree tan-background"></span>
          </div>
          <div className="section-number tan-text">{config.number}</div>
        </div>

        <div className="section-detail-wrapper contact-content">
          <h3 className="section-heading">{config.subtitle}</h3>
          <p className="section-text">{config.description}</p>

          {/* Alert Component */}
          {alert.show && <Alert {...alert} />}

          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label className="form-label tan-text" htmlFor="contact-name">
                Full Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="e.g., John Doe 😄"
                aria-describedby="name-help"
              />
            </div>

            <div className="form-group">
              <label className="form-label tan-text" htmlFor="contact-email">
                Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="e.g., name@example.com 📧"
                aria-describedby="email-help"
              />
            </div>

            <div className="form-group">
              <label className="form-label tan-text" htmlFor="contact-message">
                Your Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="form-input form-textarea"
                placeholder="Drop me a message 😄, I'd love to hear from you!"
                aria-describedby="message-help"
              />
            </div>

            <button
              className={`contact-submit-btn ${loading ? "loading" : ""}`}
              type="submit"
              disabled={loading}
              aria-label={loading ? "Sending message..." : "Send message"}
            >
              <span>{loading ? "Sending..." : "Send Message"}</span>
              <svg
                className="submit-arrow"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 17L17 7M17 7H7M17 7V17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>

          {/* Social Links */}
          <div className="social-links-section">
            <h4 className="social-heading tan-text">Connect with me</h4>
            <div className="social-links">{memoizedSocialLinks}</div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
});

Contact.displayName = "Contact";

export default Contact;
