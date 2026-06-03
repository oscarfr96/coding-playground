import Layout from './components/Layout';
import Hero from './components/Hero';
import Experience from './components/Experience';
import TechStack from './components/TechStack';
import Education from './components/Education';
import Projects from './components/Projects';
import WavyDivider from './components/WavyDivider';

function App() {
  return (
    <Layout>
      <div className="flex flex-col gap-14 py-10 md:gap-20 md:py-16">
        <Hero />
        <WavyDivider className="h-3.5 w-full text-accent/40" />
        <Experience />
        <WavyDivider className="h-3.5 w-full text-info-bright/60" />
        <TechStack />
        <WavyDivider className="h-3.5 w-full text-success-bright/70" />
        <Education />
        <WavyDivider className="h-3.5 w-full text-highlight/70" />
        <Projects />
      </div>
    </Layout>
  );
}

export default App;
