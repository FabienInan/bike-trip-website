import { Card, CardContent, Typography, makeStyles } from "@material-ui/core";

import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import stravaLogo from '../assets/strava.png';
import { theme } from "../ui-utils/theme";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
    twitterFeed: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing(4),
    },
    twitterFeedTitle: {
        textAlign: 'center',
        marginBottom: theme.spacing(2)
    },
    moreDetails: {
        marginTop: theme.spacing(2),
    },
    stravaLogo: {
        width: theme.spacing(4),
        marginLeft: theme.spacing(1),
        verticalAlign: 'middle'
    }
}));

export function TwitterFeed() {
    const classes = useStyles();

    const { t } = useTranslation();

    return (
        <div className={classes.twitterFeed}>
            <Card>
                <CardContent>
                    <Typography className={classes.twitterFeedTitle} variant="h5">
                        {t('gpsPositionsHistory')}
                    </Typography>
                    <div className="selfCenter" style={{ maxWidth: 360, height: 415, marginTop: theme.spacing(2), tweetLimit: 3 }}>
                        <TwitterTimelineEmbed
                            sourceType="profile"
                            screenName="FabienInan"
                            noHeader
                            noFooter
                            noBorders
                        />
                    </div>
                </CardContent>
            </Card>
            <Typography className={classes.moreDetails} variant="body">
                {t('moreDetailsOnMyRoute')}
                <a rel="noreferrer" target="_blank" href="https://www.strava.com/athletes/28004502">
                    <img className={classes.stravaLogo} src={stravaLogo} alt="strava logo"></img>
                </a>
            </Typography>
        </div>
    );
}