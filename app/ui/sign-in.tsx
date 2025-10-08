
import { signIn } from "../../auth.config"
import styles from "@ui/footer.module.css"
 
export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button className={styles.signBtn} type="submit">Signin with Google</button>
    </form>
  )
} 