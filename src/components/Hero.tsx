"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import BackgroundParticles from "./BackgroundParticles";
import Scene3D from "./Scene3D";
import { Download, Play, X, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon, FacebookIcon, InstagramIcon } from "./SocialIcons";
import { motion, AnimatePresence } from "framer-motion";

const expertise = [
  "Associate Fullstack Engineer",
  "Workflow Automation Specialist",
  "Zero Trust Architecture Enthusiast",
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % expertise.length);
    }, 3000);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="flex flex-col md:flex-row items-stretch w-full min-h-screen">
        {/* Left Content */}
        <div className="relative w-full md:w-1/2 z-10 flex items-center justify-center p-6 md:p-12">
          <BackgroundParticles />
          <div className="relative z-10 max-w-2xl pt-20 md:pt-0">
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
                  <span className="w-12 h-0.5 bg-primary hidden md:block"></span>
                  I'm Yohan Christmith
                </h2>
              </div>

              <div className="h-12 mb-10 overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={expertise[index]}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0 text-sm md:text-base text-primary font-medium flex items-center justify-center md:justify-start uppercase"
                  >
                    {expertise[index]}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start">
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative overflow-hidden bg-primary text-background font-bold px-2.5! py-2.5! rounded-sm flex items-center gap-4 transition-all duration-300 shadow-[0_0_20px_rgba(0,195,137,0.3)] hover:shadow-[0_0_35px_rgba(0,195,137,0.5)] group"
                >
                  {/* Shimmer Sweep Effect */}
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.5,
                      ease: "easeInOut",
                      repeatDelay: 1
                    }}
                    className="absolute inset-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/30 to-transparent -skew-x-12 pointer-events-none"
                  />
                  
                  <Download className="w-5 h-5 relative z-10 group-hover:animate-bounce" />
                  <span className="relative z-10 uppercase tracking-widest text-sm">Download CV</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Content - Toggle between Portrait and 3D */}
        <div className="w-full md:w-1/2 relative min-h-125">
          <AnimatePresence mode="wait">
            {!show3D ? (
              <motion.div
                key="portrait"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full"
              >
                <div className="relative z-10 w-full h-full overflow-hidden">
                  <Image
                    src="/images/portrait.jpg"
                    alt="Yohan Christmith Portrait"
                    fill
                    priority
                    className="object-cover object-center brightness-90 grayscale-[0.1] hover:brightness-100 transition-all duration-700"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="3d-scene"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full bg-background"
              >
                <Scene3D />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div 
        onClick={() => setShow3D(!show3D)}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1.5 text-white/80 group cursor-pointer transition-all"
      >
        <div className={`w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all duration-300 ${show3D ? 'bg-primary border-primary shadow-[0_0_12px_rgba(0,195,137,0.3)]' : ''}`}>
          {show3D ? (
            <X className="w-3.5 h-3.5 text-background" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-white group-hover:fill-background transition-colors" />
          )}
        </div>
        <span className="text-[8px] font-bold tracking-[0.4em] uppercase opacity-40 group-hover:opacity-100 transition-opacity">
          {show3D ? "Stop 3D" : "Start 3D"}
        </span>
      </div>

      {/* Side Decorations */}
      <div className="absolute left-6 md:left-12 bottom-12 flex-col items-center gap-2 transform -rotate-90 origin-left hidden lg:flex">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">ENG LK</span>
      </div>

      <div className="absolute right-6 md:right-12 bottom-12 z-50 items-center gap-6 hidden md:flex">
        <span className="h-px w-12 bg-white/20"></span>
        <div className="flex gap-6 text-white/40">
            {/* Social Icons */}
            {[
              { Icon: GithubIcon, href: "#" },
              { Icon: LinkedinIcon, href: "#" },
              { Icon: XIcon, href: "#" },
              { Icon: FacebookIcon, href: "#" },
              { Icon: InstagramIcon, href: "#" },
              { Icon: Mail, href: "#" }
            ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary cursor-pointer transition-colors duration-300"
                >
                  <social.Icon className="w-5 h-5" />
                </a>
            ))}
        </div>
      </div>
    </section>
  );
}
