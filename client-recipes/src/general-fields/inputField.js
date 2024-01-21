import { Box, FormControl, FormHelperText, Input, TextField } from "@mui/material";
import ArrowTitle from "./arrow-title";

const PrivateInput = ({ name, nameForError, register, errors, label, helperText, multiline, defaultValue, width }) => {
    return <>
        <FormControl sx={{ m: 1, minWidth: (width ? width : 120) }}>
            <TextField
                color="secondary"
                id={multiline ? "standard-multiline-static" : "standard-basic"}
                rows={multiline ? 4 : 1}
                multiline={multiline ? true : false}
                {...register(name)}
                label={label}
                variant="standard"
                error={errors && (nameForError ? errors[nameForError]?.message : errors[name]?.message) ? true : false}
                helpertext={errors ? (nameForError ? errors[nameForError]?.message : errors[name]?.message) : ""}
                defaultValue={defaultValue ? defaultValue : ''}
            />
            <FormHelperText>{errors ? nameForError ? errors[nameForError]?.message : errors[name]?.message : ""}</FormHelperText>
            {helperText ? <FormHelperText id="component-error-text">{helperText}</FormHelperText> : <></>}
        </FormControl>
    </>
}

const MyInput = ({ name, nameForError, register, errors, label, helperText, multiline, box = true, defaultValue = "", width = null }) => {
    return <>
        {box === true ?
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '100%' },
                }}
                noValidate
                autoComplete="off"
            >
                <PrivateInput name={name} nameForError={nameForError}
                    register={register} errors={errors} label={label}
                    helperText={helperText} multiline={multiline ? multiline : ""} defaultValue={defaultValue} width={width} />
            </Box> :
            <PrivateInput name={name} nameForError={nameForError}
                register={register} errors={errors} label={label}
                helperText={helperText} multiline={multiline ? multiline : ""} defaultValue={defaultValue} width={width} />
        }
    </>
}
export default MyInput;