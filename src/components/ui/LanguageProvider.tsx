"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import en from "@/locales/en.json";
import id from "@/locales/id.json";

type LocaleMap = typeof en;

type TranslationContextType = {
  lang: "en" | "id";
  setLang: (l: "en" | "id") => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

function lookup(obj: any, key: string) {
  return key.split(".").reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<"en" | "id">("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("locale");
      if (stored === "id" || stored === "en") setLangState(stored);
    } catch (e) {
      // ignore
    }
  }, []);

  const setLang = (l: "en" | "id") => {
    setLangState(l);
    try {
      localStorage.setItem("locale", l);
    } catch (e) {}
  };

  const t = (key: string, vars?: Record<string, string | number>) => {
    const dict: LocaleMap = lang === "id" ? (id as any) : (en as any);
    const raw = lookup(dict, key) as string | undefined;
    if (!raw) return key;
    if (!vars) return raw;
    return Object.entries(vars).reduce((s, [k, v]) => s.replace(new RegExp(`{${k}}`, "g"), String(v)), raw);
  };

  return (
    <TranslationContext.Provider value={{ lang, setLang, t }}>{children}</TranslationContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(TranslationContext);
  if (!ctx) throw new Error("useTranslation must be used inside LanguageProvider");
  return ctx;
}

export default LanguageProvider;
