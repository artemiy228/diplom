import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { ADMIN_EMAIL, firebaseConfig } from "../constants/firebaseConfig";
import { getAuth } from "firebase/auth";
import { useMemo } from "react";


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const useAuth = () => useMemo(() => getAuth(app), [])
export const useFirestore = () => getFirestore(app)
export const useIsAdmin = () => {
    const auth = useAuth()
    return auth.currentUser?.email === ADMIN_EMAIL
}