"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { useCallback, useEffect, useState } from "react";
import CardData from "../component/carddata";
import CardDataSkeleton from "../component/carddataskeleton";
import { Input } from "@/components/ui/input";

export default function Search() {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    function handleDesc() {
        setPage(page - 1);
        if (page < 2) {
            setPage(1);
        }
    }

    function debounce(func: any, wait: any) {
        let timeout: any;
        return (...args: any) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    }

    const handleText = (e: any) => {
        const { value } = e.target;
        setQuery(value);
        handleSearch(value);
    };

    const handleSearch = useCallback(
        debounce(async (value: any) => {
            if (value) {
                setLoading(true);
                try {
                    const res = await fetch(`https://phimapi.com/v1/api/tim-kiem?keyword=${value}`);
                    const data = await res.json();
                    setResults(data.data.items);
                    console.log(data.data.items);
                } catch (error) {
                    console.error("Error fetching search results: ", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setResults([]);
            }
        }, 300),
        []
    );

    return (
        <div className="flex justify-center">
            <div className="w-[1000px]">
                <div className="p-5">
                    <Input type="text" placeholder="Nhập tên phim bạn muốn tìm..." className="mt-5 p-5 text-xl" onChange={(e) => handleText(e)} />
                </div>
                {results && <> {loading ? <CardDataSkeleton /> : <CardData data={results} />}</>}
            </div>
        </div>
    );
}
