import CustomCursor from './components/CustomCursor';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Problem from './sections/Problem';
import SystemDefinition from './sections/SystemDefinition';
import ProcessPipeline from './sections/ProcessPipeline';
import StatusWindow from './sections/StatusWindow';
import IdentitySystem from './sections/IdentitySystem';
import NXRFuel from './sections/NXRFuel';
import BeforeAfter from './sections/BeforeAfter';
import CorePrinciple from './sections/CorePrinciple';
import SignalStream from './sections/SignalStream';
import SystemBuilders from './sections/SystemBuilders';
import Roadmap from './sections/Roadmap';
import FinalCTA from './sections/FinalCTA';
import Footer from './sections/Footer';

export default function App() {
  return (
    <>
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <Problem />
        <SystemDefinition />
        <ProcessPipeline />
        <StatusWindow />
        <IdentitySystem />
        <NXRFuel />
        <BeforeAfter />
        <CorePrinciple />
        <SignalStream />
        <SystemBuilders />
        <Roadmap />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}