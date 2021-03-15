import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, makeStyles } from "@material-ui/core";

import React from 'react';
import ReactMarkdown from "react-markdown";
import alberta from '../../assets/alberta.jpeg';
import { defaultLanguage } from "../../ui-utils/constants";
import { theme } from "../../ui-utils/theme";

const useStyles = makeStyles(() => ({
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  card: {
    margin: '16px',
    width: 400,
    [theme.breakpoints.down('xs')]: {
      width: 312,
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

  const classes = useStyles();

  const {article, isAdmin, handleClickDeleteArticle} = props;

  const length = article.data[defaultLanguage].content.length < 100 ? article.data[defaultLanguage].content.length : 100;
  const textContentOverview = article.data[defaultLanguage].content.substr(0, length);

  return (
    <>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={alberta}
            title="Alberta"
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {article.data[defaultLanguage].title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <ReactMarkdown>{textContentOverview}</ReactMarkdown>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" onClick={() => handleClickDeleteArticle(article._id)}>
            Share
          </Button>
          {isAdmin &&
            <Button size="small" color="primary" onClick={() => handleClickDeleteArticle(article._id)}>
              Delete
            </Button>
          }
        </CardActions>
      </Card>
    </>
  );
}