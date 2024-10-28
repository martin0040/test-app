import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store, useAppSelector } from "@/store/store";
import Navbar from '../components/Navbar';
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/utils";
import { getAuthToken } from "@/utils/auth";
import { setUserData } from "@/store/reducers";
import { toast } from "nextjs-toast-notify";
import { useRouter } from "next/router";

let flag = false;
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    
    const checkAuth = async () => {
      {
        flag = true;
        const token = getAuthToken();
        if (token) {
          const res = await fetch(`${API_BASE_URL}/refresh`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token })
          });

          const result = await res.json();
          if (result.userData) {
            toast.success(`You have successfully signed in.`, {
                duration: 4000,
                progress: true,
                position: "top-right",
                transition: "bounceIn",
                icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>',
                sonido: true,
            });
            store.dispatch(setUserData(result.userData));
          } else {
            toast.error(result.error, {
                duration: 4000,
                progress: true,
                position: "top-right",
                transition: "bounceIn",
                sonido: true,
            });
            router.push('/auth/signin');
          }
        }
      }
    }
    if (!store.getState().auth.isAuthenticated && !flag) checkAuth();
  }, [store]);

  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  );
}
