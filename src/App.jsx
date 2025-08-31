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
                <div className="footer-content">
                  <span className="footer__copyright">
                     © {new Date().getFullYear()} Safwan Sayeed. All rights reserved.
                  </span>
                  <div className="visit-counter-box flex items-center gap-2 bg-gray-800 text-gray-300 p-1.5 rounded-lg shadow-sm mt-2 sm:mt-0 sm:ml-4">
                    <span className="text-sm font-medium">🤵 Views</span>
                    <img
                      src="https://hits.sh/safwansayeed.live.svg?style=round&label= &color=black"
                      alt="visitor count"
                      className="h-6 w-12"
                    />
                  </div>
                </div>
              </footer>
              
            </div>
          </div>
        </div>
      </ThemeProvider>
    </ThreeProvider>
  );
}

export default App;
