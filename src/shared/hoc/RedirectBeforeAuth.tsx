'use client'

import { useAuth } from "@/entities/stores/useAuth"
import { useRouter } from "next/navigation";
import React, { useEffect } from "react"
    import Cookies from 'js-cookie'

type Props = {
    children: React.ReactNode,
}

const RedirectBeforeAuth:React.FC<Props> = ({children}) => {
    const { isAuth, roleAuth, user } = useAuth();

    const router = useRouter();

    console.log('auth')

    useEffect(() => {
        if (isAuth && user !== null && user.roles[0] === 'PARENT') {
            console.log('parent')
            if (user.parentProfile.subscribe) {
                const expiresAt = new Date(user.parentProfile.subscribe.expiresAt);
                const now = new Date();

                if (now >= expiresAt) {
                    console.log('Дата просрочена');
                } else {
                    console.log('Подписка не истекла')
                    router.replace('/profile-parent/vacancy');
                }
            }
        }

        // if (isAuth && role !== undefined && role === 'NANNY') {
            
        // }

    }, [isAuth, roleAuth, router, user]);
    
    return (<>{children}</>)
}

export default RedirectBeforeAuth