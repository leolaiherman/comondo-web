"use client";

import NavigationBar from "@/components/desktop/navbar";
import OfferCard from "@/components/desktop/offerCard";
import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/desktop/footer";

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useInView } from "react-intersection-observer";

import coconutImg from "../../public/cocofruit.png";

function FallingCoconutImg({ startX, startZ, speed, resetY, containerHeight }: { startX: number, startZ: number, speed: number, resetY: number, containerHeight: number }) {
  const [y, setY] = useState(0);
  const [x, setX] = useState(0);

  useEffect(() => {
    setY(Math.random() * -containerHeight);
    setX(startX);
    // eslint-disable-next-line
  }, [containerHeight, startX]);

  useEffect(() => {
    let frameId: number;
    const animate = () => {
      setY(prevY => {
        let nextY = prevY + speed;
        if (nextY > containerHeight) {
          nextY = Math.random() * -100 - 50;
        }
        return nextY;
      });
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [speed, containerHeight]);

  return (
    <img
      src={coconutImg.src}
      alt="Coconut"
      style={{
        position: "absolute",
        left: `calc(${x * 100}% - 32px)`,
        top: y,
        width: 64,
        height: 64,
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 0,
        opacity: 0.92,
        filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))"
      }}
      draggable={false}
    />
  );
}

function CoconutRainCanvasImg() {
  const coconutCount = 24;
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(800);
  const [coconuts, setCoconuts] = useState<
    { key: number; startX: number; startZ: number; speed: number; resetY: number }[]
  >([]);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight);
    }
    const handleResize = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.offsetHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
  setCoconuts(
    Array.from({ length: coconutCount }, (_, i) => ({
      key: i,
      startX: Math.random(),
      startZ: 0,
      speed: 1 + Math.random() * 2,
      resetY: -64,
    }))
  );
}, [coconutCount]);

  return (
    <div
      ref={containerRef}
      className={styles.canvasContainer}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {coconuts.map(({ key, startX, startZ, speed, resetY }) => (
        <FallingCoconutImg
          key={key}
          startX={startX}
          startZ={startZ}
          speed={speed}
          resetY={resetY}
          containerHeight={containerHeight}
        />
      ))}
    </div>
  );
}


export default function Home() {
  useEffect(() => {
    // GSAP animations for hero text
    gsap.fromTo(
      `.${styles.heroText}`,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 1 }
    );
    gsap.fromTo(
      `.${styles.canvasContainer}`,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out', delay: 0.5 }
    );
  }, []);
    const offers = [
    {
      title: "Fresh Cream",
      description: "We use coconuts within 7 days of being handpicked",
      imgSrc: "freshquok.svg",
    },
    // {
    //   title: "Longer shelf-life",
    //   description:
    //     "We have reimagined the traditional extraction process. While others expire in hours, our cream stays fresh and stable longer without compromising purity.",
    //   imgSrc: "longlifequok.svg",
    // },
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
  const heroVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 60 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1, ease: "easeOut" as const } },
  exit: { opacity: 0, scale: 0.92, y: 60, transition: { duration: 0.5 } }
  };

  const coconutSectionVariants = {
    hidden: { opacity: 0, x: -80, rotateY: -10 },
    visible: { opacity: 1, x: 0, rotateY: 0, transition: { duration: 1, ease: "backOut" as const } },
    exit: { opacity: 0, x: 80, rotateY: 10, transition: { duration: 0.5 } }
  };

  const infoSectionVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: "anticipate" as const} },
    exit: { opacity: 0, y: -80, scale: 0.96, transition: { duration: 0.5 } }
  };

  const happyStartVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -8 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 1, ease: "circOut" as const} },
    exit: { opacity: 0, scale: 0.8, rotate: 8, transition: { duration: 0.5 } }
  };

  const offerSectionVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" as const } },
    exit: { opacity: 0, scale: 0.96, transition: { duration: 0.5 } }
  };

  const offerCardVariants = {
  hidden: { opacity: 0, y: 40, rotate: -4 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" as const}
  }),
  exit: { opacity: 0, y: 40, rotate: 4, transition: { duration: 0.4 } }
  };

  const offerCardsContainerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
  };

  return (
    <section className="flex flex-col items-center min-h-screen bg-white text-gray-800">
      {/* Navigation */}
      <NavigationBar />

        {/* Hero Section with 3D Coconut */}
      <motion.section
  className="flex flex-col justify-center items-center min-h-screen w-full bg-white"
  style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}
  variants={heroVariants}
  initial="hidden"
  whileInView="visible"
  exit="exit"
  viewport={{ once: false, amount: 0.7 }}
