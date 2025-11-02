"use client";

import NavigationBar from "@/components/desktop/navbar";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import Footer from "@/components/desktop/footer";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/Home.module.css';
import { colors, typography } from '@/styles/designSystem';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import IconCard from '@/components/ui/IconCard';
import SDGBadge from '@/components/ui/SDGBadge';
import StatCard from '@/components/ui/StatCard';
import Card from '@/components/ui/Card';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

import coconutImg from "../../public/cocofruit.png";

// Deprecated page variant
// The canonical app route now renders `src/app/home.tsx` via `src/app/page.tsx`.
// This file is kept as a harmless placeholder to avoid confusion in editors.

export default function DeprecatedPage(): null {
  return null;
}

