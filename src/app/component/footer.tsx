import React from "react";
import { Pacifico } from "next/font/google";
const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });

export default function Footer() {
    return (
        <div className="mt-10 py-3 flex justify-center border-t-[1px] border-gray-200">
            <div className=" w-[1000px]   text-white">
                <div className="grid grid-cols-3 gap-2">
                    <div className="">
                        <div className={`text-3xl flex gap-1 ${pacifico.className}`}>
                            <h1 className="text-green-500">Cà </h1>
                            <h1 className="text-yellow-400 font-bold">Phim </h1>
                        </div>
                        <p>Trang web caphim số một về coi phim không quảng cáo</p>
                    </div>
                    <div className="">
                        <h1>Từ khoá liên quan</h1>
                        <p>Cà phim, caphim, caphim vercel, cà phim phim hay</p>
                    </div>
                    <div className="">
                        <h1>Theo dõi chúng tôi tại đây</h1>
                        <p>Facebook | Google | Twitter | Instagram</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
