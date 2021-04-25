import { CircularProgress, Snackbar, Typography, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { deleteArticle, getArticles } from '../services/articlesService';

import Alert from '@material-ui/lab/Alert';
import { ArticleCard } from './ArticleCard/ArticleCard';
import { DeleteConfirmationDialog } from '../ui-utils/DeleteConfirmationDialog/DeleteConfirmationDialog';
import { getIsAdmin } from '../services/loginService';
import { getLocale } from '../services/languageService';
import { theme } from '../ui-utils/theme';

const useStyles = makeStyles(() => ({
  cardList: {
    flexWrap: 'wrap',
    paddingTop: theme.spacing(2)
  },
  circularProgressContent: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(4)
  },
  emptyList: {
    textAlign: 'center',
    margin: theme.spacing(4),
  }
}));

export function Home() {

  const [isLoadingArticlesList, setIsLoadingArticlesList] = useState(false);
  const [articlesList, setArticlesList] = useState([]);
  const [isAdmin, setIsAdmin] = useState(getIsAdmin());
  const [deletingStatus, setDeletingStatus] = useState('');

  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [articleId, setArticleId] = useState('');

  const classes = useStyles();

  useEffect(() => {
    getArticlesList();
  }, []);

  const getArticlesList = () => {
    setIsLoadingArticlesList(true);
    getArticles()
      .then(response => {
        setArticlesList(response.filter(article => Object.keys(article.data[getLocale()]).length !== 0));
      })
      .finally(() => setIsLoadingArticlesList(false));
  }

  const handleDeleteArticle = () => {
    deleteArticle(articleId)
      .then((response) => {
        setOpenConfirmationDialog(false);
        if (response.error) {
          setDeletingStatus('error');
        }
        else {
          setDeletingStatus('success');
          getArticlesList();
        }
      })
      .catch(() => setDeletingStatus('error'))
  }

  const handleClickDeleteArticle = (id) => {
    setArticleId(id);
    setOpenConfirmationDialog(true);
  }
  const handleCloseSnackBar = () => setDeletingStatus('');

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={deletingStatus !== ''} autoHideDuration={6000} onClose={handleCloseSnackBar}>
        <Alert severity={deletingStatus}>
          {deletingStatus === 'success' ? 'The article has been deleted successfully' : 'Due to an error, the article has not been deleted'}
        </Alert>
      </Snackbar>
      <DeleteConfirmationDialog openConfirmationDialog={openConfirmationDialog} setOpenConfirmationDialog={setOpenConfirmationDialog} deleteItem={handleDeleteArticle}></DeleteConfirmationDialog>
      {isLoadingArticlesList ? 
        <div className={classes.circularProgressContent}>
          <CircularProgress color="secondary" />
        </div> :
        (articlesList.length > 0 ?
          <div className={classes.cardList}>
            {articlesList.map((article) => {
              return (
                  <ArticleCard article={article} isAdmin={isAdmin} handleClickDeleteArticle={handleClickDeleteArticle}></ArticleCard>
              )
            })
            }
          </div> :
          <Typography className={classes.emptyList} variant="subtitle1">
            No posts to show yet
          </Typography>
        )
      }
    </div>
  );
}