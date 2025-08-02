'use client'

import { useAuth } from "@/entities/stores/useAuth"
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react"

type Props = {
    children: React.ReactNode,
}

const RedirectAuthBabysitter:React.FC<Props> = ({children}) => {
  const { isAuth, roleAuth, user } = useAuth()
  const router = useRouter();

    console.log('auth-baby')

    useEffect(() => {

        if (!isAuth || user.roles[0] !== 'NANNY') {
            router.replace('/not-found');
        }

        if (user?.nannyProfile?.isValidated !== undefined && user?.nannyProfile?.isValidated !== null) {
            if (user.nannyProfile.isValidated !== true) {
            router.replace('/about-you/response/');
            }
        }
    }, [isAuth, roleAuth, router, user]);
    
    if (isAuth === undefined || !user?.roles?.[0]) return <>...Загрузка</>

    return <>{children}</>
}

export default RedirectAuthBabysitter