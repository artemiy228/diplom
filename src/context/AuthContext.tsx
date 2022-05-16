import { useRouter } from "next/dist/client/router";
import React, { createContext, useContext, useEffect, useState } from "react";

interface Context {
    username: string
    login: (username: string) => void
    isLoading: boolean
    check: () => void
}

const AuthContext = createContext<Context>({
    username: "",
    login: () => {},
    isLoading: false,
    check: () => {}
})

const KEY = '@quiz/username'

export const AuthProvider: React.FC = ({ children }) => {
    const [username, setUsername] = useState('')
    const [isLoading, setLoading] = useState(false)
    const router = useRouter()

    const check = () => {
        setLoading(true)
        const username = localStorage.getItem(KEY)
        if (username) {
            setUsername(username)
        } else {
            router.push('/auth')
        }
        setLoading(false)
    }

    useEffect(() => {
        check()
    }, []) 

    const onSetUsername = (val: string) => {
        localStorage.setItem(KEY, val)
        setUsername(val)
        router.push('/')
    }


    return <AuthContext.Provider value={{ username, login: onSetUsername, isLoading, check }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)