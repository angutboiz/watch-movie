"use client";

import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash } from "lucide-react";

export default function History() {
    const [data, setData] = useState<any>([]);
    useEffect(() => {
        if (global?.window !== undefined) {
            const history = JSON.parse(window.localStorage.getItem("history") || "[]");
            const sort = history.sort((a: any, b: any) => b.time - a.time);
            setData(sort);
        }
    }, []);
    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        e.preventDefault();
        const updatedHistory = data.filter((item: any) => item._id !== id);
        setData(updatedHistory);
        localStorage.setItem("history", JSON.stringify(updatedHistory));
    };
    return (
        <div className="flex justify-center">
            <div className="w-[1000px]">
                <div className="relative flex items-center justify-between my-3 px-3 md:px-0">
                    <h1 className="text-2xl font-bold ml-3">LỊCH SỬ XEM PHIM</h1>
                    <div className="absolute w-1 h-[2rem] bg-orange-500 top-0"></div>
                </div>
                <div className="flex flex-wrap gap-3 items-center px-3 md:px-0">
                    {Object.keys(data).length > 0 ? (
                        data.map((item: any, index: any) => (
                            <Link href={`phim/${item.slug}`} className="flex items-center justify-center w-[48%] md:w-[19%] hover:text-gray-300 mt-3 group relative" key={index}>
                                <div className=" w-[100%] ">
                                    <div className="h-[250px] overflow-hidden rounded-md relative">
                                        <Image
                                            src={`${item.thumb_url}`}
                                            alt={item.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="absolute hover:scale-125 duration-500 object-cover"
                                        />
                                    </div>
                                    <h1 className="text-md mt-1 line-clamp-1">{item.name}</h1>
                                    <p className="text-gray-500 text-[15px] line-clamp-1">{item.original_name}</p>
                                </div>
                                <div className="hidden group-hover:block">
                                    <div className=" absolute top-[-15px] right-[-15px] text-white bg-red-500 p-2 rounded-full" onClick={(e: any) => handleDelete(e, item._id)}>
                                        <Trash size={20} />
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="w-full h-[500px] flex items-center justify-center">
                            <p>Không có lịch sử...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
