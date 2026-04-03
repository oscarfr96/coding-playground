import Layout from './components/Layout';
import Hero from './components/Hero';
import Experience from './components/Experience';
import TechStack from './components/TechStack';
import Projects from './components/Projects';

function App() {
  return (
    <Layout>
      <div className="flex flex-col gap-16 md:gap-24 py-10 md:py-20">
        <Hero />
        <Experience />
        <TechStack />
        <Projects />
      </div>
    </Layout>
  );
}

export default App;
