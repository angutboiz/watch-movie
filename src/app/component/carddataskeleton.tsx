import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function CardDataSkeleton() {
    const array = Array.from({ length: 10 }, (_, index) => index + 1);
    return (
        <div className="flex flex-wrap justify-between items-center px-3 md:px-0">
            {array.map((item: any, index: any) => (
                <Skeleton className="flex items-center justify-center w-[48%]  md:w-[19%] hover:text-gray-300 mt-3 bg-[#2d2d2d]" key={index}>
                    <div className="w-full">
                        <div className=" h-[250px] overflow-hidden rounded-md relative"></div>
                        <h1 className="text-md mt-1 line-clamp-1"></h1>
                        <p className="text-gray-500 text-[15px]"></p>
                    </div>
                </Skeleton>
            ))}
        </div>
    );
}
