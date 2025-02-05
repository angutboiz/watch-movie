"use client";
import React, { useCallback, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pacifico } from "next/font/google";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import apiService from "@/lib/apiservice";

const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });

export default function Header() {
    const pathname = usePathname();

    const [hide, setHide] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

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
                    const result = await apiService.get(`https://phim.nguonc.com/api/films/search?keyword=${value}`);
                    setResults(result.items);
                } catch (error) {
                    console.error("Error fetching search results: ", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setResults([]);
            }
        }, 100),
        []
    );

    const handleButtonClick = () => {
        setHide(!hide);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div className="block h-[60px] text-white relative z-50">
            <div className="fixed w-full ">
                <div className="md:flex justify-center bg-[#333333] p-3 md:p-0">
                    <div className="md:w-[1000px] flex gap-5 justify-between items-center">
                        <Link href="/" className={pacifico.className}>
                            <div className="text-3xl flex gap-1">
                                <h1 className="text-green-500">Cà </h1>
                                <h1 className="text-yellow-400 font-bold">Phim </h1>
                            </div>
                        </Link>
                        <div className="hidden md:block">
                            <ul className="flex items-center gap-5">
                                {hide ? (
                                    ""
                                ) : (
                                    <>
                                        <li className="">
                                            <Link href="/" className={`${pathname === "/" ? "bg-orange-600" : ""} block px-5 py-3`}>
                                                Trang chủ
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/phimbo" className={`${pathname === "/phimbo" ? "bg-orange-600" : ""} block px-5 py-3`}>
                                                Phim bộ
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/phimle" className={`${pathname === "/phimle" ? "bg-orange-600" : ""} block px-5 py-3`}>
                                                Phim lẻ
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/hoathinh" className={`${pathname === "/hoathinh" ? "bg-orange-600" : ""} block px-5 py-3`}>
                                                Hoạt hình
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/timkiemnangcao" className={`${pathname === "/timkiemnangcao" ? "bg-orange-600" : ""} block px-5 py-3`}>
                                                Nâng cao
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/history" className={`${pathname === "/history" ? "bg-orange-600" : ""} block px-5 py-3`}>
                                                Lịch sử
                                            </Link>
                                        </li>
                                    </>
                                )}
                                {hide ? (
                                    <>
                                        <li className=" w-[600px] relative">
                                            <form action="">
                                                <Input ref={inputRef} autoFocus type="text" placeholder="Nhập tên phim bạn muốn tìm..." className="" onChange={(e) => handleText(e)} />
                                            </form>
                                            <div className="absolute w-[600px] bg-[#333333] mt-2 p-3 shadow-sm shadow-gray-500 rounded-md">
                                                {loading ? (
                                                    <p>Đang tìm kiếm...</p>
                                                ) : (
                                                    <div>
                                                        {results ? (
                                                            <div className="results-container ">
                                                                <ul className="results-list flex flex-col">
                                                                    {results.map((item: any, index) => (
                                                                        <li key={index} className="h-[80px] result-item flex gap-3 items-center hover:text-green-500 cursor-pointer group">
                                                                            <div className="w-[20%] h-[65px] overflow-hidden rounded-md relative ">
                                                                                <Image
                                                                                    src={`${item.poster_url}`}
                                                                                    alt={item.name}
                                                                                    fill
                                                                                    className="absolute group-hover:scale-125 duration-500 object-cover"
                                                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                                                />
                                                                            </div>
                                                                            <a href={`/phim/${item.slug}`} className="result-link flex-1">
                                                                                <p className="line-clamp-1">{item.name}</p>
                                                                                <p className="text-sm text-gray-500 group-hover:text-green-200 line-clamp-1">{item.original_name}</p>
                                                                                <p className="text-sm text-gray-500 group-hover:text-green-200">{item.time}</p>
                                                                            </a>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ) : (
                                                            <p>Không có kết quả...</p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </li>
                                    </>
                                ) : (
                                    ""
                                )}
                                {hide ? (
                                    <>
                                        {" "}
                                        <li onClick={() => handleButtonClick()} className=" px-5 py-2">
                                            <Button className="bg-orange-500">Huỷ</Button>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li onClick={() => handleButtonClick()} className="block px-5 py-3">
                                            <Search size={20}></Search>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>

                        <div className="flex items-center md:hidden ">
                            <Link className="block px-5 py-2" href="/search">
                                <Search size={20}></Search>
                            </Link>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Menu></Menu>
                                </SheetTrigger>
                                <SheetContent className="bg-[#09090b] text-white">
                                    <SheetHeader>
                                        <SheetTitle>Edit profile</SheetTitle>
                                        <ul className="text-left">
                                            <li className="">
                                                <Link href="/" className={`${pathname === "/" ? "bg-orange-600" : ""} block px-5 py-3`}>
                                                    Trang chủ
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/phimbo" className={`${pathname === "/phimbo" ? "bg-orange-600" : ""} block px-5 py-3`}>
                                                    Phim bộ
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/phimle" className={`${pathname === "/phimle" ? "bg-orange-600" : ""} block px-5 py-3`}>
                                                    Phim lẻ
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/hoathinh" className={`${pathname === "/hoathinh" ? "bg-orange-600" : ""} block px-5 py-3`}>
                                                    Hoạt hình
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/history" className={`${pathname === "/history" ? "bg-orange-600" : ""} block px-5 py-3`}>
                                                    Lịch sử
                                                </Link>
                                            </li>
                                        </ul>
                                    </SheetHeader>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
