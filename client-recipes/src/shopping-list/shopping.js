import { Box, List, ListItem, ListItemIcon, ListItemText, TableCell, TableRow } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';//להוסיף לעגלה
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';//למחוק את כל העגלה
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';//להוריד כמות של המוצר
import AddCircleIcon from '@mui/icons-material/AddCircle';//להוסיף בכמות של המוצר
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';//קניתי את כל הכמות של המוצר
import axios from "axios";
import ArrowTitle from "../general-fields/arrow-title";
import { DeleteItemDispach, UpdateListmDispach } from "../services/list";
import Swal from "sweetalert2";
import { PurpleColor } from "../general-fields/colors";
import { useEffect } from "react";
import { Segment } from "semantic-ui-react";

const Shopping = () => {
    const dispatch = useDispatch();
    const list = useSelector(state => state.list.list);

    // var counter = 0;
    // useEffect(() => {
    //     if (list.length === 0 && counter > 0) {
    //         counter++;
    //         Swal.fire({
    //             title: "ייש", text: "סיימת את הקניות שלך!!\nעכשיו אפשר ללכת לאפות ולבשל",
    //             icon: "success", confirmButtonColor: PurpleColor(), timer: 1500
    //         });
    //     }
    // }, [list]);

    const handleDeleteIng = (id, userId) => {
        dispatch(DeleteItemDispach(id, userId));
    }

    const handleEditIng = (ing, operator) => {
        if (operator === -1 && ing.Count - 1 <= 0) {
            handleDeleteIng(ing.Id, ing.UserId);
        }
        else dispatch(UpdateListmDispach({ ...ing, Count: operator }));
    }

    return <>
        {list?.length == 0 ? <Segment>אין מוצרים לקניה</Segment> : ""}
        <Box sx={{ width: '100%', maxWidth: "80%", bgcolor: 'background.paper', margin: 'auto' }}>
            <List>
                {list?.map(ing => {
                    return <>
                        <ListItem disablePadding key={ing?.Id}
                            sx={[{ minWidth: "300px" }, { width: "fit-content" }, { margin: "auto" }, { textAlign: "center" }]}>
                            <ArrowTitle title="להסרת יחידה אחת מהמוצר" container={
                                <ListItemIcon onClick={() => handleEditIng(ing, -1)}>
                                    <RemoveCircleIcon color="secondary" sx={{ fontSize: 40 }} />
                                </ListItemIcon>
                            } />
                            <ArrowTitle title="לעוד יחידה מהמוצר" container={
                                <ListItemIcon onClick={() => handleEditIng(ing, 1)}>
                                    <AddCircleIcon color="secondary" sx={{ fontSize: 40 }} />
                                </ListItemIcon>
                            } />
                            <ArrowTitle title="קנית את כל הכמות? לחץ להסרה מהרשימה" container={
                                <ListItemIcon onClick={() => handleDeleteIng(ing?.Id, ing?.UserId)}>
                                    <CheckCircleRoundedIcon color="secondary" sx={{ fontSize: 40 }} />
                                </ListItemIcon>
                            } />
                            <TableRow key={`${ing?.Name}${ing?.Type}${ing?.Count}`} sx={[{ '&:last-child td, &:last-child th': { border: 0 } }, { width: "fit-content" }]}>
                                <TableCell key={0} component="th" scope="row">{ing?.Name}</TableCell>
                                <TableCell key={2} align="right">{ing?.Count}</TableCell>
                                <TableCell key={1} align="right">{ing?.Type}</TableCell>
                            </TableRow>
                        </ListItem>
                    </>
                })}
            </List>
        </Box>
    </>
}
export default Shopping;