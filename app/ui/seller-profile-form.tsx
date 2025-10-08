'use client'

import { useSession } from "next-auth/react"
import { updateRole } from "../lib/action"
import styles from '@ui/seller-page.module.css'


export function SellerForm() {
    const { data: session, status } = useSession();
    return (
        <form className={styles.sellerLinkContainer} action={updateRole}>
            <h1>Kindly click the button below to continue</h1>
            <input className={styles.sellerRadioButton} id="id" name="id" type="radio" value={session?.user.id} defaultChecked required hidden/>
            {/* <label className={styles.sellerRadioLabel} htmlFor="id">Seller</label> */}
    
            <button className={styles.sellerButton} >Create Seller Profile</button>
        </form>
    )
}