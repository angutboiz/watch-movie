"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DetailSkeleton from "@/app/component/detailskeleton";
import Link from "next/link";

export default function DetailFilm({ data }: { data: any }) {
    const [movie, setMovie] = useState<any>(data?.episodes[0].items[0]);
    const [uindex, setuIndex] = useState(0);
    const [server, setServer] = useState(0);
    const [click, setClick] = useState(false);

    function handleButton(index: any) {
        setMovie(data?.episodes[0].items[index]);
        setuIndex(index);
        setClick(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const handleChangeServer = (index: number) => {
        setServer(index);
    };

    interface Movie {
        id: string;
        slug: string;
    }

    interface Data {
        movie: Movie;
    }

    useEffect(() => {
        const saveMovieToHistory = () => {
            if (global?.window !== undefined) {
                const historyString = window.localStorage.getItem("history");
                const newHis = {
                    id: data.id,
                    name: data.name,
                    slug: data.slug,
                    original_name: data.original_name,
                    year: data.year,
                    thumb_url: data.thumb_url,
                    time: Date.now(),
                };
                const history: Movie[] = historyString ? JSON.parse(historyString) : [];
                const isMovieExist = history.some((item) => item.id === data.id);
                if (!isMovieExist) {
                    history.push(newHis);
                    window.localStorage.setItem("history", JSON.stringify(history));
                }
            }
        };

        saveMovieToHistory();
    }, [data]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [uindex]);

    function handleDesc() {
        setuIndex(uindex - 1);
        if (uindex < 1) setuIndex(0);
    }

    function handleInc() {
        if (uindex < movie.items?.length - 1) setuIndex(uindex + 1);
    }
    return (
        <div className="">
            <div className="flex justify-center">
                <div className="md:w-[1000px] flex gap-5 justify-between items-center">
                    {data && Object.keys(data).length > 0 ? (
                        <div className="">
                            <div className="flex items-center cursor-pointer px-5 pt-3 gap-2 flex-wrap">
                                <Link href="/">Trang chủ &gt;</Link>
                                <Link href="#">Phim &gt;</Link>
                                <Link href="#">{data.name} &gt;</Link>
                                <Link href="#">Tập {movie.name} </Link>
                            </div>
                            {!click && (
                                <div className="my-3 w-[100%] h-[300px] md:w-[1000px] md:h-[500px] relative">
                                    <Image src={data.poster_url} alt={data.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="absolute object-cover" />
                                    <div className="absolute w-full h-full flex justify-center items-center cursor-pointer" onClick={() => handleButton(0)}>
                                        <Play className="w-[50px] h-[50px] bg-[#ea580c] rounded-full p-2" />
                                    </div>
                                </div>
                            )}
                            <div className="my-3 ">{click && <iframe src={movie.embed} allowFullScreen allow="autoplay" className="w-[100%] h-[300px] md:w-[1000px] md:h-[500px]" />}</div>
                            <div className="px-5 md:px-0">
                                {data && Object.keys(data.episodes).length > 0 && <p className="">Server đang chọn: {data.episodes[server].server_name}</p>}
                                <div className="flex gap-5 items-center mb-5 mt-3">
                                    {data &&
                                        Object.keys(data.episodes).length > 0 &&
                                        data.episodes.map((item: any, index: any) => (
                                            <Button className="text-gray-300" key={index} onClick={() => handleChangeServer(index)} disabled={server == index}>
                                                Server: {item.server_name}
                                            </Button>
                                        ))}
                                </div>
                                {data && Object.keys(data.episodes[0].items).length > 1 && (
                                    <div className="flex gap-5 justify-center">
                                        <Button onClick={() => handleDesc()} disabled={uindex < 1}>
                                            <ChevronLeft />
                                            Tập trước đó
                                        </Button>
                                        <Button onClick={() => handleInc()} disabled={uindex >= movie.items?.length - 1}>
                                            Tập tiếp theo <ChevronRight />
                                        </Button>
                                    </div>
                                )}

                                <div className="my-5">
                                    <h1>Các tập phim</h1>
                                    <div className="flex flex-wrap gap-3 mt-3">
                                        {data &&
                                            Object.keys(data.episodes).length > 0 &&
                                            [...data.episodes[server].items].reverse().map((item: any, index: any) => (
                                                <Button
                                                    className="flex-1"
                                                    key={index}
                                                    value={item.link_embed}
                                                    disabled={index == data.episodes[0].items.length - 1 - uindex && item.name != "Full" && item.name != "Tập 01"}
                                                    onClick={() => handleButton(data.episodes[0].items.length - 1 - index)}>
                                                    {`Tập ${item.name}`}
                                                </Button>
                                            ))}
                                    </div>
                                </div>
                                <div className="mt-5 relative">
                                    <Image
                                        src={data.poster_url}
                                        alt={data.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="absolute z-0 object-cover brightness-[.35] "
                                    />
                                    <div className="flex gap-2 md:gap-5 z-10 relative p-5 md:p-0">
                                        <Image src={data.thumb_url} width={150} height={200} alt={data.name} className="object-cover hidden md:block" />
                                        <div className="py-2">
                                            <div className="">
                                                <div className="flex gap-3 md:flex-row flex-wrap flex-col ">
                                                    <h1 className="text-2xl">{data.name}</h1>

                                                    <div className="flex gap-2">
                                                        <p className="bg-blue-600 px-2 py-1 rounded-md">{data.quality}</p>
                                                        <p className="bg-blue-600 px-2 py-1 rounded-md">{data.language}</p>
                                                    </div>
                                                </div>
                                                <h1 className="text-xl text-gray-300 mb-3">{data.original_name}</h1>
                                                <div className="flex justify-between md:gap-5 flex-wrap">
                                                    <div className="text-gray-300 flex gap-3 flex-wrap flex-col">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <p>Ngày đăng: </p>
                                                            <p className="bg-orange-600 text-white px-2 py-1 rounded-md">{new Date(data.modified).toLocaleDateString("vi-VI")}</p>
                                                        </div>
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <p>Thời lượng:</p>
                                                            <p className="bg-orange-600 text-white px-2 py-1 rounded-md">{data.time}</p>
                                                        </div>
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <p className="">Năm phát hành:</p>
                                                            <p className="bg-orange-600 text-white px-2 py-1 rounded-md">{data?.category[3].list[0].name}</p>
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        <div className="flex items-center gap-2 my-2 text-gray-300 flex-wrap">
                                                            <p>Thể loại phim: </p>
                                                            {data.category[2].list.map((item: any, index: any) => (
                                                                <label className="bg-orange-600 text-white px-2 py-1 rounded-md" key={index}>
                                                                    {item.name}
                                                                </label>
                                                            ))}
                                                        </div>
                                                        {/* <div className="flex flex-wrap items-center gap-2">
                                                            <p>Nước sản xuất: </p>
                                                            <p className="bg-orange-600 text-white px-2 py-1 rounded-md">{data.country[0].name}</p>
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
                                                <p className="text-gray-500">{data.description}</p>
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="dienvien">
                                            <div className="">
                                                <h3 className="text-lg mt-3 mb-5">Đạo diễn {data?.director}</h3>
                                                <div>
                                                    <p className="text-lg">Diễn viên</p>
                                                    <div className="flex gap-5 flex-wrap">
                                                        {/* {data?.cast.map((item: any, index: any) => (
                                                            <p className="bg-blue-300 px-1 text-blue-700" key={index}>
                                                                {item}
                                                            </p>
                                                        ))} */}
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
