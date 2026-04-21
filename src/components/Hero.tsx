"use client";

import Image from "next/image";
import { Download, Play } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="flex flex-col md:flex-row items-stretch w-full min-h-screen">
        {/* Left Content */}
        <div className="w-full md:w-1/2 z-10 flex items-center justify-center p-6 md:p-12">
          <div className="max-w-2xl pt-20 md:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center md:text-left"
            >
              <h1 className="text-7xl md:text-9xl font-bold text-white mb-4 flex items-baseline justify-center md:justify-start">
                Hello<span className="text-primary ml-1">.</span>
              </h1>

              <div className="relative inline-block mb-6">
                <h2 className="text-2xl md:text-4xl font-medium text-white flex items-center justify-center md:justify-start gap-3">
                  <span className="w-12 h-[2px] bg-primary hidden md:block"></span>
                  I'm Christmith Yohan
                </h2>
              </div>

              <p className="text-lg md:text-xl text-white/60 mb-10 tracking-wide font-light">
                Professional Graphics Designer
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start">
                <button className="bg-primary hover:bg-primary/90 text-background font-semibold px-8 py-4 rounded-sm flex items-center gap-3 transition-all duration-300 transform hover:scale-105 active:scale-95 group">
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  Download CV
                </button>

                <div className="flex items-center gap-4 text-white/80 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all">
                    <Play className="w-4 h-4 fill-white group-hover:fill-background" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Content - Portrait (Moved to edge) */}
        <div className="w-full md:w-1/2 relative min-h-[500px]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full"
          >
            {/* The white circle in the design - Commented out as requested */}
            {/* 
            <div className="absolute top-1/2 -right-20 transform -translate-y-1/2 w-[300px] h-[300px] bg-white rounded-full opacity-10 blur-3xl hidden md:block"></div>
            <div className="absolute top-1/2 -right-40 transform -translate-y-1/2 w-[400px] h-[400px] bg-white rounded-full hidden md:block"></div>
            */}

            <div className="relative z-10 w-full h-full overflow-hidden">
              <Image
                src="/images/portrait.jpg"
                alt="Christmith Yohan Portrait"
                fill
                priority
                className="object-cover object-center brightness-90 grayscale-[0.1] hover:brightness-100 transition-all duration-700 scale-110"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Side Decorations */}
      <div className="absolute left-6 md:left-12 bottom-12 flex flex-col items-center gap-2 transform -rotate-90 origin-left hidden lg:flex">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">ENG AUS</span>
      </div>

      <div className="absolute right-6 md:right-12 bottom-12 flex items-center gap-6 hidden md:flex">
        <span className="h-[1px] w-12 bg-white/20"></span>
        <div className="flex gap-4 text-white/40">
            {/* Social Icons Placeholder */}
            {["f", "s", "y", "i"].map((s) => (
                <span key={s} className="hover:text-primary cursor-pointer transition-colors text-sm font-semibold uppercase">{s}</span>
            ))}
        </div>
      </div>
    </section>
  );
}
