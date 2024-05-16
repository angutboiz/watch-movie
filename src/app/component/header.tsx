"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function Header() {
    const pathname = usePathname();

    const [hide, setHide] = useState(false);

    return (
        <div className="block h-[60px] text-white ">
            <div className="fixed w-full ">
                <div className="flex justify-center bg-[#333333]">
                    <div className="w-[1000px]  flex gap-5 justify-between items-center">
                        <div className="text-3xl">Watch Movie</div>
                        <div className="">
                            <ul className="flex items-center gap-5">
                                {hide ? (
                                    ""
                                ) : (
                                    <>
                                        <li className="">
                                            <Link
                                                href="/"
                                                className={`${
                                                    pathname === "/"
                                                        ? "bg-orange-600"
                                                        : ""
                                                } block px-5 py-3`}
                                            >
                                                Trang chủ
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/phimbo"
                                                className={`${
                                                    pathname === "/phimbo"
                                                        ? "bg-orange-600"
                                                        : ""
                                                } block px-5 py-3`}
                                            >
                                                Phim bộ
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/phimle"
                                                className={`${
                                                    pathname === "/phimle"
                                                        ? "bg-orange-600"
                                                        : ""
                                                } block px-5 py-3`}
                                            >
                                                Phim lẻ
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/tvshow"
                                                className={`${
                                                    pathname === "/tvshow"
                                                        ? "bg-orange-600"
                                                        : ""
                                                } block px-5 py-3`}
                                            >
                                                TV show
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/hoathinh"
                                                className={`${
                                                    pathname === "/hoathinh"
                                                        ? "bg-orange-600"
                                                        : ""
                                                } block px-5 py-3`}
                                            >
                                                Hoạt hình
                                            </Link>
                                        </li>
                                    </>
                                )}
                                {hide ? (
                                    <>
                                        <li className=" w-[600px]">
                                            <Input
                                                type="text"
                                                placeholder="Nhập tên phim bạn muốn tìm..."
                                                className=""
                                            />
                                        </li>
                                    </>
                                ) : (
                                    ""
                                )}
                                {hide ? (
                                    <>
                                        {" "}
                                        <li
                                            onClick={() => setHide(!hide)}
                                            className=" px-5 py-2"
                                        >
                                            <Button className="bg-orange-500">
                                                Huỷ
                                            </Button>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li
                                            onClick={() => setHide(!hide)}
                                            className="block px-5 py-3"
                                        >
                                            <Search size={20}></Search>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
