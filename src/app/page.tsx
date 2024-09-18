"use client";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import React, { useEffect, useState } from "react";
import apiService from "@/lib/apiservice";
import CardDataSkeleton from "./component/carddataskeleton";
import CardDataAPI from "./component/carddataapi";
import { Button } from "@/components/ui/button";

export default function Home() {
    const [data, setData] = useState<any>([]);
    const [dataYear, setDataYear] = useState<any>([]);
    const [dataVN, setDataVN] = useState<any>([]);
    const [dataSoon, setDataSoon] = useState<any>([]);
    const [dataTQ, setDataTQ] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await apiService.get("https://apii.online/apii/danh-sach?year=2024&type=single&status=completed&page=1&limit=50");
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
                const result = await apiService.get("https://apii.online/apii/danh-sach?year=2024&page=1&limit=10");
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
                const result = await apiService.get("https://apii.online/apii/danh-sach?country=viet-nam&page=1&limit=10");
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
                const result = await apiService.get("https://apii.online/apii/danh-sach?year=2024&type=hoathinh&status=ongoing&page=1");
                setDataSoon(result.items);
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
                const result = await apiService.get("https://apii.online/apii/danh-sach?country=trung-quoc&page=1&limit=10");
                setDataTQ(result.items);
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
        <div className="flex justify-center ">
            <div className="w-full md:w-[1000px]">
                <div className="relative flex items-center justify-between my-3 px-3 md:px-0">
                    <h1 className="text-2xl font-bold ml-3">PHIM HOẠT HÌNH 2024</h1>
                    <div className="absolute w-1 h-[2rem] bg-orange-500 top-0"></div>
                    <Link href="/hoathinh">
                        <Button className="bg-green-600">Xem thêm</Button>
                    </Link>
                </div>
                <Carousel plugins={[plugin.current]} className="w-full px-3  md:px-0" onMouseEnter={plugin.current.stop} onMouseLeave={plugin.current.reset}>
                    <CarouselContent>
                        {dataSoon && Object.keys(dataSoon).length > 0 ? (
                            dataSoon.map((item: any, index: any) => (
                                <CarouselItem className="basis-1/2 md:basis-1/5 w-100" key={index}>
                                    <Link href={`phim/${item.slug}`} className="block">
                                        <div className="">
                                            <div className="w-[180px] h-[250px] overflow-hidden rounded-md relative ">
                                                <Image src={`${item.thumb_url}`} alt={item.name} fill className="absolute hover:scale-125 duration-500 object-cover" />
                                            </div>
                                            <h1 className="text-md mt-1 line-clamp-1">{item.name}</h1>
                                            <p className="text-gray-500 text-[15px] line-clamp-1">{item.origin_name}</p>
                                            <p className="text-gray-500 text-[15px]">{item.year}</p>
                                        </div>
                                    </Link>
                                </CarouselItem>
                            ))
                        ) : (
                            <>
                                <CardDataSkeleton />
                            </>
                        )}
                    </CarouselContent>
                </Carousel>
                <div className="relative flex items-center justify-between my-3 px-3 md:px-0">
                    <h1 className="text-2xl font-bold ml-3">PHIM CHIẾU RẠP MỚI NHẤT</h1>
                    <div className="absolute w-1 h-[2rem] bg-orange-500 top-0"></div>
                    <Link href="/phimle">
                        <Button className="bg-green-600">Xem thêm</Button>
                    </Link>
                </div>
                <Carousel plugins={[plugin.current]} className="w-full px-3 md:px-0" onMouseEnter={plugin.current.stop} onMouseLeave={plugin.current.reset}>
                    <CarouselContent>
                        {data && Object.keys(data).length > 0 ? (
                            data.map((item: any, index: any) => (
                                <CarouselItem className="basis-1/2 md:basis-1/5 w-100" key={index}>
                                    <Link href={`phim/${item.slug}`} className="block">
                                        <div className="">
                                            <div className="w-[180px] h-[250px] overflow-hidden rounded-md relative ">
                                                <Image src={`${item.thumb_url}`} alt={item.name} fill className="absolute hover:scale-125 duration-500 object-cover" />
                                            </div>
                                            <h1 className="text-md mt-1 line-clamp-1">{item.name}</h1>
                                            <p className="text-gray-500 text-[15px] line-clamp-1">{item.origin_name}</p>
                                            <p className="text-gray-500 text-[15px]">{item.year}</p>
                                        </div>
                                    </Link>
                                </CarouselItem>
                            ))
                        ) : (
                            <>
                                <CardDataSkeleton />
                            </>
                        )}
                    </CarouselContent>
                </Carousel>
                <div className="relative flex items-center justify-between my-3 px-3 md:px-0">
                    <h1 className="text-2xl font-bold ml-3">TỔNG HỢP PHIM NĂM 2024</h1>
                    <div className="absolute w-1 h-[2rem] bg-orange-500 top-0"></div>
                    <Link href="/phimtrongnam">
                        <Button className="bg-green-600">Xem thêm</Button>
                    </Link>
                </div>
                {loading ? <CardDataSkeleton /> : <CardDataAPI data={dataYear} />}

                <div className="relative flex items-center justify-between my-3 px-3 md:px-0">
                    <h1 className="text-2xl font-bold ml-3">PHIM VIỆT NAM</h1>
                    <div className="absolute w-1 h-[2rem] bg-orange-500 top-0"></div>
                    <Link href="/phimvietnam">
                        <Button className="bg-green-600">Xem thêm</Button>
                    </Link>
                </div>
                {loading ? <CardDataSkeleton /> : <CardDataAPI data={dataVN} />}

                <div className="relative flex items-center justify-between my-3 px-3 md:px-0">
                    <h1 className="text-2xl font-bold ml-3">PHIM TRUNG QUỐC ĐANG HOT</h1>
                    <div className="absolute w-1 h-[2rem] bg-orange-500 top-0"></div>
                    <Link href="/phimvietnam">
                        <Button className="bg-green-600">Xem thêm</Button>
                    </Link>
                </div>
                {loading ? <CardDataSkeleton /> : <CardDataAPI data={dataTQ} />}
            </div>
        </div>
    );
}
