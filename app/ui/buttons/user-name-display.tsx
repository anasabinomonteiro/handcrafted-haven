import { auth } from "../../../auth.config";
import Link from "next/link";
import styles from "../../home.module.css"
import Image from "next/image";
import SignIn from "@ui/sign-in";
import SignOut from "@ui/sign-out";


export default async function UserNameDisplay() {
    const session = await auth();
    return (
    <div className={styles.userNameDiv}>
        {session && session?.user.role === "user" ? (
        <div className={styles.userNameBar}>
            <div className={styles.userNameAndPicDiv}>
                <p>Hello, {session.user.name}!</p>
                <Image src={`${session.user.image}`} alt="User display picture" width={20} height={20} className={styles.displayPic}/>
            </div>
            <div className={styles.userNameAndPicDiv}>
                <Link className={styles.userNameLink} href={"/seller"}>Interested in becoming a seller?</Link>
                <SignOut />
            </div>
            
        </div>
        )
        : session && session?.user.role === "seller" ? (
        <div className={styles.userNameBar}>
            <div className={styles.userNameAndPicDiv}>
                <p>Hello, {session.user.name}!</p>
                <Image src={`${session.user.image}`} alt="User display picture" width={20} height={20} className={styles.displayPic}/>
            </div>
            <div className={styles.userNameAndPicDiv}>
                <Link className={styles.userNameLink} href={"/dashboard"}>Go to Dashboard</Link>
                <SignOut />
            </div>
        </div>
        )
        : (
        <div className={styles.userNameBar}>
            <div className={styles.userNameAndPicDiv}>
                <p>Please log in.</p>
                <SignIn />
            </div>
        </div>
        )}
    </div>
    );
}