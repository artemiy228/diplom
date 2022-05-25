import { useRouter } from "next/router"
import React, { useEffect } from "react"
import toast from "react-hot-toast"
import { useIsAdmin } from '../../lib/db'

export const Admin: React.FC = ({ children }) => {
    const router = useRouter()
    const isAdmin = useIsAdmin()

    useEffect(() => {
        if (!isAdmin) {
            toast.error("У вас нет прав для посещения этой страницы!")
            router.push('/')
        }
    }, [isAdmin])

    return <>{children}</>
}