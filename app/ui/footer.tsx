import styles from "./footer.module.css";
import Link from "next/link";
import CurrentYear from "./current-year";
import SignIn from "./sign-in";
import SignOut from "./sign-out";
import { auth } from "../../auth.config";

export default async function Footer() {
  const session = await auth();

  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.brandText}>
          <p>
            Your trusted destination for quality handcrafted products and
            creative artisans.
          </p>
        </div>

        <div className={styles.linkGroup}>
          <h4>Explore</h4>
          <nav className={styles.policyNav}>
            <Link href="#">Terms</Link>
            <Link href="#">Cookie Policy</Link>
            <Link href="#">Privacy Policy</Link>
          </nav>
        </div>

        <div className={styles.linkGroup}>
          <h4>Support</h4>
          <nav>
            <Link href="#">FAQ</Link>
            <Link href="#">Shipping Info</Link>
            <Link href="#">Track Order</Link>
          </nav>
        </div>

        <div className={styles.authSection}>
          {session ? <SignOut /> : <SignIn />}
        </div>
      </div>

      <div className={styles.bottomSection}>
        <CurrentYear />
      </div>
    </footer>
  );
}