"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 bg-background overflow-hidden relative">
      <div className="w-full flex flex-col items-center text-center mb-20 px-6 md:px-12">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.4em] text-primary mb-4 block"
        >
          Biography
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-white relative z-10"
        >
          Who am I?
        </motion.h2>
        <div className="w-px h-8 bg-primary mt-8 opacity-50"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start w-full">
          {/* Left - Portrait with sophisticated modern design */}
          <div className="w-full flex justify-center lg:justify-end mt-12 lg:mt-0 lg:pr-4">
            <div className="relative w-full max-w-sm isolate z-10">
            {/* Decorative Grid Lines - Hidden on Mobile */}
            <div className="absolute -inset-10 border border-white/5 pointer-events-none z-0 hidden lg:block"></div>
            <div className="absolute -inset-20 border border-white/5 pointer-events-none z-0 hidden lg:block"></div>
            
            {/* Corner Brackets - Hidden on Mobile */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-primary/40 z-20 hidden lg:block"></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-primary/40 z-20 hidden lg:block"></div>

            {/* Side Vertical Line - Hidden on Mobile */}
            <div className="absolute top-1/4 bottom-1/4 -left-8 w-px bg-linear-to-b from-transparent via-primary/30 to-transparent hidden lg:block"></div>

            {/* Dotted Patterns - Simplified on Mobile */}
            <div className="absolute -top-6 -left-6 lg:-top-12 lg:-left-12 w-24 h-24 lg:w-48 lg:h-48 opacity-20 pointer-events-none z-0" 
                 style={{ backgroundImage: 'radial-gradient(circle, #fff 1.2px, transparent 1.2px)', backgroundSize: '16px 16px' }}>
            </div>
            <div className="absolute top-1/2 -right-8 lg:-right-16 w-16 h-32 lg:w-32 lg:h-64 opacity-10 pointer-events-none z-0 -translate-y-1/2" 
                 style={{ backgroundImage: 'radial-gradient(circle, var(--color-primary) 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}>
            </div>
            <div className="absolute -bottom-8 lg:-bottom-16 left-1/4 w-full h-16 lg:h-24 opacity-15 pointer-events-none z-0" 
                 style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '12px 12px' }}>
            </div>

            {/* Modern Floating Label - Hidden on Mobile */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 vertical-text text-[8px] uppercase tracking-[0.5em] text-white/30 font-mono z-20 rotate-90 origin-right whitespace-nowrap hidden lg:block">
              Design & Development / 2024
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-4/5 w-full z-10 shadow-3xl"
            >
              <div className="absolute inset-0 border border-primary/10 translate-x-4 translate-y-4"></div>
              <motion.div 
                className="relative w-full h-full overflow-hidden rounded-sm shadow-2xl group cursor-pointer"
                whileHover="hover"
                initial="initial"
              >
                {/* Pulsing Image */}
                <motion.div
                  className="relative w-full h-full"
                  variants={{
                    initial: { 
                      filter: ["grayscale(100%)", "grayscale(0%)", "grayscale(100%)"],
                    },
                    hover: { 
                      filter: "grayscale(0%)",
                      transition: { duration: 0.5, repeat: 0 }
                    }
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <Image
                    src="/images/about-portrait.png"
                    alt="Yohan Christmith Details"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </motion.div>
            </motion.div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="w-full pt-4 lg:pt-0 lg:pl-4 relative z-20">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-medium text-primary mb-4 block">About Me</span>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Yohan Christmith's Details
              </h3>
              
              <p className="text-white/60 leading-relaxed mb-8 text-lg font-light">
                I’m a Software Engineer based in Colombo, currently finishing my final year at SLIIT while building financial platforms at Simplebooks.
              </p>
              <p className="text-white/60 leading-relaxed mb-8 text-lg font-light">
                I specialize in the "engine room" of software—the complex backend logic, automated workflows, and security architectures that make products run smoothly. I’m currently fascinated by Multi-Agent AI Systems and how we can use them to build smarter, more resilient tools.
              </p>
              <p className="text-white/60 leading-relaxed mb-8 text-lg font-light">
                While I thrive on solving difficult logical puzzles, I find my "peace of mind" in UI/UX design. I treat frontend development as a creative outlet, ensuring that the heavy-duty tech I build is always wrapped in an aesthetic, world-class experience.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                <div>
                  <h4 className="text-white mb-4 uppercase tracking-widest text-[10px] opacity-40 font-bold">Details</h4>
                  <ul className="space-y-3 text-white/70">
                    <li className="flex gap-2">
                        <span className="text-primary font-bold">Birthday:</span> 
                        <span>April 21, 1996</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-primary font-bold">Age:</span> 
                        <span>28 Years</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-primary font-bold">Location:</span> 
                        <span>Colombo, Sri Lanka</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white mb-4 uppercase tracking-widest text-[10px] opacity-40 font-bold">Interests</h4>
                  <ul className="space-y-3 text-white/70">
                    <li>Backend & Automation</li>
                    <li>Security Architecture</li>
                    <li>Multi-Agent AI Systems</li>
                    <li>Aesthetic UI/UX Design</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
