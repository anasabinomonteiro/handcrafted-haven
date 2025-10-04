import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.css";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/16/solid";
import { UserCircleIcon } from "@heroicons/react/16/solid";

export default function Header() {
    return (
        <div className={styles.headerContainer}>
            <div>
                <Image src="/images/handcrafted-logo.png" alt="Handcrafted-Haven Logo" width={150} height={50} />
                <p>Handcrafted-Haven</p>
            </div>
            <nav className={styles.headerNav}>
                <Link href="/">Home</Link>
                <Link href="/categories">Categories</Link>
                <Link href="/products">Products</Link>
                <Link href="#">About</Link>
                <Link href="#">Contact</Link>
            </nav>
            {/*
            <div>
                <input type="text" placeholder="Search..." />
                <button><MagnifyingGlassCircleIcon className={styles.magnifyingGlassIcon}/></button>
            </div>
            <div>
                <ShoppingCartIcon className={styles.magnifyingGlassIcon} />
                <UserCircleIcon className={styles.magnifyingGlassIcon} />
            </div>
            */}
        </div>
    );
}