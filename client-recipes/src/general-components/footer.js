import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import EmailIcon from '@mui/icons-material/Email';
import { Typography } from '@mui/material';

const Footer = () => {
    return <footer style={Object.assign({ backgroundColor: "#9c27b0a3" }, { color: 'white' }, { height: "fit-content" })}>
        <Typography sx={[{ marginTop: "10px" }, { paddingTop: '20px' }]} variant="h4" gutterBottom>אתר המתכונים שלי</Typography>
        <img style={{ height: "40vh" }} alt="לוגו" src={`../logo192.png`} loading="lazy" />
        <div></div>
        <div><PhoneEnabledIcon /> 0583225546</div>
        <div><EmailIcon />  batyahuz@gmail.com</div>
    </footer>
}
export default Footer;