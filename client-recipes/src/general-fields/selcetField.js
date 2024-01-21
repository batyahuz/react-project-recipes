import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

const MySelect = ({ name, register, label, errors, defaultValue = "", options = [{}], width = null }) => {
    const [selected, setSelected] = useState(defaultValue);

    return <>
        <FormControl variant="standard" sx={{ m: 1, minWidth: (width ? width : 120) }}>
            <InputLabel id="demo-simple-select-standard-label" color="secondary">{label}</InputLabel>
            <Select color="secondary" labelId="demo-simple-select-standard-label" id="demo-simple-select-standard"
                error={errors && errors[name]?.message ? true : false}
                onClick={(event) => setSelected(event.target.dataset.value)} label={label} value={selected}{...register(name)}>
                {options.map(op => { return <MenuItem key={op.Id} value={op.Id}>{op.Name}</MenuItem> })}
            </Select>
            {errors[name] && <FormHelperText>{errors[name]?.message}</FormHelperText>}
        </FormControl>
    </>
}
export default MySelect;