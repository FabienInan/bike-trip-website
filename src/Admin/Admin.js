import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { Button, CircularProgress, InputLabel, MenuItem, Select, Snackbar, TextField, makeStyles } from "@material-ui/core";
import { EditorState, convertToRaw } from 'draft-js';
import React, { useState } from 'react';

import Alert from "@material-ui/lab/Alert";
import { Editor } from 'react-draft-wysiwyg';
import draftToMarkdown from 'draftjs-to-markdown';
import { saveArticle } from "../services/articlesService";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
    container: {
        margin: theme.spacing(2),
    },
    item: {
        marginBottom: theme.spacing(2),
    },
    circularProgress: {
        height: '20px !important',
        width: '20px !important'
    },
    contentWrapper: {
        minHeight: '300px',
        marginBottom: theme.spacing(2),
        border: '1px solid #F1F1F1'
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
}));


export function Admin() {

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [articleLanguage, setArticleLanguage] = useState('fr');
    const [title, setTitle] = useState('');
    const [instagramId, setInstagramId] = useState('');

    const [isSaving, setIsSaving] = useState(false);
    const [savingStatus, setSavingStatus] = useState('');
    const classes = useStyles();

    const { t } = useTranslation();

    const handleSelectChange = (event) => setArticleLanguage(event.target.value);
    const handleTitleChange = (event) => setTitle(event.target.value);
    const handleInstagramIdChange = (event) => setInstagramId(event.target.value);

    const onSave = () => {
        const content = draftToMarkdown(convertToRaw(editorState.getCurrentContent()));
        setIsSaving(true);
        saveArticle(title, instagramId, content, articleLanguage)
            .then((response) => {
                if (response.error){
                    setSavingStatus('error');
                }
                else setSavingStatus('success');
            })
            .catch(() => setSavingStatus('error'))
            .finally(() => setIsSaving(false));
    }

    const handleCloseSnackBar = () => setSavingStatus('');

    return (
        <div className={classes.container}>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={savingStatus !== ''} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                <Alert severity={savingStatus}>
                    {savingStatus === 'success' ? t('articleSuccessfullySaved') : t('articleUnSuccessfullySaved')}
                </Alert>
            </Snackbar>
            <div className={classes.item}>
                <InputLabel>{t('language')}</InputLabel>
                <Select
                    value={articleLanguage}
                    onChange={handleSelectChange}
                >
                    <MenuItem value={'fr'}>{t('french')}</MenuItem>
                    <MenuItem value={'en'}>{t('english')}</MenuItem>
                </Select>
            </div>
            <div className={classes.item}>
                <InputLabel>{t('title')}</InputLabel>
                <TextField value={title} onChange={handleTitleChange}/>
            </div>
            <div className={classes.item}>
                <InputLabel>{t('instagramId')}</InputLabel>
                <TextField value={instagramId} onChange={handleInstagramIdChange}/>
            </div>
            <Editor
                editorState={editorState}
                wrapperClassName={classes.editorWrapper}
                editorClassName={classes.contentWrapper}
                onEditorStateChange={setEditorState}
            />
            <div className={classes.buttonContainer} >
                <Button variant="contained" color="primary" onClick={onSave}>{isSaving ? <CircularProgress className={classes.circularProgress} color="secondary" /> : t('save')}</Button>
            </div>
        </div>
    );
}