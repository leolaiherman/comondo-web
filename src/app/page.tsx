"use client";

import NavigationBar from "@/components/navbar";
import OfferCard from "@/components/offerCard";
import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/footer";

export default function Home() {
    const offers = [
    {
      title: "Fresh Cream",
      description: "We use coconuts within 7 days of being handpicked",
      imgSrc: "freshquok.svg",
    },
    {
      title: "Longer shelf-life",
      description:
        "We have reimagined the traditional extraction process. While others expire in hours, our cream stays fresh and stable longer without compromising purity.",
      imgSrc: "longlifequok.svg",
    },
    {
      title: "100% Plant-Based",
      description:
        "Our product is dairy-free and vegan friendly. Made for everyone, whether you are vegan, lactose-intolerant, or just love a cleaner label.",
      imgSrc: "plantquok.svg",
    },
    {
      title: "No Cholesterol",
      description:
        "Our coconut cream is 100% plant-based and naturally free from cholesterol, making it a smarter, heart-friendly choice for your daily meals.",
      imgSrc: "nocholesquok.svg",
    },
  ];

  return (
    <section className="flex flex-col items-center min-h-screen bg-white text-gray-800">
      {/* Navigation */}
      <NavigationBar />

      {/* Hero Section */}
      {/* <section className="flex flex-col md:flex-row items-center justify-between w-full py-16 px-16 gap-16"> */}
      <section className="grid grid-cols-1 md:grid-cols-2 items-center w-full py-20 px-16 gap-16">
        <div className="text-center md:text-left mb-6 md:mb-0 flex flex-col gap-10" >
          <h1 className="text-[56px] leading-[64px] font-bold mb-0">
            Powered by coconut, driven by purpose
          </h1>
          <p className="text-[20px] leading-[24px] mb-0">
            From your kitchen to your table, we&apos;ve got you a fresh coconut every day.
          </p>
        </div>
        <div className="flex justify-end items-center">
          <img
            src="CoconutTree.png"
            width={554}
            height={484}
            alt="Coconut Beach"
            // className="w-[554px] rounded-[80px] shadow-[-4px_-8px_480px_-8px_rgba(0,0,0,0.25), inset_2px_2px_16px_0px_rgba(255,255,255,0.20)] outline-1 outline-white/40 backdrop-blur inline-flex flex-col justify-start items-start gap-2.5"
          className="rounded-[80px] outline-1 outline-white/40 backdrop-blur inline-flex flex-col justify-start"
          style={{
            boxShadow:
              "-4px -8px 48px -8px rgba(0,0,0,0.25), inset 2px 2px 16px 0px rgba(255,255,255,0.20)",
          }}
          />
        </div>
      </section>

      {/* Info Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 items-center w-full py-20 px-16 gap-16">
        {/* <div className="w-full md:w-1/3 mb-6 md:mb-0"> */}
        <div
          className=" p-8 bg-white rounded-[80px] outline-1 outline-white/40 backdrop-blur-md inline-flex justify-center"
          style={{
          boxShadow:
            "-8px 8px 30px -12px rgba(0,0,0,0.15), inset 0px 0px 21px 0px rgba(0,0,0,0.10), inset 0px 4px 16px 0px rgba(255,255,255,0.13)",
          }}
          >
          <img src="comondo_logo.png"
            width={554}
            height={484}
            alt="Comondo Logo" className="p-8 rounded-[80px]" />
        </div>
        {/* </div> */}
        <div className="w-full h-full flex flex-col justify-center text-center md:text-left gap-12">
          <div className="w-full text-left flex flex-col gap-6">
            <h2 className="text-[40px] leading-[56px] font-extrabold mb-0">What does Comondo mean?</h2>
            <p className="text-[20px] leading-[24px] mb-0">Co = Coconut (Italian)<br /><br />Mondo = World (Italian)<br /><br />Comondo =<b>The Coconut World</b></p>
          </div>
          <div className="w-full text-left flex flex-col gap-6">
            <h2 className="text-[40px] leading-[56px] font-extrabold mb-0">Why Comondo?</h2>
            <p className="text-[20px] leading-[24px] mb-0 ">We&apos;re inspired by the coconut, a remarkably versatile fruit that has nourished and supported people for generations.<br /><br /> Grown abundantly across Southeast Asia, especially in Indonesia, one of the world&apos;s top producers, it&apos;s a natural gift with many potentials.<br /> <br />At Comondo, we harness this local richness and global relevance to create purposeful coconut-based products that promote better living and a more sustainable future.</p>
          </div>
        </div>
      </section>

      {/* Happy Start Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 items-center w-full py-20 px-16 gap-8">
        <div className="w-full text-left flex flex-col gap-6">
          <h2 className="text-[40px] leading-[56px] font-extrabold mb-0">Our Happy Start!</h2>
          <p className="text-[20px] leading-[24px] mb-0 ">Like a Quokka beaming at the sunrise, Comondo began with a cheerful idea! </p>
        </div>
        <img src="quokka-landing.svg" width= {500} height={500} alt="Comondo Logo" className="w-full h-auto" />
        <div className="w-full text-left flex flex-col gap-6">
          <h2 className="text-[40px] leading-[56px] font-extrabold mb-0">Coco Cream</h2>
          <p className="text-[20px] leading-[24px] mb-0 ">We began by crafting fresh coconut cream, perfect for anyone’s cooking, making every dish pop with delight!</p>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="grid grid-rows-1 bg-white text-center w-full py-20 px-16 gap-8">
        <h2 className="text-[40px] leading-[56px] font-extrabold mb-0">
          What we have to offer
        </h2>
        <div
          className="flex overflow-x-auto snap-x snap-mandatory gap-8 px-16"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {offers.map((offer, index) => (
            <div
              key={index}
              // className="flex-shrink-0 w-[350px] snap-center"
              className="self-stretch inline-flex justify-start items-start py-4 gap-8 flex-wrap content-start"
              style={{ maxWidth: "360px" }}
            >
              <OfferCard
                title={offer.title}
                description={offer.description}
                imgSrc={offer.imgSrc}
              />
            </div>
          ))}
        </div>
      </section>


      {/*  */}
    {/* <section
    className="grid grid-rows-1 bg-white text-center w-full py-16 px-16 gap-8 relative"
    style={{ position: "relative", overflow: "hidden" }} // <-- Add overflow hidden here
    >
    <h2 className="justify-center text-[40px] leading-[56px] font-extrabold mb-0">
      What we have to offer
    </h2>
    <div className="relative">
      <div

    className="flex overflow-x-auto snap-x snap-mandatory gap-8 px-1 pr-16 scrollbar-hide" // <-- Add pr-16
    style={{
      scrollSnapType: "x mandatory",
      WebkitOverflowScrolling: "touch",
      scrollBehavior: "smooth",
      overflowY: "hidden",
      paddingRight: "64px", // <-- Ensure 64px right padding
    }}

    >
    {offers.map((offer, index) => (
      <motion.div
        key={index}
        className="self-stretch inline-flex justify-start items-start py-16 gap-8 flex-wrap content-start snap-center"
        style={{ maxWidth: "360px", minWidth: "320px" }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
      >
        <OfferCard
          title={offer.title}
          description={offer.description}
          imgSrc={offer.imgSrc}
        />
      </motion.div>
    ))}
    </div>
      <div className="absolute left-16 right-16 bottom-2 h-1 bg-gray-200 rounded-full overflow-hidden">

      </div>
    </div>
    </section> */}

      <section className="grid grid-cols-1 md:grid-cols-3 items-center justify-between w-full py-16 px-16 gap-8">
        <div className="w-full text-left flex flex-col gap-6">
          <h2 className="text-[40px] leading-[56px] font-extrabold mb-0">Our Happy Start!</h2>
          <p className="text-[20px] leading-[24px] mb-0 ">Like a Quokka beaming at the sunrise, Comondo began with a cheerful idea! </p>
        </div>
        <Image src="/quokka-landing.svg" width= {500} height={500} alt="Comondo Logo" className="w-full h-auto" />
        <div className="w-full text-left flex flex-col gap-6">
          <h2 className="text-[40px] leading-[56px] font-extrabold mb-0">Coco Cream</h2>
          <p className="text-[20px] leading-[24px] mb-0 ">We began by crafting fresh coconut cream, perfect for anyone’s cooking, making every dish pop with delight!</p>
        </div>
      </section>

      <Footer />



    </section>
  );
}
