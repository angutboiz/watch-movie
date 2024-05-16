"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
    const pathname = usePathname();

    const [hide, setHide] = useState(false);

    function handleText(e: any) {
        console.log(e.target.value);
    }

    return (
        <div className="block h-[60px] text-white relative z-10">
            <div className="fixed w-full ">
                <div className="md:flex justify-center bg-[#333333] p-3 md:p-0">
                    <div className="md:w-[1000px] flex gap-5 justify-between items-center">
                        <div className="text-3xl">
                            <a href="/">Watch Movie</a>
                        </div>
                        <div className="hidden md:block">
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
                                                } block px-5 py-3`}>
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
                                                } block px-5 py-3`}>
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
                                                } block px-5 py-3`}>
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
                                                } block px-5 py-3`}>
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
                                                } block px-5 py-3`}>
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
                                                onChange={(e) => handleText(e)}
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
                                            className=" px-5 py-2">
                                            <Button className="bg-orange-500">
                                                Huỷ
                                            </Button>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li
                                            onClick={() => setHide(!hide)}
                                            className="block px-5 py-3">
                                            <Search size={20}></Search>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                        <div className="block md:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Menu></Menu>
                                </SheetTrigger>
                                <SheetContent className="bg-[#09090b] text-white">
                                    <SheetHeader>
                                        <SheetTitle>Edit profile</SheetTitle>
                                        <ul className="text-left">
                                            <li className="">
                                                <Link
                                                    href="/"
                                                    className={`${
                                                        pathname === "/"
                                                            ? "bg-orange-600"
                                                            : ""
                                                    } block px-5 py-3`}>
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
                                                    } block px-5 py-3`}>
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
                                                    } block px-5 py-3`}>
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
                                                    } block px-5 py-3`}>
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
                                                    } block px-5 py-3`}>
                                                    Hoạt hình
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
