import React, { Suspense } from 'react';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';
import ThemeToggle from './components/ui/ThemeToggle';
import Preloader from './components/ui/Preloader';
import PreloaderAnimations from './components/ui/PreloaderAnimations';
import Footer from './components/ui/Footer';
import ErrorBoundary from './components/ui/ErrorBoundary';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThreeProvider } from './contexts/ThreeContext';

// Lazy load Three.js components for better performance
const LazyThreeJSExperience = React.lazy(() => import('./components/three/ThreeJSExperience'));

function App() {
  return (
    <ThreeProvider>
      <ThemeProvider>
        <div className="App relative min-h-screen">
          <Preloader />
          <PreloaderAnimations />
          
          {/* Fixed 3D Scene Background */}
          <div className="experience fixed w-full h-full">
            <ErrorBoundary>
              <Suspense fallback={null}>
                <LazyThreeJSExperience />
              </Suspense>
            </ErrorBoundary>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Main Content */}
          <div className="page">
            <div className="page-wrapper">
              <section className="hero">
                <Hero />
              </section>
              <About />
              <Projects />
              <Experience />
              <Contact />
              <Footer />
            </div>
          </div>
        </div>
      </ThemeProvider>
    </ThreeProvider>
  );
}

export default App;
