// src/components/InfoPanel/Contact.jsx
import { useState } from "react";
import styles from "./InfoPanel.module.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic
    console.log("Form submitted:", formData);
  };

  return (
    <div className={styles.section}>
      <h2 className="text-primary mb-4">Get In Touch</h2>

      <div className="contact-info mb-4">
        <div className={`${styles.contactItem} mb-3`}>
          <i className="bi bi-envelope"></i>
          <a href="mailto:your.email@example.com">your.email@example.com</a>
        </div>
        <div className={`${styles.contactItem} mb-3`}>
          <i className="bi bi-linkedin"></i>
          <a href="https://linkedin.com/in/yourusername" target="_blank">
            LinkedIn Profile
          </a>
        </div>
        <div className={`${styles.contactItem} mb-3`}>
          <i className="bi bi-github"></i>
          <a href="https://github.com/yourusername" target="_blank">
            GitHub Profile
          </a>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            rows="4"
            placeholder="Your Message"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