>
  <CoconutRainCanvasImg />
  <motion.div className={styles.heroText} style={{ position: "relative", zIndex: 1 }}>
    <motion.h1
    className="text-[56px] leading-[64px] font-bold mb-0"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.7 }}
    >
      Escape to Coconut Paradise
    </motion.h1>
    <motion.p
        className="text-[20px] leading-[24px] mb-0 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.7 }}
    >
        Discover the tropical vibe with our immersive experience
    </motion.p>
    <motion.button
        className={`${styles.ctaButton} font-bold`}
        whileHover={{ scale: 1.08, boxShadow: "0 4px 24px #ffe7c2" }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 300 }}
    >
      Explore Now
    </motion.button>
  </motion.div>
</motion.section>

      {/* Hero Section */}
      {/* <section className="flex flex-col md:flex-row items-center justify-between w-full py-16 px-16 gap-16"> */}
      <motion.section
        className="grid grid-cols-1 md:grid-cols-2 items-center w-full py-20 px-16 gap-16"
        style={{ minHeight: "100vh" }}
        variants={coconutSectionVariants}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.4 }}
      >
        <div className="text-center md:text-left mb-6 md:mb-0 flex flex-col gap-10" >
          <h1 className="text-[56px] leading-[64px] font-bold mb-0">
            Powered by coconut, driven by purpose
          </h1>
          <p className="text-[20px] leading-[24px] mb-0">
            From your kitchen to your table, we&apos;ve got you a fresh coconut every day.
          </p>
        </div>
        <div className="flex justify-end items-center">
          <Image
            src="CoconutTree.png"
            width={554}
            height={484}
            alt="Coconut Beach"
            className="rounded-[80px] outline-1 outline-white/40 backdrop-blur inline-flex flex-col justify-start"
            style={{
              boxShadow:
                "-4px -8px 48px -8px rgba(0,0,0,0.25), inset 2px 2px 16px 0px rgba(255,255,255,0.20)",
            }}
          />
        </div>
      </motion.section>

      {/* Info Section */}
      <motion.section
        className="grid grid-cols-1 md:grid-cols-2 items-center w-full py-20 px-16 gap-16"
        style={{ minHeight: "100vh" }}
        variants={infoSectionVariants}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.4 }}
      >
        <div
          className=" p-8 bg-white rounded-[80px] outline-1 outline-white/40 backdrop-blur-md inline-flex justify-center"
          style={{
            boxShadow:
              "-8px 8px 30px -12px rgba(0,0,0,0.15), inset 0px 0px 21px 0px rgba(0,0,0,0.10), inset 0px 4px 16px 0px rgba(255,255,255,0.13)",
          }}
        >
          <Image src="comondo_logo.png"
            width={554}
            height={484}
            alt="Comondo Logo" className="p-8 rounded-[80px]" />
        </div>
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
      </motion.section>


      {/* Happy Start Section */}
      <motion.section
        className="grid grid-cols-1 md:grid-cols-3 items-center w-full py-20 px-16 gap-8"
        style={{ minHeight: "100vh" }}
        variants={happyStartVariants}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.4 }}
      >
        <div className="w-full text-left flex flex-col gap-6">
          <h2 className="text-[40px] leading-[56px] font-extrabold mb-0">Our Happy Start!</h2>
          <p className="text-[20px] leading-[24px] mb-0 ">Like a Quokka beaming at the sunrise, Comondo began with a cheerful idea! </p>
        </div>
        <Image src="quokka-landing.svg" width={500} height={500} alt="Comondo Logo" className="w-full h-auto" />
        <div className="w-full text-left flex flex-col gap-6">
          <h2 className="text-[40px] leading-[56px] font-extrabold mb-0">Coco Cream</h2>
          <p className="text-[20px] leading-[24px] mb-0 ">We began by crafting fresh coconut cream, perfect for anyone’s cooking, making every dish pop with delight!</p>
        </div>
      </motion.section>

      {/* What We Offer Section */}
      <motion.section
        className="grid grid-rows-1 bg-white text-center w-full py-20 px-16 gap-8"
        style={{ minHeight: "100vh" }}
        variants={offerCardsContainerVariants}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.3 }}
      >
        <motion.h2
          className="text-[40px] leading-[56px] font-extrabold mb-0"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          What we have to offer
        </motion.h2>
        <div
          className="flex overflow-x-auto snap-x snap-mandatory gap-8 px-16"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              className="self-stretch inline-flex justify-start items-start py-4 gap-8 flex-wrap content-start"
              style={{ maxWidth: "360px" }}
              custom={index}
              variants={offerCardVariants}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: false, amount: 0.3 }}
            >
              <OfferCard
                title={offer.title}
                description={offer.description}
                imgSrc={offer.imgSrc}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>
      <Footer />
    </section>
  );
}
