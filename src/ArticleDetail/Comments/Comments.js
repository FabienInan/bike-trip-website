import { Paper, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';

import { getComments } from '../../services/commentsService';
import { theme } from '../../ui-utils/theme';

const useStyles = makeStyles(() => ({
    paper: {
      padding: theme.spacing(2),
      margin: `${theme.spacing(4)}px ${theme.spacing(6)}px`,
      [theme.breakpoints.down('xs')]: {
        margin: `${theme.spacing(4)}px ${theme.spacing(2)}px`,
      }
    }
  }));

export function Comments(props) {

    const {articleId} = props;

    const classes = useStyles();

    useEffect(() => {
          getComments(articleId)
            .then(response => {
              });
            }, []);
    
    return(
        <Paper elevation={3} className={classes.paper}>

        </Paper>
    )
}