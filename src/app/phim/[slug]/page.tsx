import React from "react";

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
    console.log(data.episodes[0].server_data[0].link_embed);
    return (
        <div className="">
            <div className="flex justify-center">
                <div className="w-[1000px] flex gap-5 justify-between items-center">
                    <div className="">
                        <div className="flex items-center cursor-pointer">
                            <p>Phim &gt; {data.movie.name}</p>
                        </div>
                        <div className="">
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
                    </div>
                </div>
            </div>
        </div>
    );
}
