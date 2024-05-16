import Image from "next/image";
import Link from "next/link";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export default async function Phimbo() {
    async function getData() {
        const res = await fetch(
            "https://phimapi.com/v1/api/danh-sach/phim-bo?page=1"
        );

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        return res.json();
    }

    const data = await getData();
    return (
        <div className="flex justify-center">
            <div className="w-[1000px]">
                <div className="">Phim bộ</div>
                <div className="flex flex-wrap">
                    {data.data.items.map((item: any, index: any) => (
                        <Link
                            href={`phim/${item.slug}`}
                            className="flex w-[200px] hover:text-red-700 mt-3"
                            key={index}
                        >
                            <div className="">
                                <div className="w-[180px] h-[250px] overflow-hidden rounded-md relative">
                                    <Image
                                        src={`https://img.phimapi.com/${item.poster_url}`}
                                        alt=""
                                        fill
                                        className="absolute hover:scale-125 duration-500"
                                    />
                                </div>
                                <h1 className="text-md mt-1">{item.name}</h1>
                                <p className="text-gray-500 text-[15px]">
                                    {item.year}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
