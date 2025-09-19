import styles from "./footer.module.css";
import Link from "next/link";
import { PhoneIcon, MapPinIcon, EnvelopeIcon, } from "@heroicons/react/16/solid";

export default function Footer() {
    return (
        <footer className={styles.footerContainer}>
            <div className={styles.footerLinkContainer}>
                <div>
                    <p>Your trusted destination for quality products integrated within a vibrant community</p>
                </div>
                <div>
                    <nav className={styles.footerNav}>
                        <Link className={styles.footerNavLink} href="#">Home</Link>
                        <Link className={styles.footerNavLink}  href="#">Products</Link>
                        <Link className={styles.footerNavLink}  href="#">About Us</Link>
                        <Link className={styles.footerNavLink}  href="#">Contact</Link>
                    </nav>
                </div>
                <div>
                    <nav className={styles.footerNav}>
                        <Link className={styles.footerNavLink}  href="#">FAQ</Link>
                        <Link className={styles.footerNavLink}  href="#">Shipping Info</Link>
                        <Link className={styles.footerNavLink}  href="#">Track Order</Link>
                    </nav>
                </div>
                <div>
                    <p className={styles.supportDetails}><PhoneIcon className={styles.phoneIcon}/> +1 01-234-567</p>
                    <p className={styles.supportDetails}> <EnvelopeIcon className={styles.emailIcon}/>support@handcrafted.com</p>
                    <p className={styles.supportDetails}><MapPinIcon className={styles.locationIcon} /> #52 West Holland Avenue, USA</p>
                </div>
            </div>
            <div className={styles.footerPolicyContainer}>
                <p>© 2024 Handcrafted-Haven. All rights reserved.</p>
                <div>
                    <nav className={styles.policyNav}>
                        <Link href="#">Terms</Link>
                        <Link href="#">Cookie Policy</Link>
                        <Link href="#">Privacy Policy</Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
}