import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography, useFormControl } from '@mui/material';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { ImageGallery } from '../components'
import { useForm } from '../../hooks/useForm';
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/diary';


export const NoteView = () => {

    const dispatch = useDispatch();

    const { active: note, messageSaved, isSaving } = useSelector(state => state.diary);
   
    // active es la nota activa del store, se pasa el nombre a note
    const { body, title, date, onInputChange, formState } = useForm(note);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date])

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState])

    const onSaveNote = () => {
        dispatch(startSaveNote());
    }

    const onFileInputChange = ({ target }) => {
        
        if( target.files === 0 ) return; 
        
        dispatch( startUploadingFiles( target.files ) );
    }

    useEffect(() => { // despliega la nota
        if (messageSaved.length > 0) {
            Swal.fire({
                title: 'Nota actualizada',
                text: messageSaved,
                icon: 'success',
                timer: 2000, // Agrega esta propiedad para que se cierre automáticamente después de 2 segundos
                timerProgressBar: true, // Agrega esta propiedad para mostrar una barra de progreso
            });
        }
    }, [messageSaved])

    const onDelete = () => {
        dispatch( startDeletingNote() );
    }

    return (
        <Grid container
            className='animate__animated animate__fadeIn animate__faster'
            direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight='light' > {dateString} </Typography>
            </Grid>

            <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={onFileInputChange}
                style={{ display: 'none' }} 
            />

            <IconButton
                color="primary"
                disabled={isSaving}
                onClick={() => fileInputRef.current.click()}
                style={{ marginLeft: 'auto' }}
            >
                <UploadOutlined sx={{ fontSize: 35 }} />
            </IconButton>


            <Grid item>
                <Button
                    disabled={isSaving}
                    onClick={onSaveNote}
                    color="primary"
                    sx={{ padding: 2 }}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un título"
                    label="Título"
                    sx={{ border: 'none', mb: 1 }}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedió en el día de hoy?"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            <Grid container justifyContent='end'>
                <Button
                    onClick={ onDelete }
                    sx={{ mt: 2 }}
                    color="error"
                >
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>

            <ImageGallery images={ note.imageUrls } />

        </Grid>
    )
}
