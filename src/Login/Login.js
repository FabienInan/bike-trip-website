import { Button, Card, CardActions, CardContent, InputLabel, TextField, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';

import { postLogin } from '../services/loginService';
import { theme } from '../ui-utils/theme';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
    card: {
        width: 300,
        margin: '200px auto',
        padding: theme.spacing(2)
      },
    item: {
        marginBottom: theme.spacing(2),
    },
    cardActions: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  }));

export function Login(props) {

    const classes = useStyles();

    const history = useHistory();

    const [login, setLogin] = useState('');
    const [pwd, setPwd] = useState('');

    const { t } = useTranslation();

    const handleLoginChange = (event) => setLogin(event.target.value);
    const handlePasswordChange = (event) => setPwd(event.target.value);

    const onLogin = () => {
        postLogin(login,pwd).finally(()=> history.push('/'));
    }

    return (
        
        <Card className={classes.card}>
            <CardContent>
                <div className={classes.item}>
                    <InputLabel>{t('login')}</InputLabel>
                    <TextField value={login} onChange={handleLoginChange}/>
                </div>
                <div className={classes.item}>
                    <InputLabel>{t('pwd')}</InputLabel>
                    <TextField value={pwd} onChange={handlePasswordChange}/>
                </div>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button variant="contained" color="primary" onClick={(onLogin)}>{t('save')}</Button>
            </CardActions>
        </Card>
    )
};