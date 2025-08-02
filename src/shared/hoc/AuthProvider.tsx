'use client'

import { useEffect, useState } from "react";
import { getMe } from "../api/authApi";
import { useAuth } from "@/entities/stores/useAuth";
import { setRoleCookies } from "@/features/setRoleCookie";
import { useRouter } from "next/navigation";


type Props = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<Props> = ({ children }) => {
  const setAuth = useAuth(state => state.setAuth);
  const setPhone = useAuth(state => state.setPhone);
  const setRole = useAuth(state => state.setRole);
  const setUser = useAuth(state => state.setUser);
  const {isAuth} = useAuth();

  const router = useRouter();

  useEffect(() => {
    const initMe = async () => {
      try {
        const user = await getMe();

        setRole(user.roles?.[0]);
        setRoleCookies('role', user.roles?.[0])
        setPhone(user.phone || '');
        setAuth(true);
        setUser(user);
        
        if (user.nannyProfile) {
          if (user.nannyProfile.isValidated !== true) {
              router.replace('/about-you/response/')
          }
        }

        if (user.parentProfile) {
          // if (user.nannyProfile.isValidated !== true) {
            // console.log(user)
              // router.replace('/about-you/response/')
          // }
        }

        // else {
            
        // }
      } catch (error) {
        console.log(error)
        setAuth(false);
      } finally {
        // setInitialized(true);
      }
    };

    initMe();
  }, [setAuth, setPhone, setRole, setUser]);

//   if (!initialized) return null;

  return <>{children}</>;
};

export default AuthProvider;
