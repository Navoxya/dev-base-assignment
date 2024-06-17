
"use client";
import { Spinner } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

interface Toast {
    open: boolean;
    setOpen: (value: boolean) => void;
    msg: string;
}




const Toast = ({ open, setOpen, msg }: Toast) => {

    useEffect(() => {

        if (open) {
            setTimeout(() => {

                setOpen(false);

            }, 4000);
        }



    }, [open])


    return (
        <>
            {
                open &&
                <div className="absolute bottom-10 start-1/2 -translate-x-1/2 z-[999]">
                    <div className="max-w-xs w-[450px] bg-teal-500 text-sm text-white rounded-xl shadow-lg dark:bg-neutral-900" role="alert">
                        <div className="flex p-4">
                            {msg}
                            <div className="ms-auto">
                                <button type="button" className="inline-flex flex-shrink-0 justify-center items-center size-5 rounded-lg text-white hover:text-white opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100"
                                    onClick={() => setOpen(false)}
                                >
                                    <span className="sr-only">Close</span>
                                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M18 6 6 18"></path>
                                        <path d="m6 6 12 12"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>


    );
};

export default Toast;

