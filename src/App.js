import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React, { Suspense } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';

import { ArticleDetail } from './ArticleDetail/ArticleDetail';
import { EditArticle } from './EditArticle/EditArticle';
import { Home } from './Home/Home';
import { Login } from './Login/Login';
import { Navigation } from './Navigation/Navigation';
import { TwitterFeed } from './TwitterFeed/TwitterFeed';
import clsx from 'clsx';
import { getIsAdmin } from './services/loginService';
import instagramLogo from './assets/instagram.png';
import stravaLogo from './assets/strava.png';
import { theme } from './ui-utils/theme';
import { useState } from 'react';

const drawerWidth = 120;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    minHeight: 'calc(100vh - 136px)',
    width: '100%',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: theme.spacing(3),
    width: 'calc(100vw - 136px)'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  footer: {
    position: 'initial',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    fontSize: '10px',
    marginTop: '88px',
    marginBottom: theme.spacing(1),
  },
  stravaLogo: {
    width: theme.spacing(4),
    marginTop: -theme.spacing(1),
    marginRight: theme.spacing(1),
    verticalAlign: 'middle'
  },
  instagramLogo: {
    width: theme.spacing(4),
    marginTop: -theme.spacing(1),
    marginRight: theme.spacing(2),
    verticalAlign: 'middle'
  },
  logos: {
    textAlign: 'center',
    paddingBottom: 8
  }
}));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Suspense fallback="loading">
          <MainContainer></MainContainer>
        </Suspense>
      </div>
    </ThemeProvider>
  );
}

function MainContainer() {

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={classes.root}>
        <Router>
          <Navigation open={open} setOpen={setOpen} />
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.drawerHeader} />
            <Suspense fallback={<div>Chargement...</div>}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/admin/" component={EditArticle} />
                <Route path="/article/:id" component={ArticleDetail} />
                <Route path="/gps" component={TwitterFeed} />
              </Switch>
            </Suspense>
          </main>
        </Router>
      </div>
      <footer className={classes.footer}>
        <div>
          <div className={classes.logos}>
            <a rel="noreferrer" target="_blank" href="https://www.strava.com/athletes/28004502">
              <img className={classes.stravaLogo} src={stravaLogo} alt="strava logo"></img>
            </a>
            <a rel="noreferrer" target="_blank" href="https://www.instagram.com/outdoor_adventure_stories/">
              <img className={classes.instagramLogo} src={instagramLogo} alt="instagram logo"></img>
            </a>
          </div>
          <div>Made with React and Material UI by Fabien Inan - 2021</div>
        </div>
      </footer>
    </>
  );
}

export default App;
