"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import CardData from "../component/carddata";
import CardDataSkeleton from "../component/carddataskeleton";

export default function HoatHinh() {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        const res = await fetch(
            `https://phimapi.com/v1/api/danh-sach/hoat-hinh?page=${page}`
        );

        return res.json();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await getData();
                setData(result.data.items);
            } catch (err) {
                new Error("not data");
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

    return (
        <div className="flex justify-center">
            <div className="w-[1000px]">
                {loading ? <CardDataSkeleton /> : <CardData data={data} />}

                <Pagination className="mt-4">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                className="cursor-pointer bg-orange-700 w-[100px]"
                                onClick={() => handleDesc()}
                            />
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationLink
                                isActive
                                className="text-gray-700  font-bold cursor-pointer"
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext
                                className="cursor-pointer bg-orange-700 w-[100px]"
                                onClick={() => setPage(page + 1)}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
