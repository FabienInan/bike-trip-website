import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { Button, CircularProgress, Snackbar, makeStyles } from "@material-ui/core";
import { EditorState, convertToRaw } from 'draft-js';
import React, { useState } from 'react';

import Alert from "@material-ui/lab/Alert";
import { Editor } from 'react-draft-wysiwyg';
import draftToMarkdown from 'draftjs-to-markdown';
import { saveArticle } from "../services/articlesService";

const useStyles = makeStyles((theme) => ({
    editorWrapper: {
    },
    circularProgress: {
        height: '20px !important',
        width: '20px !important'
    },
    contentWrapper: {
        minHeight: '300px',
        marginBottom: '16px',
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

    const [isSaving, setIsSaving] = useState(false);
    const [savingStatus, setSavingStatus] = useState('');

    const classes = useStyles();

    const onSave = () => {
        const content = draftToMarkdown(convertToRaw(editorState.getCurrentContent()));
        setIsSaving(true);
        saveArticle(content)
            .then(() => setSavingStatus('success'))
            .catch(() => setSavingStatus('error'))
            .finally(() => setIsSaving(false));
    }

    const handleCloseSnackBar = () => setSavingStatus('');
    
    return (
        <div>
            <Snackbar 
                anchorOrigin={ {vertical: 'top', horizontal: 'center'} } 
                open={savingStatus !== ''} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                <Alert severity={savingStatus}>
                    {savingStatus === 'success' ? 'The article has been saved successfully' : 'Due to an error, the article has not been saved'}
                </Alert>
            </Snackbar>
            <Editor
                editorState={editorState}
                wrapperClassName={classes.editorWrapper}
                editorClassName={classes.contentWrapper}
                onEditorStateChange={setEditorState}
            />
            <div className={classes.buttonContainer} >
                <Button variant="contained" color="primary" onClick={onSave}>{isSaving ? <CircularProgress className={classes.circularProgress} color="secondary" />: 'Save'}</Button>
            </div>
        </div>
    );
}