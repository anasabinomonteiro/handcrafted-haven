import styles from "@ui/contact.module.css";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/solid";

export default function Page() {
  return (
    <div className={styles.contactContainer}>
      <h1>Contact Us</h1>
      <p className={styles.introText}>
        Have questions, feedback, or partnership inquiries? We’d love to hear from you.
      </p>

      <div className={styles.contactInfo}>
        <div className={styles.infoItem}>
          <PhoneIcon className={styles.icon} />
          <p>+1 01-234-567</p>
        </div>

        <div className={styles.infoItem}>
          <EnvelopeIcon className={styles.icon} />
          <p>support@handcrafted.com</p>
        </div>

        <div className={styles.infoItem}>
          <MapPinIcon className={styles.icon} />
          <p>#52 West Holland Avenue, USA</p>
        </div>
      </div>

      <form className={styles.contactForm}>
        <label>
          Name
          <input type="text" name="name" placeholder="Your name" required />
        </label>
        <label>
          Email
          <input type="email" name="email" placeholder="you@example.com" required />
        </label>
        <label>
          Message
          <textarea name="message" rows={5} placeholder="Write your message..." required />
        </label>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}
