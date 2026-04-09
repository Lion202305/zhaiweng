import { useEffect } from 'react';
import { TopBar } from '@/sections/TopBar';
import { Navbar } from '@/sections/Navbar';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Products } from '@/sections/Products';
import { Production } from '@/sections/Production';
import { Certificates } from '@/sections/Certificates';
import { News } from '@/sections/News';
import { Franchise } from '@/sections/Franchise';
import { Footer } from '@/sections/Footer';

function App() {
  useEffect(() => {
    // Smooth scroll polyfill for older browsers
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Top Info Bar */}
      <div className="hidden lg:block">
        <TopBar />
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Products Section */}
        <Products />

        {/* Production Section */}
        <Production />

        {/* Certificates Section */}
        <Certificates />

        {/* News Section */}
        <News />

        {/* Franchise Section */}
        <Franchise />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}

export default App;
