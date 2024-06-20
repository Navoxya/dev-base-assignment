
"use client";

import Image from "next/image";

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
  Spinner,
} from "@material-tailwind/react";

import React, { useEffect, useState } from "react";
import BookForm from "./components/Forms/bookForm";
import { GetAllBooks } from "@/app/services/Get"
import Pagination from "./components/Pagination";


//book interface
interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  pages: number;
}


export default function Home() {

  const [open, setOpen] = React.useState(false);

  const [dataList, setdataList] = useState<Book[]>([]);

  const [search, setsearch] = useState<string>("");
  const [sort, setsort] = useState<string>("desc");
  const [filter, setfilter] = useState<string>("id");
  const [pageLimit, setpageLimit] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dataCount, setdataCount] = useState<number>(0);

  const [isLoading, setisLoading] = useState<boolean>(true);

  //trigger get book function when changing states
  useEffect(() => {

    getAllBooks();

  }, [open, search, sort, filter, pageLimit, currentPage])


  //fetching books data from api
  const getAllBooks = () => {

    // api call
    GetAllBooks({
      search: search,
      sortField: filter,
      sortValue: sort,
      limit: pageLimit,
      page: currentPage,
    })
      .then((res) => {
        console.log(res);
        setdataCount(parseInt(res.headers['x-total-count']))

        setdataList(res?.data);
        setisLoading(false);

      })
      .catch((error) => {
        console.log("Error", error);

        setdataList([])
        setisLoading(false);


       
      });

  }

  //pagination change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  //calculate total pages of pagination
  const totalPages = Math.ceil(dataCount / pageLimit);


  return (

    <>

      {/* import add book form */}
      <BookForm open={open} setOpen={setOpen} />


      {/* <LoadingSpinner open={true} /> */}


      {/* Table UI */}
      <div className="min-h-screen h-full bg-white flex flex-col items-center justify-center py-4 sm:py-10 gap-12">

        <div className="container relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
          <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border">
            <div className="flex items-center justify-between gap-8 mb-8">
              <div>
                <h5
                  className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  Books list
                </h5>
                <p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                  See information about all books
                </p>
              </div>
              <div className="flex flex-col gap-2 shrink-0 sm:flex-row">

                <Button
                  className="flex select-none items-center gap-3 rounded-lg bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                    stroke-width="2" className="w-4 h-4">
                    <path
                      d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z">
                    </path>
                  </svg>
                  Add book
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

              <div className="w-full md:w-72">
                <div className="relative h-10 w-full min-w-[200px]">
                  <div className="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" aria-hidden="true" className="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
                    </svg>
                  </div>
                  <input
                    className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                    onChange={(e) => {
                      setsearch(e.target.value);
                    }}
                  />
                  <label
                    className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Search
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 px-0 overflow-auto">
            <table className="w-full mt-4 text-left table-auto min-w-max">
              <thead>
                <tr>
                  <th
                    className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50"
                    onClick={() => {
                      setfilter("title");
                      setsort(sort === "asc" ? "desc" : "asc")
                    }}
                  >
                    <p
                      className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Title
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                      </svg>
                    </p>
                  </th>
                  <th
                    className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50"
                    onClick={() => {

                      setfilter("author");
                      setsort(sort === "asc" ? "desc" : "asc")
                    }}
                  >
                    <p
                      className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"

                    >
                      Author
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                      </svg>
                    </p>
                  </th>
                  <th
                    className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50"
                    onClick={() => {
                      setfilter("publisher");
                      setsort(sort === "asc" ? "desc" : "asc")
                    }}
                  >
                    <p
                      className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"

                    >
                      Publisher
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                      </svg>
                    </p>
                  </th>
                  <th
                    className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50"
                    onClick={() => {

                      setfilter("pages");
                      setsort(sort === "asc" ? "desc" : "asc")
                    }}
                  >
                    <p
                      className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"

                    >
                      Pages
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                      </svg>
                    </p>
                  </th>

                </tr>
              </thead>
              <tbody>
                {
                  dataList.length > 0 && !isLoading ?

                    dataList.map((item, index) => {

                      return (
                        <>
                          <tr className="w-full">
                            <td className="p-4 border-b border-blue-gray-50">
                              <div className="flex items-center gap-3">

                                <div className="flex flex-col">
                                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    {item?.title}
                                  </p>

                                </div>
                              </div>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                              <div className="flex flex-col">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                  {item?.author}
                                </p>

                              </div>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                              <div className="flex flex-col">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                  {item?.publisher}
                                </p>

                              </div>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                              <div className="flex flex-col">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                  {item?.pages}
                                </p>

                              </div>
                            </td>

                          </tr>

                        </>
                      )
                    })

                    : isLoading ?

                      <tr className="w-full">
                        <td className="p-4 border-b border-blue-gray-50 " colSpan={4} >
                          <div className="flex items-center gap-3 justify-center">

                            <div className="flex bg-white h-full w-full items-center justify-center">

                              <Spinner className="h-8 w-8" />

                            </div>
                          </div>
                        </td>


                      </tr>

                      :

                      <tr className="w-full">
                        <td className="p-4 border-b border-blue-gray-50 " colSpan={4} >
                          <div className="flex items-center gap-3 justify-center">

                            <div className="flex flex-col">
                              <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                No data found
                              </p>

                            </div>
                          </div>
                        </td>


                      </tr>

                }




              </tbody>
            </table>
          </div>

          {/* pagination ui */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          {/* pagination ui */}

        </div>

      </div>
      {/* Table UI */}


    </>

  );
}
