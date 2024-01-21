import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import ArrowTitle from '../general-fields/arrow-title';
import { useState } from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Popover } from '@mui/material';
import { PurpleColor } from '../general-fields/colors';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Swal from 'sweetalert2';
import { UpdateListmDispach } from '../services/list';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteRecipeDispach } from '../services/recipes';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)', marginLeft: 'auto',
  transition: theme.transitions.create('transform', { duration: theme.transitions.duration.shortest, }),
}));

const Demo = styled('div')(({ theme }) => ({ backgroundColor: theme.palette.background.paper }));

const RecipeCard = ({ recipe }) => {
  const { userId, categories } = useSelector(state => ({ userId: state.user.Id, categories: state.categories.categories }));
  const dispatch = useDispatch();

  let categoriesDictionary = [];
  categories.map(c => categoriesDictionary.push({ name: c.Name, id: c.Id }))
  const [ingridients, setIngridients] = useState(false);
  const [instructions, setInstructions] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClickEraseRecipe = () => {
    Swal.fire({
      title: "האם אתה בטוח?", text: "לאחר המחיקה לא תוכל לשחזר את המתכון", icon: "warning",
      showCancelButton: true, confirmButtonColor: PurpleColor(), cancelButtonColor: "#d33",
      confirmButtonText: "כן, מחק בכל זאת", cancelButtonText: "לא, ביטול"
    }).then((res) => { if (res.isConfirmed) { dispatch(DeleteRecipeDispach(recipe.Id)); } });
  }

  return (
    <>
      <Popover id={id} open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }} transformOrigin={{ vertical: 'top', horizontal: 'left', }}>

        <Demo key={0}><List key={12}><ListItem key={1}>
          <ListItemAvatar key={2}><Avatar><SignalCellularAltIcon /></Avatar></ListItemAvatar>
          <ListItemText key={3} primary={`רמת קושי ${recipe.Difficulty}`} />
        </ListItem></List></Demo>

        <Demo key={4}><List key={13}><ListItem key={5}>
          <ListItemAvatar key={6}><Avatar><AccessTimeIcon /></Avatar></ListItemAvatar>
          <ListItemText key={7} primary={`זמן הכנה ${recipe.Duration} דקות`} />
        </ListItem></List></Demo>

        <Demo key={8}><List key={14}><ListItem key={9}>
          <ListItemAvatar key={10}><Avatar><CategoryIcon /></Avatar></ListItemAvatar>
          <ListItemText key={11} primary={`קטגוריה ${categoriesDictionary[recipe.Id]?.name}`} />
        </ListItem></List></Demo>

      </Popover>

      <Card sx={[{ maxWidth: 345 }, { height: "440px" }, { border: 1 }, { borderColor: "secondary.main" }, { marginBottom: "15px" }]}>

        <CardHeader title={recipe.Name} subheader={`⏳ זמן הכנה ${recipe.Duration} דקות`}
          avatar={<ArrowTitle title={recipe.Name}
            container={<Avatar sx={{ bgcolor: PurpleColor }} aria-label="recipe">{recipe.Name ? recipe.Name[0] : ""}</Avatar>} />}
          action={<ArrowTitle title="פרטים נוספים"
            container={<IconButton aria-label="settings" onClick={() => setAnchorEl(event.currentTarget)}><MoreVertIcon /></IconButton>} />}
        />

        <CardMedia component="img" height="194" image={recipe.Img} alt={`תמונה של ${recipe.Name}`} />

        <CardContent>
          <Typography variant="body2" color="text.secondary">{recipe.Description}</Typography>
        </CardContent>

        <CardActions disableSpacing>
          <Link to="/singleRecipe"><ArrowTitle title="לצפיה במתכון המלא"
            container={<IconButton aria-label="see full recipe"><FileOpenIcon /></IconButton>} /></Link>
          {
            recipe.UserId == userId &&
            <Link to={`/editRecipe/${recipe.Id}`}>
              <ArrowTitle title="ערוך את המתכון שלך"
                container={<IconButton aria-label="edit"><EditIcon /></IconButton>} />
            </Link>
          }
          {
            recipe.UserId == userId &&
            <ArrowTitle title="מחק את המתכון שלך"
              container={<IconButton aria-label="erase" onClick={handleClickEraseRecipe}><DeleteIcon /></IconButton>} />
          }
          <div onClick={() => recipe.Ingrident.map(x =>
            dispatch(UpdateListmDispach({ Name: x.Name, Count: x.Count, UserId: userId })))} >
            <ArrowTitle title="הוספה לרשימת הקניות את כל החומרים הדרושים למתכון זה לחץ כאן"
              container={<IconButton aria-label="shopping ingridients"><ShoppingCartIcon /></IconButton>} />
          </div>

          <ExpandMore expand={instructions} onClick={() => setInstructions(!instructions)} aria-expanded={instructions} aria-label="show more">
            <ArrowTitle title="הוראות הכנה" container={<ExpandMoreIcon />} />
          </ExpandMore>

          <ExpandMore expand={ingridients} onClick={() => setIngridients(!ingridients)} aria-expanded={ingridients} aria-label="show more">
            <ArrowTitle title="החומרים הדרושים" container={<ExpandMoreIcon />} />
          </ExpandMore>
        </CardActions>

        <Collapse sx={[{ zIndex: 5 }, { position: "absolute" }, { backgroundColor: "white" }]} in={ingridients} timeout="auto" unmountOnExit><CardContent>
          <Typography paragraph style={{ textDecoration: 'underline' }}>החומרים הדרושים</Typography>
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
        </CardContent></Collapse>
        <Collapse sx={[{ zIndex: 5 }, { position: "absolute" }, { backgroundColor: "white" }]} in={instructions} timeout="auto" unmountOnExit><CardContent>

          <Typography paragraph style={{ textDecoration: 'underline' }}>הוראות הכנה</Typography>
          {
            recipe.Instructions &&
            recipe.Instructions.map(ins => <Typography key={ins} paragraph>{ins}</Typography>)
          }

        </CardContent></Collapse>

      </Card >
    </>
  );
}
export default RecipeCard;