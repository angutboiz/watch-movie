"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import DetailSkeleton from "@/app/component/detailskeleton";
import apiService from "@/lib/apiservice";
import { setGlobal } from "next/dist/trace";
import Head from "next/head";

export default function Phim({ params }: { params: { slug: string } }) {
    var { slug } = params;

    const [movie, setMovie] = useState<any>([]);
    const [uindex, setuIndex] = useState(0);
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [click, setClick] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await apiService.get(`https://apii.online/apii/phim/${slug}`);
                setData(result);
                document.title = "Cà Phim - " + result.movie?.name;
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    function handleButton(value: any, index: any) {
        setMovie(data.episodes[0].server_data);
        setuIndex(index);
        setClick(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [uindex]);

    function handleDesc() {
        setuIndex(uindex - 1);
        if (uindex < 1) setuIndex(0);
    }

    function handleInc() {
        setuIndex(uindex + 1);
    }

    return (
        <div className="">
            <Head>
                <title>hellsd</title>
                <meta name="description" content="hua" />
            </Head>
            <div className="flex justify-center">
                <div className="md:w-[1000px] flex gap-5 justify-between items-center">
                    {data && Object.keys(data).length > 0 ? (
                        <div className="">
                            <div className="flex items-center cursor-pointer px-5 pt-3 gap-2 flex-wrap">
                                <Link href="/">Trang chủ &gt;</Link>
                                <Link href="#">Phim &gt;</Link>
                                <Link href="#">{data.movie?.name} &gt;</Link>
                                {movie[uindex] ? <Link href="#">Tập {movie[uindex].name} </Link> : <Link href="#">Tập 1 </Link>}
                            </div>
                            {!click && (
                                <div className="my-3 w-[100%] h-[300px] md:w-[1000px] md:h-[500px] relative">
                                    <Image src={data.movie?.poster_url} alt={data.movie?.name} fill className="absolute object-cover" />
                                    <div className="absolute w-full h-full flex justify-center items-center cursor-pointer" onClick={() => handleButton(data.episodes[0].server_data[0].link_embed, 0)}>
                                        <Play className="w-[50px] h-[50px] bg-[#ea580c] rounded-full p-2" />
                                    </div>
                                </div>
                            )}
                            <div className="my-3 ">
                                {movie[uindex] && <iframe src={movie[uindex].link_embed} allowFullScreen allow="autoplay" className="w-[100%] h-[300px] md:w-[1000px] md:h-[500px]" />}
                            </div>
                            <div className="px-5 md:px-0">
                                {data && Object.keys(data.episodes).length > 0 && <p className="">Server đang chọn: {data.episodes[0].server_name}</p>}

                                <div className="flex gap-5 justify-center">
                                    <Button onClick={() => handleInc()}>
                                        <ChevronLeft />
                                        Tập trước đó
                                    </Button>
                                    <Button onClick={() => handleDesc()}>
                                        Tập tiếp theo <ChevronRight />
                                    </Button>
                                </div>
                                <div className="mt-5 relative">
                                    <Image src={data.movie?.thumb_url} alt={data.movie?.name} fill className="absolute z-0 object-cover brightness-[.35] " />
                                    <div className="flex gap-2 md:gap-5 z-10 relative p-5 md:p-0">
                                        <Image src={data.movie?.poster_url} width={150} height={200} alt={data.movie?.name} className="object-cover hidden md:block" />
                                        <div className="py-2">
                                            <div className="">
                                                <div className="flex gap-3 md:flex-row flex-wrap flex-col ">
                                                    <h1 className="text-2xl">{data.movie?.name}</h1>

                                                    <div className="flex gap-2">
                                                        <p className="bg-blue-600 px-2 py-1 rounded-md">{data.movie?.quality}</p>
                                                        <p className="bg-blue-600 px-2 py-1 rounded-md">{data.movie?.lang}</p>
                                                    </div>
                                                </div>
                                                <h1 className="text-xl text-gray-300 mb-3">{data.movie?.origin_name}</h1>
                                                <div className="flex justify-between md:gap-5 flex-wrap">
                                                    <div className="text-gray-300 flex gap-3 flex-wrap flex-col">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <p>Ngày đăng: </p>
                                                            <p className="bg-orange-600 text-white px-2 py-1 rounded-md">{new Date(data.movie?.modified.time).toLocaleDateString("vi-VI")}</p>
                                                        </div>
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <p>Thời lượng:</p>
                                                            <p className="bg-orange-600 text-white px-2 py-1 rounded-md">{data.movie?.time}</p>
                                                        </div>
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <p className="">Tình trạng phim:</p>
                                                            <p className="bg-orange-600 text-white px-2 py-1 rounded-md">{data.movie?.episode_current}</p>
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        <div className="flex items-center gap-2 my-2 text-gray-300 flex-wrap">
                                                            <p>Thể loại phim: </p>
                                                            {data.movie?.category.map((item: any, index: any) => (
                                                                <label className="bg-orange-600 text-white px-2 py-1 rounded-md" key={index}>
                                                                    {item.name}
                                                                </label>
                                                            ))}
                                                        </div>
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <p>Nước sản xuất: </p>
                                                            <p className="bg-orange-600 text-white px-2 py-1 rounded-md">{data.movie?.country[0].name}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="my-5">
                                    <h1>Các tập phim</h1>
                                    <div className="flex flex-wrap gap-3 mt-3">
                                        {data &&
                                            Object.keys(data.episodes).length > 0 &&
                                            data.episodes[0].server_data.map((item: any, index: any) => (
                                                <Button
                                                    className="flex-1"
                                                    key={index}
                                                    value={item.link_embed}
                                                    disabled={index == uindex && item.name != "Full" && item.name != "Tập 01"}
                                                    onClick={(e: any) => handleButton(e.target.value, index)}>
                                                    {`Tập ${item.name}`}
                                                </Button>
                                            ))}
                                    </div>
                                </div>
                                <div className="">
                                    <Tabs defaultValue="thongtin" className="md:w-[1000px]">
                                        <TabsList className="grid w-full grid-cols-3 bg-[#09090b]">
                                            <TabsTrigger value="thongtin">Thông tin</TabsTrigger>
                                            <TabsTrigger value="dienvien">Diễn viên</TabsTrigger>
                                            <TabsTrigger value="trailer">Trailer</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="thongtin">
                                            <div className="">
                                                <h3 className="text-lg mt-3 mb-5">Tóm tắt</h3>
                                                <p className="text-gray-500">{data.movie?.content}</p>
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="dienvien">
                                            <div className="">
                                                <h3 className="text-lg mt-3 mb-5">Đạo diễn {data.movie?.director}</h3>
                                                <div>
                                                    <p className="text-lg">Diễn viên</p>
                                                    <div className="flex gap-5 flex-wrap">
                                                        {data.movie?.actor.map((item: any, index: any) => (
                                                            <p className="bg-blue-300 px-1 text-blue-700" key={index}>
                                                                {item}
                                                            </p>
                                                        ))}
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
