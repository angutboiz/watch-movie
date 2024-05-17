"use client";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import React, { useEffect, useState } from "react";
import apiService from "@/lib/apiservice";
import CardDataSkeleton from "./component/carddataskeleton";
import CardDataAPI from "./component/carddataapi";

export default function Home() {
    const [data, setData] = useState<any>([]);
    const [dataYear, setDataYear] = useState<any>([]);
    const [dataVN, setDataVN] = useState<any>([]);
    const [dataSoon, setDataSoon] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await apiService.get("https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=1");
                setData(result.items);
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await apiService.get("https://apii.online/apii/danh-sach?year=2024&page=1");
                setDataYear(result.items);
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await apiService.get("https://apii.online/apii/danh-sach?country=viet-nam&page=1");
                setDataVN(result.items);
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await apiService.get("https://apii.online/apii/danh-sach?status=trailer&page=1");
                setDataSoon(result.items);
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
    return (
        <div className="flex justify-center">
            <div className="w-full md:w-[1000px]">
                <div className="relative flex items-center my-3 px-3 md:px-0">
                    <h1 className="text-2xl font-bold ml-3">PHIM SẮP RA MẮT</h1>
                    <div className="absolute w-1 h-[2rem] bg-orange-500 top-0"></div>
                </div>
                <Carousel plugins={[plugin.current]} className="w-full px-3" onMouseEnter={plugin.current.stop} onMouseLeave={plugin.current.reset}>
                    <CarouselContent>
                        {dataSoon && Object.keys(dataSoon).length > 0 ? (
                            dataSoon.map((item: any, index: any) => (
                                <CarouselItem className="basis-1/2 md:basis-1/5 w-100" key={index}>
                                    <Link href={`phim/${item.slug}`} className="block">
                                        <div className="">
                                            <div className="w-[180px] h-[250px] overflow-hidden rounded-md relative ">
                                                <Image src={`https://apii.online/image/${item.poster_url}`} alt="" fill className="absolute hover:scale-125 duration-500" />
                                            </div>
                                            <h1 className="text-md mt-1">{item.name}</h1>
                                            <p className="text-gray-500 text-[15px]">{item.year}</p>
                                        </div>
                                    </Link>
                                </CarouselItem>
                            ))
                        ) : (
                            <>
                                <p>Không có dữ liệu...</p>
                            </>
                        )}
                    </CarouselContent>
                    <CarouselPrevious className="text-black hidden md:block" />
                    <CarouselNext className="text-black  hidden md:block" />
                </Carousel>
                <div className="relative flex items-center my-3 px-3 md:px-0">
                    <h1 className="text-2xl font-bold ml-3">PHIM MỚI CẬP NHÂT</h1>
                    <div className="absolute w-1 h-[2rem] bg-orange-500 top-0"></div>
                </div>
                <Carousel plugins={[plugin.current]} className="w-full px-3" onMouseEnter={plugin.current.stop} onMouseLeave={plugin.current.reset}>
                    <CarouselContent>
                        {data && Object.keys(data).length > 0 ? (
                            data.map((item: any, index: any) => (
                                <CarouselItem className="basis-1/2 md:basis-1/5 w-100" key={index}>
                                    <Link href={`phim/${item.slug}`} className="block">
                                        <div className="">
                                            <div className="w-[180px] h-[250px] overflow-hidden rounded-md relative ">
                                                <Image src={item.poster_url} alt="" fill className="absolute hover:scale-125 duration-500" />
                                            </div>
                                            <h1 className="text-md mt-1">{item.name}</h1>
                                            <p className="text-gray-500 text-[15px]">{item.year}</p>
                                        </div>
                                    </Link>
                                </CarouselItem>
                            ))
                        ) : (
                            <>
                                <p>Không có dữ liệu...</p>
                            </>
                        )}
                    </CarouselContent>
                    <CarouselPrevious className="text-black hidden md:block" />
                    <CarouselNext className="text-black  hidden md:block" />
                </Carousel>
                <div className="mt-5">
                    <div className="relative flex items-center my-3 px-3 md:px-0">
                        <h1 className="text-2xl font-bold ml-3">PHIM 2024</h1>
                        <div className="absolute w-1 h-[2rem] bg-orange-500 top-0"></div>
                    </div>
                </div>
                {loading ? <CardDataSkeleton /> : <CardDataAPI data={dataYear} />}

                <div className="mt-5">
                    <div className="relative flex items-center my-3 px-3 md:px-0">
                        <h1 className="text-2xl font-bold ml-3">PHIM VIỆT NAM</h1>
                        <div className="absolute w-1 h-[2rem] bg-orange-500 top-0"></div>
                    </div>
                </div>
                {loading ? <CardDataSkeleton /> : <CardDataAPI data={dataVN} />}
            </div>
        </div>
    );
}
