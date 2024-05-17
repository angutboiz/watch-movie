import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function DetailSkeleton() {
    return (
        <div className="py-5 md:py-0">
            <Skeleton className="flex items-center cursor-pointer px-5 pt-3 gap-2 flex-wrap bg-[#2d2d2d] h-[100px] md:h-0"></Skeleton>
            <Skeleton className="my-3 bg-[#2d2d2d]">
                <iframe src="" allowFullScreen className="w-[100%] h-[300px] md:w-[1000px] md:h-[500px]" />
            </Skeleton>
            <Skeleton className="px-5 bg-[#2d2d2d]">
                <div className=""></div>
                <div className="mt-5"></div>
                <div className="my-5">
                    <div className="flex flex-wrap gap-3 mt-3"></div>
                </div>
                <div className=""></div>
                <div className="my-5"></div>
            </Skeleton>
        </div>
    );
}
