"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import DetailSkeleton from "@/app/component/detailskeleton";

export default function Phim({ params }: { params: { slug: string } }) {
    var { slug } = params;

    const [movie, setMovie] = useState<any>([]);
    const [uindex, setuIndex] = useState(0);
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        const res = await fetch(`https://phimapi.com/phim/${slug}`);
        return res.json();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await getData();
                setData(result);
            } catch (err) {
                new Error("not data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    function handleButton(value: any, index: any) {
        setMovie(data.episodes[0].server_data);
        setuIndex(index);

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [uindex]);

    return (
        <div className="">
            <div className="flex justify-center">
                <div className="md:w-[1000px] flex gap-5 justify-between items-center">
                    {data && Object.keys(data).length > 0 ? (
                        <div className="">
                            <div className="flex items-center cursor-pointer px-5 pt-3 gap-2 flex-wrap">
                                <Link href="/">Trang chủ &gt;</Link>
                                <Link href="#">Phim &gt;</Link>
                                <Link href="#">{data.movie.name} &gt;</Link>
                                {movie[uindex] ? (
                                    <Link href="#">{movie[uindex].name} </Link>
                                ) : (
                                    <Link href="#">Tập 1 </Link>
                                )}
                            </div>
                            <div className="my-3 ">
                                {movie[uindex] && (
                                    <iframe
                                        src={movie[uindex].link_embed}
                                        allowFullScreen
                                        className="w-[100%] h-[300px] md:w-[1000px] md:h-[500px]"
                                    />
                                )}
                            </div>
                            <div className="px-5">
                                <div className="">
                                    Server đang chọn:{" "}
                                    {data.episodes[0].server_name}
                                </div>
                                <div className="mt-5">
                                    <div className="flex gap-5">
                                        <Image
                                            src={data.movie.poster_url}
                                            width={150}
                                            height={200}
                                            alt=""
                                        />
                                        <div className="">
                                            <h1 className="text-2xl">
                                                {data.movie.name}
                                            </h1>
                                            <h1 className="text-lg text-gray-600 mb-3">
                                                {data.movie.origin_name}
                                            </h1>
                                            <div className="text-gray-400 flex gap-3 flex-wrap">
                                                <p>
                                                    Ngày đăng:{" "}
                                                    {new Date(
                                                        data.movie.modified.time
                                                    ).toLocaleDateString(
                                                        "vi-VI"
                                                    )}
                                                </p>
                                                <p>
                                                    Thời lượng:{" "}
                                                    {data.movie.time}
                                                </p>
                                                <p className="bg-blue-300 px-1 text-blue-600">
                                                    {data.movie.quality}
                                                </p>
                                                <p className="flex gap-2">
                                                    Tình trạng phim:
                                                    <p className="bg-blue-300 px-1 text-blue-600">
                                                        {
                                                            data.movie
                                                                .episode_current
                                                        }
                                                    </p>
                                                </p>
                                            </div>
                                            <div className="flex gap-2 my-2 text-gray-400 flex-wrap">
                                                <p>Thể loại phim: </p>
                                                {data.movie.category.map(
                                                    (item: any, index: any) => (
                                                        <p key={index}>
                                                            {item.name}
                                                        </p>
                                                    )
                                                )}
                                            </div>
                                            <div className="text-gray-400">
                                                <p>
                                                    Nước sản xuất:{" "}
                                                    {data.movie.country[0].name}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="my-5">
                                    <h1>Các tập phim</h1>
                                    <div className="flex flex-wrap gap-3 mt-3">
                                        {data.episodes[0].server_data.map(
                                            (item: any, index: any) => (
                                                <Button
                                                    className="flex-1"
                                                    key={index}
                                                    value={item.link_embed}
                                                    disabled={
                                                        index == uindex &&
                                                        item.name != "Full" &&
                                                        item.name != "Tập 01"
                                                    }
                                                    onClick={(e: any) =>
                                                        handleButton(
                                                            e.target.value,
                                                            index
                                                        )
                                                    }>
                                                    {item.name}
                                                </Button>
                                            )
                                        )}
                                    </div>
                                </div>
                                <div className="">
                                    <Tabs
                                        defaultValue="thongtin"
                                        className="md:w-[1000px]">
                                        <TabsList className="grid w-full grid-cols-3 bg-[#09090b]">
                                            <TabsTrigger value="thongtin">
                                                Thông tin
                                            </TabsTrigger>
                                            <TabsTrigger value="dienvien">
                                                Diễn viên
                                            </TabsTrigger>
                                            <TabsTrigger value="trailer">
                                                Trailer
                                            </TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="thongtin">
                                            <div className="">
                                                <h3 className="text-lg mt-3 mb-5">
                                                    Tóm tắt
                                                </h3>
                                                <p className="text-gray-500">
                                                    {data.movie.content}
                                                </p>
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="dienvien">
                                            <div className="">
                                                <h3 className="text-lg mt-3 mb-5">
                                                    Đạo diễn{" "}
                                                    {data.movie.director}
                                                </h3>
                                                <div>
                                                    <p className="text-lg">
                                                        Diễn viên
                                                    </p>
                                                    <div className="flex gap-5 flex-wrap">
                                                        {data.movie.actor.map(
                                                            (
                                                                item: any,
                                                                index: any
                                                            ) => (
                                                                <p
                                                                    className="bg-blue-300 px-1 text-blue-700"
                                                                    key={index}>
                                                                    {item}
                                                                </p>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="trailer">
                                            <div className="">
                                                <p>Trailer</p>
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </div>
                                <div className="my-5">
                                    <h3>Phim mới</h3>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <DetailSkeleton />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
