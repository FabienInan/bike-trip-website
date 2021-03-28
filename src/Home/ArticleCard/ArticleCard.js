import { Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Typography, makeStyles } from "@material-ui/core";
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import React, { useEffect, useState } from 'react';

import DeleteIcon from '@material-ui/icons/Delete';
import ReactMarkdown from "react-markdown";
import { getLocale } from "../../services/languageService";
import { getPostImages } from "../../services/instagramService";
import { theme } from "../../ui-utils/theme";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  card: {
    margin: theme.spacing(2),
    width: 432,
    [theme.breakpoints.down('xs')]: {
      width: 'auto',
    }
  },
  cardContent: {
    height: 120,
  },
  media: {
    height: 280,
    [theme.breakpoints.down('xs')]: {
      height: 240,
    }
  },
}));

export function ArticleCard(props) {

  const history = useHistory();

  const classes = useStyles();

  const { article, isAdmin, handleClickDeleteArticle } = props;

  const [urlArray, setUrlArray] = useState([]);

  const locale = getLocale();

  const length = article.data[locale].content && article.data[locale].content.length < 100 ? article.data[locale].content.length : 100;
  const textContentOverview = article.data[locale].content && article.data[locale].content.substr(0, length);

  useEffect(() => getPostImages(article.data[locale].instagramId)
    .then((response) => {
      setUrlArray(response || []);
      article.data[locale].urls = response;
    }), []);

  const goToArticleDetail = () => history.push(`article/${article._id}`, { data: article })

  return (
    <>
      <Card className={classes.card} onClick={() => goToArticleDetail()}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={urlArray.length > 0  && urlArray[0]}
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h5">
              {article.data[locale].title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <ReactMarkdown>{textContentOverview}</ReactMarkdown>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActions}>
          <FacebookShareButton onClick={(e) => { e.stopPropagation();}} url={`localhost:3000/article/${article._id}`}>
              <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <WhatsappShareButton onClick={(e) => { e.stopPropagation();}} url={`localhost:3000/article/${article._id}`}>
            <WhatsappIcon size={32} round={true}/>
          </WhatsappShareButton>
          <TwitterShareButton onClick={(e) => { e.stopPropagation();}} url={`localhost:3000/article/${article._id}`}>
            <TwitterIcon size={32} round={true}/>
          </TwitterShareButton>
          {isAdmin &&
              <IconButton size="medium" color="secondary" aria-label="delete" onClick={(e) => { e.stopPropagation(); handleClickDeleteArticle(article._id)}}>
                <DeleteIcon />
              </IconButton>
          }
        </CardActions>
      </Card>
    </>
  );
}