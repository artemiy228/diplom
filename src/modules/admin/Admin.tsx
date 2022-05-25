import { useRouter } from "next/router"
import React, { useEffect } from "react"
import toast from "react-hot-toast"
import { useIsAdmin } from '../../lib/db'

export const Admin: React.FC = ({ children }) => {
    const router = useRouter()
    const { isAdmin, isLoading } = useIsAdmin()


    useEffect(() => {
        if (!isAdmin && !isLoading) {
            toast.error("У вас нет прав для посещения этой страницы!")
            router.push('/')
        }
    }, [isAdmin])

    if (isLoading) {
        return <>Loading...</>
    }

    return <>{children}</>
}