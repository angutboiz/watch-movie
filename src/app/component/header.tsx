"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
    const pathname = usePathname();
    return (
        <div className="block h-[60px]">
            <div className="fixed w-full ">
                <div className="flex justify-center">
                    <div className="w-[1000px] bg-blue-500 flex gap-5 justify-between items-center">
                        <div className="">Watch Movie</div>
                        <div className="">
                            <ul className="flex items-center gap-5">
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
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
