import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Phim({ params }: { params: { slug: string } }) {
    var { slug } = params;

    async function getData() {
        const res = await fetch(`https://phimapi.com/phim/${slug}`);

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        return res.json();
    }

    const data = await getData();
    console.log(data);
    return (
        <div className="">
            <div className="flex justify-center">
                <div className="w-[1000px] flex gap-5 justify-between items-center">
                    <div className="">
                        <div className="flex items-center cursor-pointer">
                            <p>Phim &gt; {data.movie.name}</p>
                        </div>
                        <div className="my-3">
                            <iframe
                                src={data.episodes[0].server_data[0].link_embed}
                                allowFullScreen
                                width={1000}
                                height={500}
                            />
                        </div>
                        <div className="">
                            Server đang chọn: {data.episodes[0].server_name}
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
                                    <div className="text-gray-400 flex gap-3">
                                        <p>
                                            Ngày đăng:{" "}
                                            {new Date(
                                                data.movie.modified.time
                                            ).toLocaleDateString("vi-VI")}
                                        </p>
                                        <p>Thời lượng: {data.movie.time}</p>
                                        <p className="bg-blue-300 px-1 text-blue-600">
                                            {data.movie.quality}
                                        </p>
                                        <p className="flex gap-2">
                                            Tình trạng phim:
                                            <p className="bg-blue-300 px-1 text-blue-600">
                                                {data.movie.episode_current}
                                            </p>
                                        </p>
                                    </div>
                                    <div className="flex gap-2 my-2 text-gray-400">
                                        <p>Thể loại phim: </p>
                                        {data.movie.category.map(
                                            (item: any, index: any) => (
                                                <p key={index}>{item.name}</p>
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
                        <div className=" mt-5">
                            <Tabs
                                defaultValue="thongtin"
                                className="w-[1000px]"
                            >
                                <TabsList className="grid w-full grid-cols-3">
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
                                            Đạo diễn {data.movie.director}
                                        </h3>
                                        <div>
                                            <p className="text-lg">Diễn viên</p>
                                            <div className="flex gap-5 flex-wrap">
                                                {data.movie.actor.map(
                                                    (item: any, index: any) => (
                                                        <p
                                                            className="bg-blue-300 px-1 text-blue-700"
                                                            key={index}
                                                        >
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
            </div>
        </div>
    );
}
