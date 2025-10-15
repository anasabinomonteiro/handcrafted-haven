import styles from "@ui/about.module.css";
import Image from "next/image";

export default function Page() {
  return (
    <div className={styles.aboutContainer}>
      <h1>About Us</h1>
      <p className={styles.introText}>
        Welcome to <strong>Handcrafted Haven</strong> - your trusted marketplace for unique, handmade, and sustainable creations.
      </p>

      <div className={styles.aboutContent}>
        <div className={styles.textSection}>
          <h2>Our Story</h2>
          <p>
            Founded with a passion for craftsmanship, Handcrafted Haven was born to connect skilled artisans with people who
            value authenticity and artistry. Every product here tells a story of creativity, care, and culture.
          </p>
          <h2>Our Mission</h2>
          <p>
            We aim to empower local makers, promote fair trade, and bring you closer to the people behind the products you love.
            Our mission is to create a vibrant community that celebrates human creativity and the beauty of handmade work.
          </p>
        </div>

        <div className={styles.imageSection}>
          <Image
            src="/images/collagen.jpg"
            alt="A handmade item - Mug"
            width={500}
            height={350}
            className={styles.aboutImage}
          />
        </div>
      </div>
    </div>
  );
}
