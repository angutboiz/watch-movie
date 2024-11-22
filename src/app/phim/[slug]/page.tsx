import React from "react";
import apiService from "@/lib/apiservice";
import DetailFilm from "@/app/component/DetailFilm";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    // read route params
    const slug = params.slug;

    // fetch data
    const movie = await apiService.get(`https://phim.nguonc.com/api/film/${slug}`);
    return {
        title: movie.movie?.name,
        description: movie.movie?.content,
        openGraph: {
            title: movie.movie?.name,
            description: movie.movie?.description,
            type: "website",
            images: movie.movie?.poster_url,
            url: "https://caphim.vercel.app/phim/" + slug,
        },
    };
}

export default async function Phim({ params }: Props) {
    const movie = await apiService.get(`https://phim.nguonc.com/api/film/${params.slug}`);

    return <DetailFilm data={movie.movie} />;
}
