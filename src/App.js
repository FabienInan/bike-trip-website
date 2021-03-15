import React, { Suspense } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';

import { Admin } from './Admin/Admin';
import { Home } from './Home/Home';
import { Navigation } from './Navigation/Navigation';
import clsx from 'clsx';
import { theme } from './ui-utils/theme';
import { useState } from 'react';

const drawerWidth = 120;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    }
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  footer: {
    position: 'initial',
    bottom: 8,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    fontSize: '10px',
    marginTop: '88px',
    marginBottom: '8px'
  }
}));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <MainContainer></MainContainer>
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
