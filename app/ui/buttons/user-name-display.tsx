import { auth } from "../../../auth.config";
import Link from "next/link";
import styles from "../../home.module.css"


export default async function UserNameDisplay() {
    const session = await auth();
    return (
    <div>
        {session && session?.user.role === "user" ? (
        <div className={styles.userNameBar}>
            <p>Hello, {session.user.name}!</p>
            <Link className={styles.userNameLink} href={"/seller"}>Interested in becoming a seller?</Link>
        </div>
        )
        : session && session?.user.role === "seller" ? (
        <div className={styles.userNameBar}>
            <p>Hello, {session.user.name}!</p>
            <Link className={styles.userNameLink} href={"/dashboard"}>Dashboard</Link>
        </div>
        )
        : (
        <p className={styles.userNameBar}>Please log in.</p>
        )}
    </div>
    );
}