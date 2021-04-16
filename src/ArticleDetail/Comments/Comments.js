import { Button, CircularProgress, Divider, IconButton, Paper, Snackbar, TextField, TextareaAutosize, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { deleteComment, getComments, saveComment } from '../../services/commentsService';

import Alert from '@material-ui/lab/Alert';
import { DeleteConfirmationDialog } from '../../ui-utils/DeleteConfirmationDialog/DeleteConfirmationDialog';
import DeleteIcon from '@material-ui/icons/Delete';
import Moment from 'react-moment';
import { getIsAdmin } from '../../services/loginService';
import { getLocale } from '../../services/languageService';
import { theme } from '../../ui-utils/theme';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
  paper: {
    padding: theme.spacing(2),
    margin: `${theme.spacing(4)}px ${theme.spacing(6)}px`,
    [theme.breakpoints.down('xs')]: {
      margin: `${theme.spacing(4)}px ${theme.spacing(2)}px`,
    }
  },
  comment: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(1),
  },
  commentAuthor: {
    fontSize: '13px',
    fontWeight: 'bold',
    marginLeft: theme.spacing(2),
    color: theme.palette.secondary.main
  },
  commentDate: {
    fontSize: '13px',
    fontWeight: 'bold',
    marginLeft: theme.spacing(2),
  },
  commentText: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  deleteCommentButton: {
    display: 'flex',
    justifyContent: 'flex-start',
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`
  },
  newComment: {
    display: 'flex',
    flexDirection: 'column',
  },
  newCommentText: {
    margin: `0 ${theme.spacing(2)}px`,
  },
  newCommentAuthor: {
    margin: `0 ${theme.spacing(2)}px`,
    width: 320,
  },
  newCommentButton: {
    width: 160,
    margin: `${theme.spacing(2)}px`,
  }
}));

export function Comments(props) {

  const { articleId } = props;

  const { t } = useTranslation();

  const locale = getLocale();

  const classes = useStyles();

  const [newComment, setNewComment] = useState('');

  const [newAuthor, setNewAuthor] = useState('');

  const [savingStatus, setSavingStatus] = useState('');

  const [isSaving, setIsSaving] = useState(false);

  const [comments, setComments] = useState([]);

  const [deletingStatus, setDeletingStatus] = useState('');

  const [isAdmin, setIsAdmin] = useState(getIsAdmin());

  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [commentId, setCommentId] = useState('');

  const handleNewCommentChange = (event) => setNewComment(event.target.value);

  const handleNewAuthorChange = (event) => setNewAuthor(event.target.value);

  const handleCloseSnackBar = () => setSavingStatus('');

  useEffect(() => {
    getCommentList()
  }, [savingStatus]);

  const getCommentList = () => {
    getComments(articleId)
      .then(response => setComments(response));
  }

  const onSave = () => {
    saveComment(newComment, newAuthor, articleId).then(response => {
      if (response.error) {
        setSavingStatus('error');
      }
      else {
        setSavingStatus('success');
        setNewComment('');
        setNewAuthor('');
      }
    })
      .catch(() => setSavingStatus('error'))
      .finally(() => setIsSaving(false));
  };

  const handleDeleteComment = () => {
    deleteComment(commentId)
      .then((response) => {
        setOpenConfirmationDialog(false);
        if (response.error) {
          setDeletingStatus('error');
        }
        else {
          setDeletingStatus('success');
          getCommentList();
        }
      })
      .catch(() => setDeletingStatus('error'))
  }

  const handleClickDeleteComment = (id) => {
    setCommentId(id);
    setOpenConfirmationDialog(true);
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={savingStatus !== ''} autoHideDuration={6000} onClose={handleCloseSnackBar}>
        <Alert severity={savingStatus}>
          {savingStatus === 'success' ? t('commentSuccessfullySaved') : t('commentUnSuccessfullySaved')}
        </Alert>
      </Snackbar>
      <DeleteConfirmationDialog openConfirmationDialog={openConfirmationDialog} setOpenConfirmationDialog={setOpenConfirmationDialog} deleteItem={handleDeleteComment}></DeleteConfirmationDialog>
      <Paper elevation={3} className={classes.paper}>
        {(comments || []).map(comment => {
          return (
            <div className={classes.comment}>
              <div>
                <span className={classes.commentAuthor}>{comment.data.author}</span>
                <span className={classes.commentDate}><Moment format="DD MMMM, YYYY" locale={locale} date={comment.data.date}></Moment></span>
              </div>
              <div className={classes.commentText}>{comment.data.comment}</div>
              {isAdmin &&
            <IconButton className={classes.deleteCommentButton} size="medium" color="primary" aria-label="delete" onClick={(e) => { e.stopPropagation(); handleClickDeleteComment(comment._id) }}>
              <DeleteIcon />
            </IconButton>
          }
              <Divider />
            </div>
          );
        })}
        <div className={classes.newComment}>
          <TextField className={classes.newCommentText} value={newComment} multiline="true" label={t('your comment')} onChange={handleNewCommentChange} />
          <TextField className={classes.newCommentAuthor} value={newAuthor} multiline="true" label={t('your name')} onChange={handleNewAuthorChange} />
          <Button disabled={newComment === '' || newAuthor === ''} className={classes.newCommentButton} variant="contained" color="primary" onClick={onSave}>{isSaving ? <CircularProgress className={classes.circularProgress} color="secondary" /> : t('post')}</Button>
        </div>
      </Paper>
    </>
  )
}