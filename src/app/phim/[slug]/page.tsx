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
    const movie = await apiService.get(`https://apii.online/apii/phim/${slug}`);
    return {
        title: movie.movie?.name,
        description: movie.movie?.content,
        openGraph: {
            images: movie.movie?.thumb_url,
        },
    };
}

export default async function Phim({ params }: Props) {
    const movie = await apiService.get(`https://apii.online/apii/phim/${params.slug}`);
    return <DetailFilm data={movie} />;
}
