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
    <div className={classes.root}>
      <Router>
        <Navigation open={open} setOpen={setOpen} />
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
        <div className={classes.drawerHeader}/>
        <Suspense fallback={<div>Chargement...</div>}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/admin" component={Admin} />
          </Switch>
        </Suspense>
        </main>
      </Router>
    </div>
  );
}

export default App;
