
"use client";
import React, { useEffect, useState } from "react";


//pagination interface
interface pagination {
    currentPage: number;
    totalPages: number;
    onPageChange: (value: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: pagination) => {

    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="flex items-center justify-between p-4 border-t border-blue-gray-50">
            <button
                className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={
                    () => onPageChange(currentPage - 1)
                }
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <div className="flex items-center gap-2">

                {
                    pages.map((page, index) => {
                        {
                            return (
                                <>
                                    <button
                                        key={index}
                                        className={`relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${page === currentPage ? "border border-gray-900 " : "hover:bg-gray-900/10"}`}
                                        type="button"
                                        onClick={() => onPageChange(page)}
                                    >
                                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"

                                        >
                                            {page}
                                        </span>
                                    </button>

                                </>
                            )
                        }
                    }
                    )
                }

            </div>
            <button
                className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={
                    () => onPageChange(currentPage + 1)
                }
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;

