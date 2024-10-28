import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";
import { useRouter } from "next/router";
import background from "@/public/add-link-back.jpg";
import { toast } from "react-toastify";
import { API_BASE_URL } from "@/utils";
import Link from "next/link";

const AuthViewer = () => {

    const router = useRouter();
    const { isAuthenticated,userData } = useAppSelector((state) => state.auth);
    const [icon, setIcon] = useState<File | null>(null);
    const [title, setTitle] = useState<string>("");
    const [link, setLink] = useState<string>("");
    const [lists, setLists] = useState<any[]>([]);

    useEffect(() => {
        if (!isAuthenticated) router.push('/auth/signin');
        else {
            const fetchLists = async () => {
                await fetch(`${API_BASE_URL}/api/lists`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(res => res.json())
                    .then(data => setLists(data))
                    .catch(err => console.log(err));
            }
            fetchLists();
        }
    }, [isAuthenticated]);

    const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIcon(file);
        }
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        if (icon) formData.append('file', icon);
        formData.append('title', title);
        formData.append('link', link);

        try {
            const response = await fetch(`${API_BASE_URL}/api/lists`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setLists(data);
            toast.success('List added successfully');
        } catch (error) {
            toast.error('Something went wrong');
            console.log(error);
        }

    };

    return (
        <div className="flex lg:flex-row flex-wrap w-full h-full">
            <div className="flex lg:flex-col md:w-2/5 flex-col w-full md:h-[100vh] bg-[#e5e7eb] border-r border-slate-200 rounded-r-xl items-center">
                <div className="text-xl font-bold p-4 justify-center items-center">Lists</div>
                {lists.map((list, index) => (
                    <div key={index} className="flex flex-row w-full h-10 mt-5 justify-center items-center border-b border-[#d1d5db] border-solid">
                        <div className="w-1/5 h-full flex justify-center items-center">
                            {index + 1}.
                        </div>
                        <div className="w-1/5 h-full ">
                            {list.title}
                        </div>
                        <div className="w-2/5 h-full">
                            <img src={`${API_BASE_URL}/uploads/${list.icon}`} alt={list.title} className="w-[50px] h-full object-cover" />
                        </div>
                        <div className="w-2/5 h-full ">
                            <p onClick={() => router.push(`/${list.link}`)} className="text-blue-500 cursor-pointer">{list.link}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex lg:flex-col md:w-3/5 flex-col w-full md:h-[100vh] bg-blue-500 justify-center items-center">
                <div className="relative flex flex-col md:w-[auto] w-full rounded-xl bg-white justify-center items-center bg-[#a1d1d1] p-5 ">
                    <h4 className="block text-xl font-medium text-slate-800">
                        ADD LIST
                    </h4>

                    <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                        <div className="mb-1 flex flex-col gap-6">
                            <div className="w-full max-w-sm min-w-[200px]">
                                <label className="block mb-2 text-sm text-slate-600" htmlFor="title">
                                    Title
                                </label>
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    type="text"
                                    id="title"
                                    name="title"
                                    required
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                    placeholder="Title"
                                />
                            </div>
                            <div className="w-full max-w-sm min-w-[200px]">
                                <label className="block mb-2 text-sm text-slate-600" htmlFor="icon">
                                    Icon
                                </label>
                                <input type="file" onChange={handleIconChange} id="icon" name="icon" required className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Icon" />
                            </div>
                            <div className="w-full max-w-sm min-w-[200px]">
                                <label className="block mb-2 text-sm text-slate-600" htmlFor="link">
                                    Link
                                </label>
                                <input type="text" id="link" value={link} onChange={(e) => setLink(e.target.value)} name="link" required className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Link" />
                            </div>
                        </div>
                        <button
                            className="mt-4 w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="submit">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default AuthViewer;
