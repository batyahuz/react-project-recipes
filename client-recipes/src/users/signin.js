import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import MyInput from "../general-fields/inputField";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SignInDispach } from "../services/user";
import { useEffect } from "react";
import ArrowTitle from "../general-fields/arrow-title";

const Signin = () => {
    const { user } = useSelector(state => ({
        user: state.user
    }))
    const userSchema = yup.object({
        Username: yup.string().required("זהו שדה חובה"),
        Password: yup.string().required("זהו שדה חובה"),
        Name: yup.string().required("זהו שדה חובה"),
        Phone: yup.string().matches(/^[0-9]{7,10}$/, 'טלפון חייב להכיל בין 7 ל-10 ספרות').required("זהו שדה חובה"),
        Email: yup.string().email("כתובת מייל אינה תקינה").required("זהו שדה חובה"),
        Tz: yup.string().matches(/^[0-9]{9}$/, 'תעודת זהות חייבת להכיל 9 ספרות בלבד').required("זהו שדה חובה"),
    }).required()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(userSchema) });
    useEffect(() => {
        if (user?.Name) {
            navigate("/home")
            Swal.mixin({
                toast: true, position: "bottom-end", showConfirmButton: false, timer: 3000, timerProgressBar: true,
                didOpen: (toast) => { toast.onmouseenter = Swal.stopTimer; toast.onmouseleave = Swal.resumeTimer; }
            }).fire({ icon: "success", title: `שלום ל${user.Name}`, text: "נרשמת בהצלחה למערכת 😊", });
        }
    }, [user]);

    const onSubmit = (data) => {
        dispatch(SignInDispach(data));
    }

    return <>
        <form style={Object.assign({ width: "100%" })} onSubmit={handleSubmit(onSubmit)}>
            <MyInput name="Username" register={register} errors={errors} label="שם משתמש" />
            <MyInput name="Password" register={register} errors={errors} label="סיסמא" />
            <MyInput name="Name" register={register} errors={errors} label="שם" />
            <MyInput name="Phone" register={register} errors={errors} label="טלפון" />
            <MyInput name="Email" register={register} errors={errors} label="מייל" />
            <MyInput name="Tz" register={register} errors={errors} label="תעודת זהות" />
            <ArrowTitle container={<Button variant="contained" color="secondary" type="submit">הרשם</Button>} title="שלח" />
        </form>
        <Link to="/logIn"><ArrowTitle title="יש לך כבר חשבון אצלינו? הכנס ללא הרשמה"
            container={<Button color="secondary">יש לך כבר חשבון אצלינו? הכנס</Button>} /></Link>
    </>

}
export default Signin;