import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth', // este es el nombre que se usa en el use selector
    initialState: {
        status: 'checking', // se inicia en checking para comprobar si estoy autenticado y de mientras  mostrar el componente ChekingAuth
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null,
    },
    reducers: {
        login: ( state, { payload } ) => {
            state.status = 'authenticated', // 'checking', 'not-authenticated', 'authenticated'
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;
        },
        logout: ( state, { payload } ) => {
            state.status = 'not-authenticated', 
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = payload?.errorMessage; // solo busca el error message si viene en el payload (no siempre se manda)
        },
        checkingCredentials: (state) => {
            state.status = 'checking';
        }
    }
});


export const { login, logout, checkingCredentials } = authSlice.actions;