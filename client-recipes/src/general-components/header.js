import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import ArrowTitle from "../general-fields/arrow-title";
import { Button, ButtonGroup, Fab } from "@mui/material";
import { PurpleColor } from "../general-fields/colors";
import PersonIcon from '@mui/icons-material/Person';

const HeaderComp = () => {
    const user = useSelector(state => state.user);
    const [active, setActive] = useState();
    const location = useLocation();
    const changeMenu = (name) => setActive(name);
    useEffect(() => { setActive(location.pathname) }, [location])

    return <>
        <header style={Object.assign({ position: "sticky" }, { top: 0 }, { backgroundColor: "white" }, { zIndex: "10" }, { direction: "ltr" })} >
            <div style={Object.assign({ display: "flex" }, { flexWrap: "wrap" }, { alignContent: "center" },
                { justifyContent: "space-evenly" }, { alignItems: "center" }, { marginTop: "5vh" }, { marginBottom: "5vh" })}>
                <Fab variant="extended" color="secondary"><PersonIcon sx={{ mr: 1 }} />{user.Id ? user.Name : "לא מחובר"}</Fab>
                <ButtonGroup color="secondary" size="large" sx={[{ height: "5vh" }]}>

                    <Link to="/shopping">
                        <ArrowTitle title="לכל המתכונים" container={<Button name="/shopping"
                            variant={active === "/shopping" ? "text" : "contained"} onClick={ev => changeMenu(ev.target.name)}>
                            לרשימת הקניות
                        </Button>} />
                    </Link>

                    <Link to="/addRecipe" >
                        <ArrowTitle title="לכל המתכונים" container={
                            <Button name="/addRecipe" variant={active === "/addRecipe" ? "text" : "contained"} onClick={ev => changeMenu(ev.target.name)}>
                                להוסיף מתכון
                            </Button>
                        } />
                    </Link>

                    <Link to="/displayRecipes" >
                        <ArrowTitle title="לכל המתכונים" container={
                            <Button name="/displayRecipes" variant={active === "/displayRecipes" ? "text" : "contained"} onClick={ev => changeMenu(ev.target.name)}>
                                לכל המתכונים
                            </Button>
                        } />
                    </Link>

                    <Link to="/displayUserRecipes" >
                        <ArrowTitle title="המתכונים שלי" container={<Button name="/displayUserRecipes"
                            variant={active === "/displayUserRecipes" ? "text" : "contained"} onClick={ev => changeMenu(ev.target.name)}>
                            המתכונים שלי
                        </Button>
                        } />
                    </Link>

                    {!user.Id && <>
                        <Link to="/signIn" >
                            <ArrowTitle title="למשתמש חדש. לפתיחת חשבון" container={<Button name="/signIn"
                                variant={active === "/signIn" ? "text" : "contained"} onClick={ev => { changeMenu(ev.target.name) }}>
                                הרשמה
                            </Button>
                            } />
                        </Link>

                        <Link to="/logIn" >
                            <ArrowTitle title="למשתמש עם חשבון קיים" container={<Button name="/logIn"
                                variant={active === "/logIn" ? "text" : "contained"} onClick={ev => changeMenu(ev.target.name)}>
                                כניסה
                            </Button>
                            } />
                        </Link>
                    </>}

                </ButtonGroup>
                <img style={{ height: "90px" }} alt="לוגו" src={`../logo192.png`} loading="lazy" />
            </div>
            <hr style={{ borderColor: PurpleColor() }} />
        </header >
    </>
}
export default HeaderComp;