import * as yup from "yup"
import { useFieldArray, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material"
import MyInput from "../general-fields/inputField"
import { useEffect, useState } from "react"
import MySelect from "../general-fields/selcetField"
import ArrowTitle from "../general-fields/arrow-title";
import { AddRecipeDispach, EditRecipeDispach } from "../services/recipes";
import { PurpleColor } from "../general-fields/colors";

const AddRecipe = ({ prop }) => {
    const schema = yup.object({
        Name: yup.string().required("זהו שדה חובה"),
        CategoryId: yup.string().required("זהו שדה חובה"),
        Img: yup.string("קישור URL").required("זהו שדה חובה"),
        Duration: yup.string().required("זהו שדה חובה"),
        Difficulty: yup.string().required("זהו שדה חובה"),
        Description: yup.string().required("זהו שדה חובה"),
        Instructions: yup.array().of(yup.object({ Inst: yup.string().required("זהו שדה חובה"), })).required("זהו שדה חובה"),
        Ingridient: yup.array().of(yup.object({
            Name: yup.string().required("זהו שדה חובה"),
            Count: yup.string().matches(/^[\d]+[\./\\]?[\d]*$/).required("זהו שדה חובה"),
            Type: yup.string().required("זהו שדה חובה"),
        })).required("זהו שדה חובה")
    }).required("זהו שדה חובה");

    const dispatch = useDispatch();
    const [errorNewCategory, setErrorNewCategory] = useState("");
    const { userId, categories } = useSelector(state => ({ userId: state.user.Id, categories: state.categories.categories }));
    const { register, handleSubmit, formState: { errors }, control } = useForm({ resolver: yupResolver(schema) });
    const { fields: Instructions, append: appendInstruction, remove: removeInstruction } = useFieldArray({ control, name: "Instructions" });
    const { fields: Ingredient, append: appendIngridient, remove: removeIngridient } = useFieldArray({ control, name: "Ingridient" });
    const [ingridientError, setIngridientError] = useState([]);

    var counter = 0;
    useEffect(() => {
        if (prop !== undefined && prop[0] !== undefined) {
            prop[0].Ingrident?.map(ing => appendIngridient({ Name: ing.Name, Count: ing.Count, Type: ing.Type }));
            prop[0].Instructions?.map(ins => appendInstruction({ Inst: ins }));
        }
        else if (counter == 0) {
            appendIngridient({ Name: "", Count: 0, Type: "" });
            appendInstruction({ Inst: "" });
            counter++;
        }
    }, []);

    const checkValidation = () => {
        if (errors["Instructions"]) {
            setErrorNewCategory([...errors["Instructions"]]);
            return false;
        }
        if (errors["Ingridient"]) {
            setIngridientError([...errors["Ingridient"]]);
            return false;
        }
        return true;
    }

    const onSubmit = (data) => {
        if (checkValidation() === true) {
            var instructions = [];
            data.Instructions.map(ins => { instructions.push(ins.Inst.replace(/[\r\n]/gm, ' ')) })
            var ingredients = [];
            data.Ingridient.map(ing => { ingredients.push({ Name: ing.Name, Count: ing.Count, Type: ing.Type }) })
            if (prop) dispatch(EditRecipeDispach(prop[0]?.Id, userId, ingredients, instructions, data));
            else dispatch(AddRecipeDispach(userId, ingredients, instructions, data));
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                <MyInput type="text" name="Name" register={register} errors={errors} label="שם המתכון"
                    defaultValue={prop ? prop[0]?.Name : ""} width="80%" />
                <MyInput type="text" name="Description" register={register} errors={errors} label="תיאור"
                    defaultValue={prop ? prop[0]?.Description : ""} width="80%" />
                <MyInput type="text" name="Img" register={register} errors={errors} label="קישור  URL לתמונה"
                    defaultValue={prop ? prop[0]?.Img : ""} width="80%" />
                <MyInput type="text" name="Duration" register={register} errors={errors} label="זמן הכנה (בדקות)"
                    defaultValue={prop ? prop[0]?.Duration : ""} width="80%" />

                <MySelect name="Difficulty" register={register} label="רמת קושי" errors={errors} defaultValue={prop ? prop[0]?.Difficulty : ""}
                    options={[{ Id: 1, Name: "קלה" }, { Id: 2, Name: "בינונית" }, { Id: 3, Name: "קשה" }]} width="80%" />

                <MySelect name="CategoryId" register={register} label="קטגוריה" errors={errors} defaultValue={prop ? prop[0]?.CategoryId : ""} options={categories} width="80%" />
                <br />

                <div style={Object.assign({ border: "1px solid " + PurpleColor() }, { marginTop: "5px" }, { borderRadius: "5px" },
                    { margin: "auto" }, { marginBottom: "5px" }, { width: "80%" })}>
                    {Ingredient?.map((item, index) => (
                        <div style={Object.assign({ width: "100%" }, { justifyContent: "center" }, { display: "flex" }, { alignItems: "center" })} key={index} >
                            <MyInput type="text" name={`Ingridient.${index}.Name`} register={register} nameForError="Name" errors={ingridientError[index]} label="שם מוצר" box={false} defaultValue={item.Name} />
                            <MyInput type="number" name={`Ingridient.${index}.Count`} register={register} errors={errors} label="כמות" box={false} defaultValue={item.Count} />
                            <MyInput type="text" name={`Ingridient.${index}.Type`} register={register} errors={errors} label="סוג הכמות" box={false} defaultValue={item.Type} />
                            <Button color="secondary" variant="contained" onClick={() => removeIngridient(index)}>מחק מוצר</Button>
                        </div>
                    ))}
                    <Button color="secondary" variant="contained" onClick={() => appendIngridient({ Name: "", Count: 0, Type: "" })}>הוסף מוצר</Button>
                </div>

                <div style={Object.assign({ border: "1px solid " + PurpleColor() }, { borderRadius: "5px" },
                    { margin: "auto" }, { marginBottom: "3px" }, { width: "80%" })}>
                    {Instructions?.map((item, index) => (
                        <div style={Object.assign({ width: "100%" }, { justifyContent: "center" }, { display: "flex" }, { alignItems: "center" })} key={index}>
                            <MyInput type="text" name={`Instructions.${index}.Inst`} register={register} errors={errors} label={`${index + 1}.`} multiline={true} box={false} defaultValue={prop ? prop[0]?.Instructions[index] : ""} width="80%" />
                            <Button color="secondary" variant="contained" onClick={() => removeInstruction(index)}>מחק הוראה</Button>
                        </div>
                    ))}
                    <Button color="secondary" variant="contained" onClick={() => appendInstruction({ Inst: "" })}>הוסף הוראה</Button>
                </div>

                <ArrowTitle title={prop ? "עדכן את המתכון" : "הוסף את המתכון החדש על שמך"}
                    container={<Button size="large" variant="contained" color="secondary" type="submit"
                        disabled={Instructions.length == 0 || Ingredient.length == 0}>{prop ? "עדכן" : "הוסף"} את המתכון</Button>} />
            </form >
        </>
    );
}
export default AddRecipe;
