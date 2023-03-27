import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { DiaryLayout } from '../layout/DiaryLayout';
import { NoteView, NothingSelectedView } from '../views';
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/diary/thunks';

export const DiaryPage = () => {

  const dispatch = useDispatch();

  const onClickNewNote = () => {
    dispatch(startNewNote());
  }

  const { isSaving, active } = useSelector(state => state.diary)


  return (
    <DiaryLayout>

      {
        (!!active) 
        ? <NoteView />
        : <NothingSelectedView />
      }


      <IconButton
        onClick={onClickNewNote}
        size='large'
        disabled={isSaving}
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50,
        }
        }
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>

    </DiaryLayout>
  )
}
