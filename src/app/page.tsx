"use client";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import React, { useEffect, useState } from "react";
import apiService from "@/lib/apiservice";

export default function Home() {
    const [data, setData] = useState<any>([]);
    const [dataYear, setDataYear] = useState<any>([]);
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
    }, [data]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await apiService.get("https://apii.online/kkphim/danh-sach/phim-moi-cap-nhat?page=1");
                setDataYear(result.items);
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [dataYear]);

    const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

    return (
        <div className="flex justify-center">
            <div className="w-[1000px]">
                <div className="relative flex items-center my-3">
                    <h1 className="text-2xl font-bold ml-3">PHIM MỚI CẬP NHÂT</h1>
                    <div className="absolute w-1 h-[2rem] bg-orange-500 top-0"></div>
                </div>
                <Carousel plugins={[plugin.current]} className="w-full " onMouseEnter={plugin.current.stop} onMouseLeave={plugin.current.reset}>
                    <CarouselContent>
                        {data && Object.keys(data).length > 0 ? (
                            data.map((item: any, index: any) => (
                                <CarouselItem className="basis-1/5 " key={index}>
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
                    <CarouselPrevious className="text-black" />
                    <CarouselNext className="text-black" />
                </Carousel>
                <div className="mt-5">
                    <div className="relative flex items-center my-3">
                        <h1 className="text-2xl font-bold ml-3">TOP PHIM 2024</h1>
                        <div className="absolute w-1 h-[2rem] bg-orange-500 top-0"></div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-between items-center md:items-start px-3 md:p-0">
                    {data && Object.keys(data).length > 0 ? (
                        data.map((item: any, index: any) => (
                            <Link href={`phim/${item.slug}`} className="flex items-center justify-center w-[48%]  md:w-[19%] hover:text-gray-300 mt-3 relative" key={index}>
                                <div className="">
                                    <div className="w-[180px] h-[250px] overflow-hidden rounded-md relative ">
                                        <Image src={item.poster_url} alt="" fill className="absolute hover:scale-125 duration-500" />
                                    </div>
                                    <h1 className="text-md mt-1">{item.name}</h1>
                                    <p className="text-gray-500 text-[15px]">{item.year}</p>
                                </div>
                                <div className="absolute bg-orange-700 top-[10px] left-0">
                                    <p className="py-[1px] px-1">FHD</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <>
                            <p>Không có dữ liệu...</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
