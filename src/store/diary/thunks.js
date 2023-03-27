import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, setActiveNote } from '.';
import { deleteNoteById, savingNewNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './diarySlice';
import { fileUpload, loadNotes } from '../../helpers';

export const startNewNote = () => {

    return async( dispatch, getState ) => {

        dispatch( savingNewNote() )

        const { uid } = getState().auth;  
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: []
        }
        // referencia donde se guarda el documento creando a la vez un nuevo nodo:
        const newDoc = doc( collection( FirebaseDB, `${ uid }/diary/notes`) );
        await setDoc( newDoc, newNote );

        newNote.id = newDoc.id; 
        
        dispatch( addNewEmptyNote( newNote ) )
        dispatch( setActiveNote( newNote ))
    }
}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {
        
        const { uid } = getState().auth;
        if ( !uid ) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ));
    }
}

export const startSaveNote = () => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active:note } = getState().diary;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id; // se elimina la propiedad con delete de js
    
        const docRef = doc( FirebaseDB, `${ uid }/diary/notes/${ note.id }` );
        await setDoc( docRef, noteToFireStore, { merge: true }); 

        dispatch( updateNote( note ) );

    }
}

export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch ) => {
        dispatch( setSaving() );
            
        const fileUploadPromises = [];
        for ( const file of files ) {
            fileUploadPromises.push( fileUpload( file ) )
        } // se crea asi para que todas las promesas se ejecuten a la vez

        const photosUrls = await Promise.all( fileUploadPromises );
        
        dispatch( setPhotosToActiveNote( photosUrls ));
        
    }
}

export const startDeletingNote = () => {
    return async( dispatch, getState) => {

        const { uid } = getState().auth;
        const { active: note } = getState().diary;

        const docRef = doc( FirebaseDB, `${ uid }/diary/notes/${ note.id }`);
        await deleteDoc( docRef );

        dispatch( deleteNoteById(note.id) );

    }
}
