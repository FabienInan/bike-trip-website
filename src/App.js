import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React, { Suspense } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';

import { Admin } from './Admin/Admin';
import { ArticleDetail } from './ArticleDetail/ArticleDetail';
import { Home } from './Home/Home';
import { Login } from './Login/Login';
import { Navigation } from './Navigation/Navigation';
import { TwitterFeed } from './TwitterFeed/TwitterFeed';
import clsx from 'clsx';
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
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
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
                <Route path="/admin" component={Admin} />
                <Route path="/login" component={Login} />
                <Route path="/article/:id" component={ArticleDetail} />
                <Route path="/gps" component={TwitterFeed} />
              </Switch>
            </Suspense>
          </main>
        </Router>
      </div>
      <footer className={classes.footer}>
        Custom made with React and Material UI by Fabien Inan - 2021
      </footer>
    </>
  );
}

export default App;
