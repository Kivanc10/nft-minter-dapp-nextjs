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
                    <div>
                        {last.length === 0 && !ok_sel_addr && (
                            <div className="flex items-center justify-center px-4 py-4 mt-8 font-semibold text-white bg-red-400 rounded-md ">
                                {status_sel_addr}
                            </div>
                        )}
                    </div>

                )}

                {toReturn.length !== 0 && ok_sel_addr && (
                    <div className="flex items-center justify-center px-4 py-4 mt-8 font-semibold text-white bg-red-400 rounded-md ">
                        {status_sel_addr}
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