"use client";
import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
} from "@material-tailwind/react";

import React, { useEffect, useState } from "react";

import { AddBook } from "@/app/services/Post"
import Toast from "../Toast";


//props interface
interface dataFormProps {
    setOpen: (value: boolean) => void;
    open: boolean
}

export default function BookForm({ open, setOpen }: dataFormProps) {

    const [title, settitle] = useState<string>("");
    const [author, setauthor] = useState<string>("")
    const [publisher, setpublisher] = useState<string>("")
    const [pages, setpages] = useState<string>("")

    const [errtitle, seterrtitle] = useState<boolean>(false);
    const [errauthor, seterrauthor] = useState<boolean>(false);
    const [errpublisher, seterrpublisher] = useState<boolean>(false);
    const [errpages, seterrpages] = useState<boolean>(false);

    const [msg, setmsg] = useState<string>("");
    const [openToast, setopenToast] = useState<boolean>(false);

    //handling states when open close modal
    useEffect(() => {

        settitle("");
        setauthor("");
        setpublisher("");
        setpages("");

        seterrtitle(false);
        seterrauthor(false);
        seterrpublisher(false);
        seterrpages(false);


    }, [open])


    //save book function
    const saveBook = (e: { preventDefault: () => void; }) => {

        e.preventDefault()

        //form validations
        if (!title) {
            seterrtitle(true);
        }

        if (!author) {
            seterrauthor(true);
        }

        if (!publisher) {
            seterrpublisher(true);
        }

        if (!pages) {
            seterrpages(true);
        }

        let obj = {
            title: title,
            author: author,
            publisher: publisher,
            pages: pages
        }

        console.log(">>obj", obj)


        if (
            title &&
            author &&
            publisher &&
            pages
        ) {

            //add books api call
            AddBook(obj)
                .then((res) => {
                    console.log("res>>>", res);
                    setOpen(false);

                    setmsg("Book successfully added")
                    setopenToast(true);

                })
                .catch((error) => {
                    console.log("Error", error);


                });

        }




    }


    return (
        <>

            {/* Toast component */}
            <Toast msg={msg} open={openToast} setOpen={setopenToast} />

            {/* Save book popup ui */}
            <Dialog
                size="xs"
                open={open}
                handler={() => setOpen(!open)}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">

                    <CardBody className="flex flex-col gap-4">
                        <h4
                            className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                            Add new book
                        </h4>
                        <button
                            data-dismissible-target="alert"
                            className="!absolute  top-3 right-3 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                    stroke-width="2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    ></path>
                                </svg>
                            </span>
                        </button>
                        <p className="block mb-3 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                            Enter new book details
                        </p>

                        <h6
                            className="block -mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                            Title *
                        </h6>
                        <div className="relative h-11 w-full min-w-[200px]">

                            <Input variant="outlined" label="Enter title" placeholder="" crossOrigin={null}
                                value={title}
                                onChange={(e) => {
                                    seterrtitle(false)
                                    settitle(e.target.value);
                                }}
                            />

                        </div>
                        {
                            errtitle &&
                            <span className="text-xs text-right text-red-600 -mt-4">
                                This field is required
                            </span>
                        }

                        <h6
                            className="block -mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                            Author *
                        </h6>
                        <div className="relative h-11 w-full min-w-[200px]">

                            <Input variant="outlined" label="Enter author" placeholder="" crossOrigin={null}
                                value={author}
                                onChange={(e) => {
                                    seterrauthor(false)
                                    setauthor(e.target.value);
                                }}
                            />
                        </div>
                        {
                            errauthor &&
                            <span className="text-xs text-right text-red-600 -mt-4">
                                This field is required
                            </span>
                        }

                        <h6
                            className="block -mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                            Publisher *
                        </h6>
                        <div className="relative h-11 w-full min-w-[200px]">

                            <Input variant="outlined" label="Enter publisher" placeholder="" crossOrigin={null}
                                value={publisher}
                                onChange={(e) => {
                                    seterrpublisher(false)
                                    setpublisher(e.target.value);
                                }}
                            />
                        </div>
                        {
                            errpublisher &&
                            <span className="text-xs text-right text-red-600 -mt-4">
                                This field is required
                            </span>
                        }

                        <h6
                            className="block -mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                            Pages *
                        </h6>
                        <div className="relative h-11 w-full min-w-[200px]">


                            <Input variant="outlined" label="Enter pages" placeholder="" crossOrigin={null}
                                type="number"
                                min={0}
                                value={pages}
                                onChange={(e) => {
                                    seterrpages(false)
                                    setpages(e.target.value);
                                }}
                            />
                        </div>
                        {
                            errpages &&
                            <span className="text-xs text-right text-red-600 -mt-4">
                                This field is required
                            </span>
                        }

                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient"
                            fullWidth
                            onClick={saveBook}
                        >
                            Save
                        </Button>

                    </CardFooter>

                </Card>
            </Dialog >
        </>
    )


}

