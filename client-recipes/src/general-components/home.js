import { Link } from "react-router-dom";
import ArrowTitle from "../general-fields/arrow-title";
import { Button, ButtonGroup } from "@mui/material";
import { useSelector } from "react-redux";

const Home = () => {
    const user = useSelector(state => state.user);

    return <>
        <ButtonGroup color="secondary" size="large" sx={[{ height: "35vh" }, { direction: "ltr" }]}>

            <Link sx={{ marginTop: "4px" }} to="/shopping">
                <ArrowTitle title="לרשימת הקניות" container={<Button name="/shopping"
                    variant="contained" onClick={ev => changeMenu(ev.target.name)}>
                    לרשימת הקניות
                </Button>} />
            </Link>

            <Link sx={{ marginTop: "4px" }} to="/addRecipe" >
                <ArrowTitle title="להוסיף מתכון" container={
                    <Button name="/addRecipe" variant="contained" onClick={ev => changeMenu(ev.target.name)}>
                        להוסיף מתכון
                    </Button>
                } />
            </Link>

            <Link sx={{ marginTop: "4px" }} to="/displayRecipes" >
                <ArrowTitle title="לכל המתכונים" container={
                    <Button name="/displayRecipes" variant="contained" onClick={ev => changeMenu(ev.target.name)}>
                        לכל המתכונים
                    </Button>
                } />
            </Link>

            <Link sx={{ marginTop: "4px" }} to="/displayUserRecipes" >
                <ArrowTitle title="המתכונים שלי" container={<Button name="/displayUserRecipes"
                    variant="contained" onClick={ev => changeMenu(ev.target.name)}>
                    המתכונים שלי
                </Button>
                } />
            </Link>

            {!user.Id && <>
                <Link sx={{ marginTop: "4px" }} to="/signIn" >
                    <ArrowTitle title="למשתמש חדש. לפתיחת חשבון" container={<Button name="/signIn"
                        variant="contained" onClick={ev => { changeMenu(ev.target.name) }}>
                        הרשמה
                    </Button>
                    } />
                </Link>

                <Link sx={{ marginTop: "4px" }} to="/logIn" >
                    <ArrowTitle title="למשתמש עם חשבון קיים" container={<Button name="/logIn"
                        variant="contained" onClick={ev => changeMenu(ev.target.name)}>
                        כניסה
                    </Button>
                    } />
                </Link>
            </>}

        </ButtonGroup>
    </>
}
export default Home;