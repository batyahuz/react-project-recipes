import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import MyInput from "../general-fields/inputField";
import { LogInDispach } from "../services/user";
import { useEffect } from "react";
import Swal from "sweetalert2";
import ArrowTitle from "../general-fields/arrow-title";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => ({ user: state.user }));

    const userSchema = yup.object({
        Username: yup.string().required("הכנס שם משתמש. זהו שדה חובה"),
        Password: yup.string().required("הכנס סיסמא. זהו שדה חובה"),
    }).required()
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(userSchema) });

    useEffect(() => {
        if (user?.Name) {
            navigate("/home");
            Swal.mixin({
                toast: true, position: "bottom-end", showConfirmButton: false, timer: 3000, timerProgressBar: true,
                didOpen: (toast) => { toast.onmouseenter = Swal.stopTimer; toast.onmouseleave = Swal.resumeTimer; }
            }).fire({ icon: "success", title: `שלום ל${user.Name}`, text: "נכנסת בהצלחה למערכת 😊", });
        }
    }, [user]);

    const onSubmit = data => {
        dispatch(LogInDispach(data));
    };

    return <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <MyInput name="Username" register={register} errors={errors} label="שם משתמש" />
            <MyInput name="Password" register={register} errors={errors} label="סיסמא" />
            <ArrowTitle container={<Button variant="contained" color="secondary" type="submit">הכנס</Button>} title="הכנס לחשבון שלך" />
        </form>
        <Link to="/signIn"><ArrowTitle title="אין לך חשבון אצלינו? הרשם עכשיו"
            container={<Button color="secondary">אין לך חשבון אצלינו? הרשם עכשיו</Button>} /></Link>
    </>
}
export default Login;