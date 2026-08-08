import Hero from '../components/Hero';
import GallerySlider from '../components/GallerySlider';
import About from '../components/About';
import VisionMission from '../components/VisionMission';
import ChairmanGreeting from '../components/ChairmanGreeting';
import Leaders from '../components/Leaders';
import Programs from '../components/Programs';
import News from '../components/News';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ChairmanGreeting />
      <GallerySlider />
      <About />
      <VisionMission />
      <Leaders />
      <Programs />
      <News />
      <Gallery />
      <Contact />
    </>
  );
}
