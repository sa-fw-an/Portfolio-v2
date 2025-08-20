import React from 'react';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';
import ThreeJSExperience from './components/three/ThreeJSExperience';
import ThemeToggle from './components/ui/ThemeToggle';
import Preloader from './components/ui/Preloader';
import PreloaderAnimations from './components/ui/PreloaderAnimations';
import { ThemeProvider } from './contexts/ThemeContext';
import { AnimationProvider } from './contexts/AnimationContext';
import { ThreeProvider } from './contexts/ThreeContext';

function App() {
  return (
    <ThreeProvider>
      <ThemeProvider>
        <AnimationProvider>
          <div className="App relative min-h-screen">
            <Preloader />
            <PreloaderAnimations />
            
            {/* Fixed Three.js Experience */}
            <div className="experience fixed w-full h-full">
              <ThreeJSExperience />
            </div>
            
            {/* Theme Toggle */}
            <div className="toggle-bar">
              <ThemeToggle />
            </div>
            
            {/* Page Content */}
            <div className="page">
              <div className="page-wrapper">
                
                {/* Hero Section */}
                <section className="hero">
                  <Hero />
                </section>
                
                {/* Intro Text */}
                <div className="intro-text">
                  Click on the cube and scroll to get started!
                </div>
                
                {/* Arrow indicator */}
                <div className="arrow-svg-wrapper">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 14.95q-.2 0-.375-.063-.175-.062-.325-.212L6.675 10.05q-.275-.275-.262-.688.012-.412.287-.687.275-.275.7-.275.425 0 .7.275l3.9 3.9 3.925-3.925q.275-.275.688-.263.412.013.687.288.275.275.275.7 0 .425-.275.7l-4.6 4.6q-.15.15-.325.212-.175.063-.375.063Z"/>
                  </svg>
                </div>
                
                {/* First Move Section Margin */}
                <div className="first-move section-margin"></div>
                
                {/* About Section */}
                <section className="section first-section left">
                  <div className="progress-wrapper progress-bar-wrapper-left">
                    <div className="progress-bar"></div>
                  </div>
                  <About />
                </section>
                
                {/* Second Move Section Margin */}
                <div className="second-move section-margin"></div>
                
                {/* Projects Section */}
                <section className="section second-section right">
                  <div className="progress-wrapper progress-bar-wrapper-right">
                    <div className="progress-bar blue-background"></div>
                  </div>
                  <Projects />
                </section>
                
                {/* Third Move Section Margin */}
                <div className="third-move section-margin"></div>
                
                {/* Experience Section */}
                <section className="section third-section left">
                  <div className="progress-wrapper progress-bar-wrapper-left">
                    <div className="progress-bar green-background"></div>
                  </div>
                  <Experience />
                </section>
                
                {/* Fourth Move Section Margin */}
                <div className="fourth-move section-margin"></div>
                
                {/* Contact Section */}
                <section className="section fourth-section right">
                  <div className="progress-wrapper progress-bar-wrapper-right">
                    <div className="progress-bar"></div>
                  </div>
                  <Contact />
                </section>
                
                {/* Footer */}
                <footer className="footer">
                  <span className="footer__copyright">
                    Copyright &copy; 2025 - Safwan Sayeed
                  </span>
                </footer>
                
              </div>
            </div>
          </div>
        </AnimationProvider>
      </ThemeProvider>
    </ThreeProvider>
  );
}

export default App;
