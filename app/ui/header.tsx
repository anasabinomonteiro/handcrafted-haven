"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.css";
import { ShoppingCartIcon, MagnifyingGlassCircleIcon, UserCircleIcon } from "@heroicons/react/16/solid";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
        <header className={styles.headerContainer}>
            <div className={styles.logoArea}>
                <Image 
                    src="/images/handcrafted-logo.png" alt="Handcrafted-Haven Logo" width={120} height={70} className={styles.logoImage}
                />
                <p className={styles.logoText}>Handcrafted-Haven</p>
            </div>

            <button
                className={styles.hamburgerButton}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
            >
                {menuOpen ? "✕" : "≡"}
            </button>

            <nav className={`${styles.headerNav}`}
            >
                <Link href="/">Home</Link>
                <Link href="/categories">Categories</Link>
                <Link href="/products">Products</Link>
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
            </nav>

            {/* 
            <div className={styles.iconArea}>
                <MagnifyingGlassCircleIcon className={styles.icon}/>
                <ShoppingCartIcon className={styles.icon}/>
                <UserCircleIcon className={styles.icon}/>
            </div>
            */}
        </header>

        <nav className={`${styles.mobileNav} ${menuOpen ? styles.navOpen : ""}`}>
            <Link href="/">Home</Link>
            <Link href="/categories">Categories</Link>
            <Link href="/products">Products</Link>
            <Link href="#">About</Link>
            <Link href="#">Contact</Link>
        </nav>
        </>
    );
}