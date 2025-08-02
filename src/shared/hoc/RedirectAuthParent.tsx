'use client'

import { useAuth } from "@/entities/stores/useAuth"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

type Props = {
  children: React.ReactNode
}

const RedirectAuthParent: React.FC<Props> = ({ children }) => {
  const { isAuth, roleAuth, user } = useAuth()
  
  const router = useRouter();
  
  console.log('auth-parent')

  useEffect(() => {
    if (isAuth === undefined || !user?.roles?.[0]) return

    if (!isAuth || user.roles[0] !== 'PARENT')
    {
        router.replace('/not-found')
    }
  }, [isAuth, user, roleAuth, router])

  if (isAuth === undefined || !user?.roles?.[0]) return <>...Загрузка</>

  return <>{children}</>
}

export default RedirectAuthParent
