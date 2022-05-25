import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../constants/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useMemo, useState } from "react";


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const useAuth = () => useMemo(() => getAuth(app), [])
export const useFirestore = () => getFirestore(app)
export const useIsAdmin = () => {
    const auth = useAuth()
    const firestore = useFirestore()
    const [isAdmin, setIsAdmin] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const observer = onAuthStateChanged(auth, () => {
            try {
                getDoc(doc(firestore, "admins", auth.currentUser?.uid as string)).then(res => {
                    if (res.exists()) setIsAdmin(true)
                }).finally(() => {
                    setIsLoading(false)
                })
            } catch {
                
            }
        })
        return () => observer()
    }, [])

    return { isAdmin, isLoading } // auth.currentUser?.email === ADMIN_EMAIL
}