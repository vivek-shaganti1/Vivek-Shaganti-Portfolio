"use client";

import React from "react";
import { motion } from "framer-motion";

// Individual Spotlight element
const Spotlight = ({ className, ...props }: any) => {
  return (
    <motion.div
      className={`spotlight ${className}`}
      {...props}
    />
  );
};

// SpotlightBackground container
const SpotlightBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="spotlight-container relative overflow-hidden bg-black/95 w-full h-full min-h-screen">
      <div className="spotlight-overlay absolute inset-0 pointer-events-none z-0 opacity-40">
        <Spotlight
          initial={{ x: "-50%", y: "-50%", rotate: "0deg" }}
          animate={{
            x: ["-50%", "-30%", "-70%", "-50%"],
            y: ["-50%", "-70%", "-30%", "-50%"],
            rotate: ["0deg", "15deg", "-15deg", "0deg"],
          }}
          transition={{
            duration: 12,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="spotlight-left absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[120px]"
        />

        <Spotlight
          initial={{ x: "0%", y: "0%", rotate: "0deg" }}
          animate={{
            x: ["0%", "20%", "-20%", "0%"],
            y: ["0%", "30%", "10%", "0%"],
            rotate: ["-20deg", "0deg", "20deg", "-20deg"],
          }}
          transition={{
            duration: 15,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay: 3,
          }}
          className="spotlight-mid absolute top-1/2 left-1/2 w-[700px] h-[700px] rounded-full bg-blue-500/10 blur-[150px]"
        />

        <Spotlight
          initial={{ x: "0%", y: "0%", rotate: "10deg" }}
          animate={{
            x: ["0%", "-30%", "10%", "0%"],
            y: ["0%", "-20%", "20%", "0%"],
            rotate: ["10deg", "-10deg", "25deg", "10deg"],
          }}
          transition={{
            duration: 18,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay: 5,
          }}
          className="spotlight-right absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-pink-500/10 blur-[125px]"
        />
      </div>

      <div className="spotlight-content relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default SpotlightBackground;
