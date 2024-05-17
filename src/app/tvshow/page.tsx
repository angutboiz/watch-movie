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

export default function TVShow() {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await apiService.get(`https://phimapi.com/v1/api/danh-sach/tv-shows?page=${page}`);
                setData(result.data.items);
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

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
                    <h1 className="text-2xl font-bold ml-3">PHIM TRUYỀN HÌNH</h1>
                    <div className="absolute w-1 h-[2rem] bg-orange-500 top-0"></div>
                </div>
                {loading ? <CardDataSkeleton /> : <CardData data={data} />}

                <PaginationControl currentPage={page} onPageChange={handlePageChange} />
            </div>
        </div>
    );
}
