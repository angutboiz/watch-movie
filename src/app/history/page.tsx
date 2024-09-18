"use client";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";
import CardDataSkeleton from "../component/carddataskeleton";
import CardDataAPI from "../component/carddataapi";

export default function History() {
    const data = JSON.parse(window.localStorage.getItem("history") || "[]");
    const sort = data.sort((a: any, b: any) => b.time - a.time);
    return (
        <div className="flex justify-center">
            <div className="w-[1000px]">
                <div className="relative flex items-center justify-between my-3 px-3 md:px-0">
                    <h1 className="text-2xl font-bold ml-3">LỊCH SỬ XEM PHIM</h1>
                    <div className="absolute w-1 h-[2rem] bg-orange-500 top-0"></div>
                </div>
                <CardDataAPI data={sort} />
            </div>
        </div>
    );
}
