import { useState } from 'react';
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

const faqs = [
  {
    question: 'Apa saja layanan yang tersedia di DPCPKB Manokwari?',
    answer: 'DPCPKB Manokwari menyediakan berbagai layanan termasuk program Keluarga Berencana (KB), konsultasi kesehatan reproduksi, edukasi masyarakat, program Kampung KB, pembinaan keluarga, perlindungan anak, pengelolaan data kependudukan, dan bantuan sosial untuk keluarga prasejahtera.',
  },
  {
    question: 'Apakah semua layanan KB benar-benar gratis?',
    answer: 'Ya, seluruh layanan KB di DPCPKB Manokwari tersedia secara gratis untuk seluruh masyarakat Kabupaten Manokwari. Ini termasuk konsultasi, alat kontrasepsi, pemasangan, dan pemeriksaan rutin. Tidak ada biaya yang dibebankan kepada peserta.',
  },
  {
    question: 'Bagaimana cara mendaftar program Kampung KB?',
    answer: 'Untuk mendaftar program Kampung KB, masyarakat dapat mengunjungi kantor DPCPKB Manokwari atau menghubungi petugas lapangan KB (PLKB) di distrik masing-masing. Pendaftaran juga bisa dilakukan melalui Posyandu terdekat atau menghubungi hotline kami.',
  },
  {
    question: 'Metode KB apa saja yang tersedia?',
    answer: 'Kami menyediakan berbagai metode KB termasuk: pil KB, suntik KB (1 bulan & 3 bulan), implant/susuk, IUD/spiral, kondom, dan metode operasi (MOW/MOP) untuk jangka panjang. Setiap metode akan dijelaskan secara detail oleh tenaga kesehatan kami.',
  },
  {
    question: 'Dimana lokasi kantor DPCPKB Manokwari?',
    answer: 'Kantor DPCPKB Manokwari berlokasi di Jalan Pendidikan, Kabupaten Manokwari, Papua Barat. Kantor buka setiap hari kerja Senin-Jumat pukul 08.00-16.00 WIT. Kami juga memiliki pos-pos pelayanan di setiap distrik.',
  },
  {
    question: 'Apakah ada layanan untuk remaja?',
    answer: 'Ya, kami memiliki program PIK Remaja (Pusat Informasi dan Konseling Remaja) dan program Genre (Generasi Berencana) yang dirancang khusus untuk remaja. Program ini memberikan edukasi tentang kesehatan reproduksi, perencanaan masa depan, dan pencegahan pernikahan dini.',
  },
  {
    question: 'Bagaimana cara menghubungi DPCPKB Manokwari?',
    answer: 'Anda dapat menghubungi kami melalui telepon di (0986) 212-xxx, email di dpcpkb@manokwarikab.go.id, atau mengunjungi kantor kami secara langsung. Kami juga aktif di media sosial Instagram dan Facebook untuk informasi terbaru.',
  },
  {
    question: 'Apakah layanan tersedia di daerah terpencil?',
    answer: 'Ya, kami berkomitmen menjangkau seluruh wilayah Kabupaten Manokwari termasuk daerah terpencil. Tim lapangan kami rutin melakukan kunjungan ke kampung-kampung terpencil untuk memberikan layanan KB dan kesehatan reproduksi.',
  },
];

function FAQItem({ faq, index, isOpen, onToggle }: {
  faq: typeof faqs[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 ${
        isOpen
          ? 'bg-primary-50/50 border-primary-200 shadow-sm'
          : 'bg-white border-slate-100 hover:border-primary-100'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4">
          <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors duration-300 ${
            isOpen ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-500'
          }`}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className={`font-semibold transition-colors duration-300 text-sm sm:text-base ${
            isOpen ? 'text-primary-700' : 'text-slate-900'
          }`}>
            {faq.question}
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
            isOpen ? 'rotate-180 text-primary-600' : 'text-slate-400'
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-[4.5rem]">
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal();
  const { containerRef, revealedItems } = useStaggerReveal(faqs.length, 0.05);

  return (
    <section id="faq" className="relative py-20 sm:py-28 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-800 ${
            headerRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 mb-6">
            <HelpCircle className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-semibold text-purple-700 tracking-wide uppercase">Pertanyaan Umum</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Pertanyaan yang Sering{' '}
            <span className="gradient-text">Ditanyakan</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Temukan jawaban atas pertanyaan yang paling sering diajukan oleh masyarakat Manokwari.
          </p>
        </div>

        {/* FAQ items */}
        <div ref={containerRef} className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`transition-all duration-500 ${
                revealedItems[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <FAQItem
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            </div>
          ))}
        </div>

        {/* Contact prompt */}
        <div className={`mt-12 text-center transition-all duration-800 ${headerRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
            <MessageCircle className="w-5 h-5 text-primary-500" />
            <p className="text-sm text-slate-600">
              Masih ada pertanyaan?{' '}
              <a href="#kontak" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                Hubungi kami langsung →
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
