import { FilledInput, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";



const InputPassword = ({ name, register, errors, label }) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return <>
        {/* <InputLabel htmlFor="standard-adornment-password">{label}</InputLabel>
        <Input
            {...register(name)}
            label={label}
            variant="standard"
            helpertext={errors[name]?.message}
            id="standard-basic"

            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
                <InputAdornment position="end">
                     <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        // onMouseDown={handleMouseDownPassword}
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            }
        />
         <InputLabel htmlFor="filled-adornment-password">{label}</InputLabel>
        <FilledInput
            {...register(name)}
            helperyext={errors[name]?.message}
            id="filled-adornment-password"
            id="standard-basic"
            label={label}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            }
        />
        <FormHelperText id="component-error-text">{errors[name]?.message || errors.name?.message}</FormHelperText> */}
    </>

}
export default InputPassword;