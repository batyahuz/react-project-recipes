import { CardMedia, Container, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { Item } from "semantic-ui-react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import ArrowTitle from '../general-fields/arrow-title';
import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';
import CategoryIcon from '@mui/icons-material/Category';
import { UpdateListmDispach } from '../services/list';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const SingleRecipe = () => {
    const { id } = useParams();
    const recipes = useSelector(state => state.recipes.recipes);
    const recipe = recipes.find(r => r.Id == id);
    const categories = useSelector(state => state.categories.categories);
    let categoriesDictionary = [];
    categories.map(c => categoriesDictionary.push({ name: c.Name, id: c.Id }))

    return <>
        <Container maxWidth="sm">
            <Stack spacing={2}>
                <Item>
                    <CardMedia component="img" image={recipe.Img} alt={`תמונה של ${recipe.Name}`} height="194" />
                </Item>
                <Item>
                    <Item>
                        <Typography variant="h2" gutterBottom>{recipe.Name}</Typography>
                    </Item>
                    <Item>
                        <Typography variant="subtitle1" gutterBottom>{recipe.Description}</Typography>
                    </Item>
                    <Item>
                        <Stack direction="row" spacing={2}>
                            <div><List key={12}><ListItem key={1}>
                                <ListItemAvatar key={2}><Avatar><SignalCellularAltIcon /></Avatar></ListItemAvatar>
                                <ListItemText key={3} primary={`רמת קושי ${recipe.Difficulty}`} />
                            </ListItem></List></div>

                            <div><List key={13}><ListItem key={5}>
                                <ListItemAvatar key={6}><Avatar><AccessTimeIcon /></Avatar></ListItemAvatar>
                                <ListItemText key={7} primary={`זמן הכנה ${recipe.Duration} דקות`} />
                            </ListItem></List></div>

                            <div><List key={14}><ListItem key={9}>
                                <ListItemAvatar key={10}><Avatar><CategoryIcon /></Avatar></ListItemAvatar>
                                <ListItemText key={11} primary={`קטגוריה ${categoriesDictionary[recipe.Id]?.name}`} />
                            </ListItem></List></div>
                        </Stack>
                    </Item>
                    <Item>
                        <Typography gutterBottom paragraph style={{ textDecoration: 'underline' }}>החומרים הדרושים</Typography>
                        <Table aria-label="simple table">

                            <TableHead><TableRow>
                                <TableCell key={0}>תיאור</TableCell>
                                <TableCell key={1} align="right">סוג</TableCell>
                                <TableCell key={2} align="right">כמות</TableCell>
                            </TableRow></TableHead>

                            <TableBody>
                                {recipe.Ingrident && recipe.Ingrident.map(ing => {
                                    return <>
                                        <TableRow key={`${ing.Name}${ing.Type}${ing.Count}`} style={{ textAlign: 'start' }}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}                  >
                                            <TableCell key={0} component="th" scope="row">{ing.Name}</TableCell>
                                            <TableCell key={1} align="right">{ing.Type}</TableCell>
                                            <TableCell key={2} align="right">{ing.Count}</TableCell>
                                            <ArrowTitle title="להוספת המוצר לרשימת הקניות שלך" container={<TableCell key={3} align="right">
                                                <AddShoppingCartIcon onClick={() => dispatch(UpdateListmDispach({ Name: ing.Name, Count: ing.Count, UserId: userId }))} />
                                            </TableCell>} />
                                        </TableRow>
                                    </>
                                })}
                            </TableBody>

                        </Table>
                    </Item>
                    <Item>
                        <Typography style={{ textDecoration: 'underline' }} paragraph variant="h4" gutterBottom>הוראות הכנה</Typography>
                        {
                            recipe.Instructions &&
                            recipe.Instructions.map(ins => <Typography key={ins} paragraph>{ins}</Typography>)
                        }
                    </Item>
                </Item>
            </Stack>
        </Container>
    </>
}

export default SingleRecipe;