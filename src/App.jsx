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

// Lazy load heavy Three.js components
const LazyThreeJSExperience = React.lazy(() => import('./components/three/ThreeJSExperience'));

function App() {
  return (
    <ThreeProvider>
      <ThemeProvider>
        <div className="App relative min-h-screen">
          <Preloader />
          <PreloaderAnimations />
          <div className="experience fixed w-full h-full">
            <ErrorBoundary>
              <Suspense fallback={
                <div className="flex items-center justify-center w-full h-full bg-gray-900">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading 3D Experience...</p>
                  </div>
                </div>
              }>
                <LazyThreeJSExperience />
              </Suspense>
            </ErrorBoundary>
          </div>
          <ThemeToggle />
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
