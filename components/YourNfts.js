import React, { useState, useEffect, useCallback } from "react";
import { getNftsMintedBySelectedAddress, getNftsDataForMinter } from "../utils/interact"
import { PrevButton, NextButton } from "./EmblaCarouselButtons";
import useEmblaCarousel from "embla-carousel-react";

export default function YourNfts() {
    const [viewportRef, embla] = useEmblaCarousel({
        containScroll: "trimSnaps",
        dragFree: true,
    });
    const [status_minted_image, setStatusMintedImage] = useState("")
    const [status_sel_addr, setStatusSelAddr] = useState("")
    const [ok, setOk] = useState(true)
    const [ok_sel_addr, setOkSelAddr] = useState(true)
    const [toReturn, setToReturn] = useState([])
    const [last, setLast] = useState([])
    //
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
    const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

    const onSelect = useCallback(() => {
        if (!embla) return;
        setPrevBtnEnabled(embla.canScrollPrev());
        setNextBtnEnabled(embla.canScrollNext());
    }, [embla]);

    const onScroll = useCallback(() => {
        if (!embla) return;
        const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
        setScrollProgress(progress * 100);
    }, [embla, setScrollProgress]);


    useEffect(() => {
        getMintedNFTs()
        getMyImagesMinted()

    }, [])

    const getMintedNFTs = async () => {
        let { status, last, ok } = await getNftsMintedBySelectedAddress()
        setStatusSelAddr(status)
        setOkSelAddr(ok)
        console.log("last arr")
        setLast(last)
        console.log(last)
    }
    const getMyImagesMinted = async () => {
        let { toReturn, ok, status } = await getNftsDataForMinter()
        setStatusMintedImage(status)
        setOk(ok)
        setToReturn(toReturn)
        console.log("to return arr")
        console.log(toReturn)
    }
    return (
        <div id="your_nfts">
            <div className=" flex flex-col items-center justify-center sm:px-0 px-6 z-20 pb-32">
                <div className="md:py-36 py-20">
                    <h1
                        role="heading"
                        className="xl:text-6xl md:text-4xl text-xl font-bold leading-10 text-white"
                    >
                        Your NFTs section
                    </h1>
                </div>
                {toReturn.length === 0 && (
                   <div role="alert">
                   <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                     NFT
                   </div>
                   <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                     <p>{status_sel_addr}</p>
                   </div>
                 </div>

                )}

                {toReturn.length !== 0 && ok_sel_addr && (
                   <div className="bg-indigo-900 text-center py-4 lg:px-4">
                   <div className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                     <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">NFT</span>
                     <span className="font-semibold mr-2 text-left flex-auto">{status_sel_addr}</span>
                     <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
                   </div>
                 </div>
                )}
            </div>

            {toReturn.length > 0 && ok && (
                <div id="your_gallery" className="py-20 mt-16 bg-secondary">
                    <div className="container max-w-6xl mx-auto">
                        <h2 className="mb-10 text-5xl font-bold text-center text-white">
                            Your NFTs minted
                        </h2>
                        <div className="embla">
                            <div className="embla__viewport" ref={viewportRef}>
                                <div className="embla__container">
                                    {toReturn.map((nft, index) => (
                                        <div className="embla__slide" key={index}>
                                            <div className="embla__slide__inner">
                                                <img
                                                    className="embla__slide__img"
                                                    style={{ height: 168, width: 150 }}
                                                    src={nft.image}
                                                    alt={"NFT"}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
                            <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
                        </div>
                        <div className="embla__progress">
                            <div
                                className="embla__progress__bar"
                                style={{ transform: `translateX(${scrollProgress}%)` }}
                            />
                        </div>
                    </div>
                </div>
            )}


        </div>

    )
}