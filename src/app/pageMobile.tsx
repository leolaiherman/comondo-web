"use client";

import NavigationBar from "@/components/mobile/navbar";
import OfferCard from "@/components/mobile/offerCard";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/mobile/footer";
import gsap from 'gsap';
import styles from '../styles/Home.module.css';

import coconutImg from "../../public/cocofruit.png";

function FallingCoconutImg({ startX, startZ, speed, resetY, containerHeight }: { startX: number, startZ: number, speed: number, resetY: number, containerHeight: number }) {
  const [y, setY] = useState(0);
  const [x, setX] = useState(0);

  useEffect(() => {
    setY(Math.random() * -containerHeight);
    setX(startX);
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
        left: `calc(${x * 100}% - 24px)`,
        top: y,
        width: 48,
        height: 48,
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
  const coconutCount = 16;
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(600);
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
        resetY: -48,
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

export default function HomeMobile() {
  useEffect(() => {
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

  // Animation variants remain the same

  return (
    <section className="flex flex-col items-center min-h-screen bg-white text-gray-800 px-4">
      <NavigationBar />

      {/* Hero Section */}
      <motion.section
        className="flex flex-col justify-center items-center min-h-screen w-full bg-white"
        style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}
      >
        <CoconutRainCanvasImg />
        <motion.div className={styles.heroText} style={{ position: "relative", zIndex: 1 }}>
          <motion.h1
            className="text-3xl font-bold mb-2 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Escape to Coconut Paradise
          </motion.h1>
          <motion.p
            className="text-base mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            Discover the tropical vibe with our immersive experience
          </motion.p>
          <motion.button
            className={styles.ctaButton + " w-full py-2 text-base"}
            whileHover={{ scale: 1.05, boxShadow: "0 2px 12px #ffe7c2" }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Explore Now
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Coconut Section */}
      <motion.section
        className="flex flex-col items-center w-full py-8 gap-8"
        style={{ minHeight: "60vh" }}
      >
        <h1 className="text-2xl font-bold mb-2 text-center">
          Powered by coconut, driven by purpose
        </h1>
        <p className="text-base mb-4 text-center">
          From your kitchen to your table, we&apos;ve got you a fresh coconut every day.
        </p>
        <div className="flex justify-center items-center w-full">
          <Image
            src="CoconutTree.png"
            width={320}
            height={240}
            alt="Coconut Beach"
            className="rounded-3xl"
            style={{
              boxShadow:
                "-2px -4px 24px -4px rgba(0,0,0,0.25), inset 1px 1px 8px 0px rgba(255,255,255,0.20)",
            }}
          />
        </div>
      </motion.section>

      {/* Info Section */}
      <motion.section
        className="flex flex-col items-center w-full py-8 gap-8"
        style={{ minHeight: "60vh" }}
      >
        <div
          className="p-4 bg-white rounded-3xl inline-flex justify-center w-full"
          style={{
            boxShadow:
              "-4px 4px 15px -6px rgba(0,0,0,0.15), inset 0px 0px 10px 0px rgba(0,0,0,0.10), inset 0px 2px 8px 0px rgba(255,255,255,0.13)",
          }}
        >
          <Image src="comondo_logo.png"
            width={320}
            height={240}
            alt="Comondo Logo" className="p-4 rounded-3xl" />
        </div>
        <div className="w-full flex flex-col justify-center text-center gap-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-extrabold mb-0">What does Comondo mean?</h2>
            <p className="text-base mb-0">Co = Coconut (Italian)<br /><br />Mondo = World (Italian)<br /><br />Comondo =<b>The Coconut World</b></p>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-extrabold mb-0">Why Comondo?</h2>
            <p className="text-base mb-0 ">We&apos;re inspired by the coconut, a remarkably versatile fruit that has nourished and supported people for generations.<br /><br /> Grown abundantly across Southeast Asia, especially in Indonesia, one of the world&apos;s top producers, it&apos;s a natural gift with many potentials.<br /> <br />At Comondo, we harness this local richness and global relevance to create purposeful coconut-based products that promote better living and a more sustainable future.</p>
          </div>
        </div>
      </motion.section>

      {/* Happy Start Section */}
      <motion.section
        className="flex flex-col items-center w-full py-8 gap-8"
        style={{ minHeight: "60vh" }}
      >
        <h2 className="text-xl font-extrabold mb-0 text-center">Our Happy Start!</h2>
        <p className="text-base mb-0 text-center">Like a Quokka beaming at the sunrise, Comondo began with a cheerful idea!</p>
        <Image src="quokka-landing.svg" width={240} height={240} alt="Comondo Logo" className="w-full h-auto" />
        <h2 className="text-xl font-extrabold mb-0 text-center">Coco Cream</h2>
        <p className="text-base mb-0 text-center">We began by crafting fresh coconut cream, perfect for anyone’s cooking, making every dish pop with delight!</p>
      </motion.section>

      {/* What We Offer Section */}
      <motion.section
        className="flex flex-col bg-white text-center w-full py-8 gap-8"
        style={{ minHeight: "60vh" }}
      >
        <motion.h2
          className="text-xl font-extrabold mb-0"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          What we have to offer
        </motion.h2>
        <div
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-2"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              className="self-stretch inline-flex justify-start items-start py-2 gap-4 flex-wrap content-start"
              style={{ maxWidth: "240px" }}
              custom={index}
              initial="hidden"
              whileInView="visible"
              exit="exit"
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