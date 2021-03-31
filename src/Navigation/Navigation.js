import { AppBar, Button, Drawer, IconButton, List, Menu, MenuItem, Toolbar, Typography, makeStyles } from "@material-ui/core";
import { getLocale, setLocale } from "../services/languageService";
import { useEffect, useState } from "react";

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import HomeIcon from '@material-ui/icons/Home';
import { ListItemLink } from "../ui-utils/ListItemLink";
import MenuIcon from '@material-ui/icons/Menu';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import bikeImage from '../assets/bike.png';
import clsx from 'clsx';
import { getIsAdmin } from "../services/loginService";
import { initReactI18next } from "react-i18next";
import { theme } from "../ui-utils/theme";
import { useTranslation } from "react-i18next";

const drawerWidth = 120;

const useStyles = makeStyles((theme) => ({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth + theme.spacing(2)}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    root: {
        display: 'flex',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        width: '85%',
        [theme.breakpoints.down('xs')]: {
            width: '60%',
        }
    },
    languageButton: {
        margin: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        }
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    bikeIcon: {
        width: theme.spacing(6)
    }
}));

export function Navigation(props) {

    const classes = useStyles();

    const { open, setOpen } = props;

    const { t, i18n } = useTranslation();

    const [anchorMenu, setAnchorMenu] = useState(null);

    const handleClickLanguage = (event) => setAnchorMenu(event.currentTarget);

    const handleCloseMenu = () => setAnchorMenu(null);

    const handleDrawerOpen = () => setOpen(true);

    const handleDrawerClose = () => setOpen(false);

    const setLanguage = (language) => i18n.use(initReactI18next).init({lng: language});

    useEffect(() => setLanguage(getLocale()), []);

    const changeLanguage = (language) => {
        setLanguage(language); 
        setLocale(language);
        handleCloseMenu();
        window.location.reload(true);
    }

    return (
        <div>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                        onClick={handleDrawerOpen}>
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6">
                        A bike trip across Canada
                    </Typography>
                    <Button className={classes.languageButton} onClick={handleClickLanguage} variant="contained" color="primary">
                        {t('french')}
                    </Button>
                    <Menu
                        anchorEl={anchorMenu}
                        keepMounted
                        open={Boolean(anchorMenu)}
                        onClose={handleCloseMenu}
                    >
                        <MenuItem onClick={() => {changeLanguage('fr')}}>{t('french')}</MenuItem>
                        <MenuItem onClick={() => {changeLanguage('en')}}>{t('english')}</MenuItem>
                    </Menu>
                    <img className={classes.bikeIcon} src={bikeImage} alt="bike logo"></img>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <List>
                    <ListItemLink to="/" primary={t('home')} icon={<HomeIcon />} onClick={(handleDrawerClose)} />
                    {getIsAdmin() && <ListItemLink to="/admin" primary={t('admin')} icon={<SupervisorAccountIcon />} onClick={handleDrawerClose} />}
                    <ListItemLink to="/gps" primary={t('gps')} icon={<GpsFixedIcon />} onClick={handleDrawerClose} />
                </List>
            </Drawer>
        </div>);
}