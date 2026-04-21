"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
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
            className="text-4xl md:text-6xl font-bold text-white"
          >
            Who am I?
          </motion.h2>
          <div className="w-[1px] h-12 bg-primary mx-auto mt-8"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left - Portrait with dots */}
          <div className="w-full lg:w-5/12 relative">
            <div className="absolute -top-6 -left-6 grid grid-cols-6 gap-2 opacity-30">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] w-full"
            >
              <div className="absolute inset-0 border border-primary/20 translate-x-4 translate-y-4"></div>
              <div className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-700 overflow-hidden">
                <Image
                  src="/images/portrait.jpg"
                  alt="Christmith Yohan Details"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>

          {/* Right - Content */}
          <div className="w-full lg:w-7/12">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-medium text-primary mb-4 block">About Me</span>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Christmith Yohan's Details
              </h3>
              
              <p className="text-white/60 leading-relaxed mb-8 text-lg font-light italic">
                "Monotonectally orchestrate professionals supply chains whereas are metrics. Globally procrastinate backward-compatible application action items. Collaboratively enhance extensibl collaboration and it's through interdependent opportunities."
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
                        <span>San Francisco, USA</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white mb-4 uppercase tracking-widest text-[10px] opacity-40 font-bold">Interests</h4>
                  <ul className="space-y-3 text-white/70">
                    <li>Graphics Design</li>
                    <li>Brand Identity</li>
                    <li>UI/UX Solutions</li>
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
