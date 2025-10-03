'use client'

import styles from "@ui/footer.module.css"
import { useEffect, useState } from "react";

export default function CurrentYear () {
    const today = new Date();
    const [lastModified, setLastModified] = useState("");

    useEffect(() => {
        setLastModified(document.lastModified);
    }, []);

    return (
        <div>
            <p><span className={styles.lastModified}>©{today.getFullYear()}</span> Handcrafted-Haven. All rights reserved.</p>
            <p>Last Modified: <span className={styles.lastModified}>{lastModified}</span></p>
        </div>
    );
}