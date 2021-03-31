import { CircularProgress, Divider, Paper, Typography, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from 'react';

import { Comments } from "./Comments/Comments";
import { Fade } from "./Fade/Fade";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";
import { getArticles } from "../services/articlesService";
import { getLocale } from "../services/languageService";
import { getPostImages } from "../services/instagramService";
import { theme } from "../ui-utils/theme";

const useStyles = makeStyles(() => ({
  paper: {
    padding: theme.spacing(2),
    margin: `${theme.spacing(4)}px ${theme.spacing(6)}px`,
    [theme.breakpoints.down('xs')]: {
      margin: `${theme.spacing(4)}px ${theme.spacing(2)}px`,
    }
  },
  title: {
    textAlign: 'center',
    margin: theme.spacing(2)
  },
  divider: {
    margin: 'auto',
    width: 200
  },
  date: {
    textAlign: 'center',
    margin: theme.spacing(1)
  },
  content: {
    margin: theme.spacing(4),
  },
  circularProgressContent: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(4)
  },
}));

export function ArticleDetail(props) {

  const classes = useStyles();

  const locale = getLocale();

  const [article, setArticle] = useState({});

  const [isLoadingDetail, setIsLoadingDetail] = useState(true);

  useEffect(() => {
    if (props.location.state) {
      setArticle(props.location.state && props.location.state.data);
      setIsLoadingDetail(false);
    }
    else {
      getArticles()
        .then(response => {
          const dataArticle = response.find(item => item.id === props.location.id);
          if (dataArticle.data[locale].instagramId !== '') {
            getPostImages(dataArticle.data[locale].instagramId)
            .then((response) => {
              dataArticle.data[locale].urls = response;
              setArticle(dataArticle);
              setIsLoadingDetail(false);
            })
          }
        });
    }
  }, []);

  return (
    <>
      {isLoadingDetail ?
        <div className={classes.circularProgressContent}>
          <CircularProgress color="secondary" />
        </div> :
        <div>
        <Paper elevation={3} className={classes.paper}>
            <Typography variant="h5" component="h2" className={classes.title}>
              {article.data[locale] && article.data[locale].title}
            </Typography>
            <Divider light className={classes.divider} />
            <Typography variant="body1" component="h2" className={classes.date}>
              <Moment format="DD MMMM, YYYY" locale={locale} date={article.date}></Moment>
            </Typography>
            <Fade urlArray={article.data[locale].urls ||[]}></Fade>
            <Typography variant="body1" component="h2" className={classes.content}>
              <ReactMarkdown>{article.data[locale] && article.data[locale].content}</ReactMarkdown>
            </Typography>
        </Paper>
        <Comments articleId={article.__id}></Comments>
        </div>
      }
    </>
  );
}