import { useEffect, useState } from "react";
import DisplayRecipes from "./displayRecipes";
import { Box, Chip, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import Checkbox from '@mui/material/Checkbox';
import { PurpleColor } from "../general-fields/colors";

const FilterRecipes = ({ id }) => {
    const { categories } = useSelector(state => ({ categories: state.categories.categories }));
    const [categoriesFilter, setcategoriesFilter] = useState([]);
    const [durationMin, setdurationMin] = useState(undefined);
    const [durationMax, setdurationMax] = useState(undefined);
    const [difficultyMin, setdifficultyMin] = useState(undefined);
    const [difficultyMax, setdifficultyMax] = useState(undefined);

    const handleChangeDuration = (event) => {
        const value = event.target.value;
        if (value.includes("-")) {
            const nums = value.split("-");
            if (nums[0] < nums[1]) {
                setdurationMin(nums[0]);
                setdurationMax(nums[1]);
            }
            else {
                setdurationMin(nums[1]);
                setdurationMax(nums[0]);
            }
        }
        else {
            setdurationMin(value);
            setdurationMax(value);
        }
    }

    const handleChangeDifficulty = (event) => {
        const value = event.target.value;
        if (value.includes("-")) {
            const nums = value.split("-");
            if (nums[0] < nums[1]) {
                setdifficultyMin(nums[0]);
                setdifficultyMax(nums[1]);
            }
            else {
                setdifficultyMin(nums[1]);
                setdifficultyMax(nums[0]);
            }
        }
        else {
            setdifficultyMin(value);
            setdifficultyMax(value);
        }
    }

    const handleChangeCategory = (event) => {
        const eraseDouble = (array) => {
            let newArr = [];
            array.sort((a, b) => { if (a[0] < b[0]) { return -1; } if (a[0] > b[0]) { return 1; } return 0; })
            for (let index = 0; index < array.length; index++) {
                const element = array[index];
                if (index === 0 || element[0] !== array[index - 1][0]) { newArr.push(element); }
                else { newArr.pop(); }
            }
            return newArr;
        }

        setcategoriesFilter(eraseDouble(event.target.value));
    }

    return <>
        <TextField color="secondary" id="outlined-search" label="משך זמן הכנה (בדקות)" type="search"
            helperText="אפשר להזין גם טווח לדוג' 10-20" onChange={handleChangeDuration} />

        <TextField color="secondary" id="outlined-number" label={`רמת קושי`} type="search"
            helperText="אפשר להזין גם טווח לדוג' 1-2" onChange={handleChangeDifficulty} />

        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label" color='secondary'>קטגוריה</InputLabel>

            <Select labelId="demo-multiple-checkbox-label" id="demo-multiple-checkbox" multiple value={categoriesFilter}
                onChange={handleChangeCategory} input={<OutlinedInput color="secondary" label="קטגוריה" />}
                renderValue={(selected) => (<Box sx={{ display: 'flex', gap: 0.5 }}>
                    {selected.map((value, i) => (<Chip key={i + value} label={value[1]} />))}</Box>)}
                MenuProps={{ PaperProps: { style: { maxHeight: 48 * 4.5 + 8, width: 250, }, }, }}
            >
                {categories.map((c, i) => (<MenuItem key={i + c.Id + c.Name} value={[c.Id, c.Name]}>
                    <Checkbox sx={{ color: PurpleColor, '&.Mui-checked': { color: PurpleColor, }, }}
                        checked={categoriesFilter?.find(cat => cat[0] === c.Id) !== undefined} />
                    <ListItemText primary={c.Name} />
                </MenuItem>))}
            </Select>
        </FormControl>

        <DisplayRecipes id={id} categoriesId={categoriesFilter} durationMin={durationMin}
            durationMax={durationMax} difficultyMin={difficultyMin} difficultyMax={difficultyMax} />
    </>
}
export default FilterRecipes;