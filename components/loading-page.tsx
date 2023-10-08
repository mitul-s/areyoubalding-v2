"use client";
import React from "react";
import Snowfall from "./snowflakes/Snowfall";
import { AnimatePresence, motion } from "framer-motion";

export default function Page() {
  const text = [
    "Counting your hairs",
    "Scratching your head",
    "Rubbing my shiny head",
  ];

  const [currentText, setCurrentText] = React.useState(text[0]);
  const [previousText, setPreviousText] = React.useState<string>("");

  React.useEffect(() => {
    const interval = setInterval(() => {
      let newText;
      do {
        newText = text[Math.floor(Math.random() * text.length)];
      } while (newText === currentText);
      setPreviousText(currentText);
      setCurrentText(newText);
    }, 2000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, [currentText, text]);
  return (
    <>
      <div className="flex items-center justify-center w-full h-full">
        <AnimatePresence mode="wait">
          {currentText !== previousText && (
            <motion.h1
              key={currentText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-black tracking-tighter text-7xl text-royal"
            >
              {currentText}
            </motion.h1>
          )}
        </AnimatePresence>
      </div>
      <Snowfall />
    </>
  );
}
