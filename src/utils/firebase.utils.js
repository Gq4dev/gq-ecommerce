import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth'

import { getFirestore, doc, getDoc, setDoc, Firestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDekUwDLtTuihTVuZeRvbp3Cq-bjTp2qj8",
    authDomain: "gq--ecommerce.firebaseapp.com",
    projectId: "gq--ecommerce",
    storageBucket: "gq--ecommerce.appspot.com",
    messagingSenderId: "638294635286",
    appId: "1:638294635286:web:ac6f6f5102cedc96a51637"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleprovider = new GoogleAuthProvider()

googleprovider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleprovider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleprovider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation) => {

    if (!userAuth) return

    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef)

    //if user data not exists
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef
    //if user data exists

    //if user data not exists


    // return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return

    return await createUserWithEmailAndPassword(auth, email, password)
}