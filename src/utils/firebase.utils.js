import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

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

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
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
                createdAt
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