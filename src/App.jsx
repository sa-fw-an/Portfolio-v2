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
import { ThreeProvider } from './contexts/ThreeContext';

function App() {
  return (
    <ThreeProvider>
      <ThemeProvider>
        <div className="App relative min-h-screen">
          <Preloader />
          <PreloaderAnimations />
          <div className="experience fixed w-full h-full">
            <ThreeJSExperience />
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
              
              {/* Footer */}
              <footer className="footer">
                <span className="footer__copyright">
                  Copyright © 2025 - Safwan Sayeed
                </span>
              </footer>
              
            </div>
          </div>
        </div>
      </ThemeProvider>
    </ThreeProvider>
  );
}

export default App;
