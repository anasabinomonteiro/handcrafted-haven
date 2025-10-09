
import { signOut } from "../../auth.config";
import styles from "@ui/footer.module.css"
 
export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut({ redirectTo: "/" })
      }}
    >
      <button className={styles.signBtn} type="submit">Sign Out</button>
    </form>
  )
} 