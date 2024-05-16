import Image from "next/image";
import Link from "next/link";

export default async function Home() {
    async function getData() {
        const res = await fetch(
            "https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=1"
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
                <div className="">Xem phim mới cập nhật</div>
                <div className="flex flex-wrap justify-between px-3 md:p-0">
                    {data.items.map((item: any, index: any) => (
                        <Link
                            href={`phim/${item.slug}`}
                            className="flex w-[200px] hover:text-gray-300 mt-3"
                            key={index}
                        >
                            <div className="">
                                <div className="w-[180px] h-[250px] overflow-hidden rounded-md relative">
                                    <Image
                                        src={item.poster_url}
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
            </div>
        </div>
    );
}
