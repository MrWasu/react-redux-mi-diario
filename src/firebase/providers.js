import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { FirebaseAuth } from './config';

// Todas las funciones importadas desde Firebase de la autentificación del usuario: 

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async() => { 

    try {  
        const result = await signInWithPopup(FirebaseAuth, googleProvider );
        const credentials = GoogleAuthProvider.credentialFromResult( result );

        const { displayName, email, photoURL, uid } = result.user;
        
        return {
            ok: true,
            // User info
            displayName, email, photoURL, uid
        }    
    } catch (error) {

        console.log(error)
        const errorCode = error.code;
        const errorMessage = error.message;
    
        return {
            ok: false,
            errorMessage,
        } 
    }
}

export const registerUserWithEmailPassword = async({ email, password, displayName }) => {

    console.log(23)
    try {
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password ); 
        // funcion propia de firebase
        const { uid, photoURL } = resp.user;

        await updateProfile( FirebaseAuth.currentUser, { displayName }); 
        // funcion propia de firebase 

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {
        console.log(error);
        return { ok: false, errorMessage: error.message }
    }
}

export const loginWithEmailPassword = async({ email, password }) => {

    try {
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        // funcion propia de firebase
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            uid, photoURL, displayName
        }

    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}