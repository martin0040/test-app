import { toast } from "nextjs-toast-notify";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { setUserData } from "@/store/reducers/index";
import { useAppDispatch } from "@/store/store";
import Link from 'next/link';
import { API_BASE_URL } from '@/utils/index';
import { useAppSelector } from '@/store/store';

const toastConfig = {
  duration: 4000,
  progress: true,
  position: "top-right" as const,  // Add type assertion
  transition: "bounceIn",
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>',
  sonido: true,
} as const;

export default function SignIn() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated]);

  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData(e.target as HTMLFormElement);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.get('email'),
          password: data.get('password'),
        })
      })
      const result = await response.json();
      if (result.user) {
        // Set the token in the auth utility
        toast.success(`You have successfully signed in.`, toastConfig)
        dispatch(setUserData(result.setUserData));
        localStorage.setItem('userData', JSON.stringify(result.user));
        router.push('/dashboard');
        setIsLoading(false);
      }else {
        toast.error(result.error || 'An error occurred during sign in', toastConfig)
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.name || 'An error occurred during sign in', toastConfig)
      setIsLoading(false);
    }
  }


  return (
    <>
      <div className="flex min-h-full flex-1 w-full flex-col justify-center items-center px-6 py-12 lg:px-8">
        <div className="relative flex sm:w-full sm:max-w-sm flex-col bg-white shadow-sm border border-slate-200 lg:w-96 rounded-lg my-6">
          <div className="relative m-2.5 items-center flex justify-center text-white h-24 rounded-md bg-slate-800">
            <h3 className="text-2xl">
              Sign In
            </h3>
          </div>
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm  gap-3 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="w-full max-w-sm min-w-[200px]">
                <label className="block mb-2 text-sm text-slate-600">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="abc@gmail.com"
                  autoComplete="email"
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                />
              </div>

              <div className="w-full max-w-sm min-w-[200px]">
                <label className="block mb-2 text-sm text-slate-600">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                  required
                  autoComplete="current-password"
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" />
              </div>

              <div className="inline-flex items-center mt-2">
                <label className="flex items-center cursor-pointer relative" htmlFor="check-2">
                  <input type="checkbox" className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800" id="check-2" />
                  <span className="absolute text-white opacity-0 pointer-events-none peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </span>
                </label>
                <label className="cursor-pointer ml-2 text-slate-600 text-sm" htmlFor="check-2">
                  Remember Me
                </label>
              </div>
              <div className="p-6 pt-0">
                {
                  isLoading ?
                    <button disabled={isLoading} className="w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none text-[20px]" type="submit">
                      Signing in...
                    </button> :
                    <button className="w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none text-[20px]" type="submit">
                      Sign In
                    </button>
                }

                <p className="flex justify-center mt-6 text-sm text-slate-600">
                  Don&apos;t have an account?
                  <Link href="/auth/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Create an account
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div >
    </>
  )
}
