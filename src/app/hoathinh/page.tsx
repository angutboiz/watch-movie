"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import CardData from "../component/carddata";
import CardDataSkeleton from "../component/carddataskeleton";
import PaginationControl from "../component/paginationcontrol";
import apiService from "@/lib/apiservice";
import CardDataAPI from "../component/carddataapi";

export default function HoatHinh() {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await apiService.get(`https://apii.online/apii/danh-sach?type=hoathinh&page=${page}`);
                setData(result.items);
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [page]);

    function handleDesc() {
        setPage(page - 1);
        if (page < 2) {
            setPage(1);
        }
    }
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <div className="flex justify-center">
            <div className="w-[1000px]">
                <div className="relative flex items-center justify-between my-3 px-3 md:px-0">
                    <h1 className="text-2xl font-bold ml-3">PHIM ANIME ĐANG HOT</h1>
                    <div className="absolute w-1 h-[2rem] bg-orange-500 top-0"></div>
                </div>
                {loading ? <CardDataSkeleton /> : <CardDataAPI data={data} />}

                <PaginationControl currentPage={page} onPageChange={handlePageChange} />
            </div>
        </div>
    );
}
