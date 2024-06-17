
"use client";
import { Spinner } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

interface LoadingSpinner {
    open: boolean;
    setOpen?: (value: boolean) => void;
}

const LoadingSpinner = ({ open, setOpen }: LoadingSpinner) => {


    return (
        <div className="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50">
            <div className="flex bg-white h-full w-full items-center justify-center">

                <Spinner className="h-10 w-10" />

            </div>
        </div>
    );
};

export default LoadingSpinner;

