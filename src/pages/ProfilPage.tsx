import About from '../components/About';
import GallerySlider from '../components/GallerySlider';
import VisionMission from '../components/VisionMission';
import ChairmanGreeting from '../components/ChairmanGreeting';
import Leaders from '../components/Leaders';

export default function ProfilPage() {
  return (
    <>
      <section className="pt-16 sm:pt-20 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              Profil DPC PKB Manokwari
            </h1>
            <p className="text-base text-slate-500 max-w-3xl mx-auto">
              Mengenal lebih dekat dengan Partai Kebangkitan Bangsa Kabupaten Manokwari
            </p>
          </div>
        </div>
      </section>
      <ChairmanGreeting />
      <GallerySlider />
      <About />
      <VisionMission />
      <Leaders />
    </>
  );
}
