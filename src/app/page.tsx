import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      
      {/* Footer / Contact Section Placeholder */}
      <footer className="py-12 border-t border-white/5 bg-background">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-background font-bold text-xs">B</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Bioza
            </span>
          </div>
          
          <p className="text-white/40 text-sm">
            © 2026 Christmith Yohan. All rights reserved.
          </p>
          
          <div className="flex gap-6">
            {["Instagram", "Twitter", "LinkedIn"].map((social) => (
              <a key={social} href="#" className="text-white/40 hover:text-primary transition-all text-xs uppercase tracking-widest font-bold">
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
