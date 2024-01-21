import { Link } from "react-router-dom"
import ArrowTitle from "../general-fields/arrow-title";

const Entry = () => {
    return <>
        <Link to="/logIn" ><ArrowTitle title="למשתמש עם חשבון קיים" container={<button>כניסה</button>} /></Link>
        <Link to="/signIn" ><ArrowTitle title="למשתמש חדש. לפתיחת חשבון" container={<button>הרשמה</button>} /></Link>
    </>
}
export default Entry;