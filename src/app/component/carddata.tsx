import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CardData(props: any) {
    const data = props.data;
    return (
        <div className="flex flex-wrap justify-between items-center px-3 md:p-0">
            {data.map((item: any, index: any) => (
                <Link
                    href={`phim/${item.slug}`}
                    className="flex items-center justify-center w-[200px] hover:text-gray-300 mt-3"
                    key={index}
                >
                    <div className=" w-[100%]">
                        <div className="h-[250px] overflow-hidden rounded-md relative">
                            <Image
                                src={`https://img.phimapi.com/${item.poster_url}`}
                                alt=""
                                fill
                                className="absolute hover:scale-125 duration-500 object-cover"
                            />
                        </div>
                        <h1 className="text-md mt-1 line-clamp-1">
                            {item.name}
                        </h1>
                        <p className="text-gray-500 text-[15px]">{item.year}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
