"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const links = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Expertise", href: "#expertise" },
  { name: "Work", href: "#work" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4! pointer-events-none">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`glass-header rounded-full px-10 py-4 flex items-center gap-16 pointer-events-auto transition-all duration-500 ${
            isScrolled ? "scale-95" : "scale-100"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0 ml-4! md:ml-6!">
            <Image 
              src="/logo.svg" 
              alt="Yohan Logo" 
              width={32} 
              height={32} 
              className="w-8 h-8 md:w-12 md:h-12" 
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-2">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative px-3! py-1.5! text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors group"
              >
                <span className="relative z-10">{link.name}</span>
                <motion.div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  layoutId="nav-pill"
                />
              </Link>
            ))}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4 shrink-0 mr-4! md:mr-6!">
            <button className="hidden md:flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-[9px] font-black uppercase tracking-widest px-5! py-2! rounded-full hover:bg-primary hover:text-background transition-all group">
              Let's Work
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white pr-4! hover:bg-white/10 rounded-full transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-60 glass-header flex flex-col p-12 md:hidden"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-xs font-black uppercase tracking-widest text-primary">Menu</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {links.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-4xl font-bold text-white hover:text-primary transition-colors flex items-center justify-between group"
                  >
                    {link.name}
                    <ArrowRight className="w-8 h-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto">
              <button className="w-full bg-primary text-background font-black uppercase tracking-widest py-6 rounded-2xl flex items-center justify-center gap-3">
                Let's Work Together
                <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-5 h-5" />
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
