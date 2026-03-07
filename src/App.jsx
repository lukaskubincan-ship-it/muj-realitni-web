import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Home, Phone, Mail, Menu, X, ChevronRight, ChevronLeft,
  Search, User, CheckCircle, Calculator, Building, 
  Map, Euro, Globe, Loader2, ArrowLeft,
  Maximize, Check
} from 'lucide-react';

// --- VERCEL ANALYTICS (VE VS CODE ODSTRANĚTE DVĚ LOMÍTKA NA ZAČÁTKU DALŠÍHO ŘÁDKU) ---
 import { Analytics } from '@vercel/analytics/react';
 import { SpeedInsights } from "@vercel/speed-insights/react"

// --- VLASTNÍ FUNKCE PRO KINEMATICKÉ PLYNULÉ SCROLLOVÁNÍ ---
const smoothScrollTo = (e, targetId) => {
  if (e && e.preventDefault) e.preventDefault();
  
  let targetPosition = 0;
  
  if (targetId !== 'top') {
    const target = document.getElementById(targetId);
    if (!target) return;
    const headerOffset = 80; // Zabrání překrytí hlavičkou
    targetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset;
  }

  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  const duration = 1200; // 1.2 sekundy - luxusně plynulý přejezd
  let start = null;

  const animation = (currentTime) => {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const progress = Math.min(timeElapsed / duration, 1);

    // Křivka EaseInOutCubic (Pomalý rozjezd, zrychlení a velmi jemný dojezd)
    const ease = progress < 0.5 
      ? 4 * progress * progress * progress 
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, startPosition + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

// --- DICTIONARY (Bilingual Support) ---
const dict = {
  cz: {
    navHome: "Domů",
    navOffers: "Nabídka",
    navSell: "Chci prodat",
    navCalc: "Kalkulačka",
    navAbout: "O nás",
    navContact: "Kontakt",
    heroTitle: "Váš partner ve světě realit na Chebsku",
    heroSub: "Exkluzivní i dostupné bydlení v Karlovarském kraji. Spolehlivě vás provedeme prodejem, koupí i pronájmem.",
    viewOffers: "Prohlédnout nabídku",
    wantToSell: "Chci prodat nemovitost",
    filterType: "Typ nemovitosti",
    filterTrans: "Transakce",
    filterLoc: "Lokalita",
    filterPrice: "Cena do",
    filterSearch: "Vyhledat",
    filterAll: "Vše",
    propTypeHouse: "Dům",
    propTypeApt: "Byt",
    propTypeLand: "Pozemek",
    transSale: "Prodej",
    transRent: "Pronájem",
    featuredTitle: "Vybrané nemovitosti",
    featuredSub: "To nejlepší z aktuální nabídky v našem regionu.",
    price: "Cena",
    beds: "Dispozice",
    area: "Plocha",
    moreInfo: "Více informací",
    valTitle: "Získejte odhad zdarma",
    valSub: "Uvažujete o prodeji? Nechte si od nás vypracovat nezávazný odhad tržní ceny vaší nemovitosti.",
    step1: "Krok 1: Co prodáváte?",
    step2: "Krok 2: Kde se nachází?",
    step3: "Krok 3: Vaše kontakty",
    next: "Pokračovat",
    submit: "Odeslat poptávku",
    calcTitle: "Hypoteční kalkulačka",
    calcSub: "Spočítejte si orientační měsíční splátku vaší nové nemovitosti.",
    calcAmount: "Výše úvěru",
    calcYears: "Doba splácení (roky)",
    calcRate: "Úroková sazba (%)",
    calcResult: "Měsíční splátka",
    aboutTitle: "O nás",
    aboutText1: "Realitní kancelář Kubinčan je stabilním partnerem na trhu s nemovitostmi v Karlovarském kraji. Specializujeme se především na lokalitu Cheb, Karlovy Vary a Mariánské Lázně.",
    aboutText2: "Zakládáme si na transparentnosti, profesionalitě a individuálním přístupu ke každému klientovi.",
    ourTeam: "Náš tým",
    mapTitle: "Působíme v celém regionu",
    mapSub: "Známe náš region jako své boty. Soustředíme se primárně na Karlovarský kraj, kde vám dokážeme nabídnout ty nejlepší lokální znalosti a osobní přístup.",
    callNow: "Zavolat",
    emailUs: "Napsat",
    whatsapp: "WhatsApp",
    successMsg: "Děkujeme! Vaše poptávka byla úspěšně odeslána. Brzy se vám ozveme.",
    propDesc: "Popis nemovitosti",
    propFeatures: "Vybavení a parametry",
    propTour: "3D Virtuální prohlídka",
    contactAgent: "Kontaktovat makléře",
    interested: "Mám zájem o prohlídku",
    gallery: "Fotogalerie",
    backToOffers: "Zpět na nabídku",
  },
  en: {
    navHome: "Home",
    navOffers: "Offers",
    navSell: "I want to sell",
    navCalc: "Calculator",
    navAbout: "About Us",
    navContact: "Contact",
    heroTitle: "Your partner in the world of real estate in the Cheb region",
    heroSub: "Exclusive and affordable housing in the Karlovy Vary Region. We safely guide you through selling, buying, and renting.",
    viewOffers: "View Offers",
    wantToSell: "I want to sell",
    filterType: "Property Type",
    filterTrans: "Transaction",
    filterLoc: "Location",
    filterPrice: "Max Price",
    filterSearch: "Search",
    filterAll: "All",
    propTypeHouse: "House",
    propTypeApt: "Apartment",
    propTypeLand: "Land",
    transSale: "Sale",
    transRent: "Rent",
    featuredTitle: "Featured Properties",
    featuredSub: "The best of our current portfolio in the region.",
    price: "Price",
    beds: "Layout",
    area: "Area",
    moreInfo: "More Info",
    valTitle: "Get a Free Valuation",
    valSub: "Thinking of selling? Let us prepare a non-binding market price estimate for your property.",
    step1: "Step 1: What are you selling?",
    step2: "Step 2: Where is it located?",
    step3: "Step 3: Your Contacts",
    next: "Next",
    submit: "Submit Request",
    calcTitle: "Mortgage Calculator",
    calcSub: "Calculate the approximate monthly payment for your new property.",
    calcAmount: "Loan Amount",
    calcYears: "Repayment Period (Years)",
    calcRate: "Interest Rate (%)",
    calcResult: "Monthly Payment",
    aboutTitle: "About Us",
    aboutText1: "Kubinčan Real Estate is a stable partner in the real estate market in the Karlovy Vary Region. We specialize primarily in Cheb, Karlovy Vary, and Mariánské Lázně.",
    aboutText2: "We pride ourselves on transparency, professionalism, and an individual approach to each client.",
    ourTeam: "Our Team",
    mapTitle: "We operate across the region",
    mapSub: "We know our region like the back of our hands. We focus primarily on the Karlovy Vary region, where we can offer you the best local expertise and personal approach.",
    callNow: "Call Now",
    emailUs: "Email",
    whatsapp: "WhatsApp",
    successMsg: "Thank you! Your request has been successfully submitted. We will contact you soon.",
    propDesc: "Property Description",
    propFeatures: "Features & Amenities",
    propTour: "3D Virtual Tour",
    contactAgent: "Contact Agent",
    interested: "Request a Viewing",
    gallery: "Photo Gallery",
    backToOffers: "Back to Offers",
  }
};

// --- MOCK DATA ---
const fallbackProperties = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    title: { cz: "Moderní rodinný dům", en: "Modern Family House" },
    loc: "Cheb - Skalka",
    lat: "50.0797",
    lng: "12.3739",
    price: "8 500 000 CZK",
    beds: "5+kk",
    area: "185 m²",
    type: "house",
    tag: { cz: "Exkluzivně", en: "Exclusive" },
    description: {
      cz: "Tento nádherný rodinný dům nabízí dokonalé spojení moderního designu a klidného bydlení. V přízemí se nachází prostorný obývací pokoj s krbem a plně vybavenou kuchyní, ze které je přímý vstup na prosluněnou terasu a do pečlivě udržované zahrady. V patře najdete 4 neprůchozí ložnice a dvě koupelny. Dům je plně klimatizován, postaven z prémiových materiálů a vybaven prvky chytré domácnosti.",
      en: "This beautiful family home offers a perfect blend of modern design and peaceful living. The ground floor features a spacious living room with a fireplace and a fully equipped kitchen, with direct access to a sunlit terrace and a meticulously maintained garden. Upstairs, you will find 4 separate bedrooms and two bathrooms. The house is fully air-conditioned, built with premium materials, and equipped with smart home features."
    },
    features: {
      cz: ["Garáž pro 2 auta", "Krb", "Klimatizace", "Tepelné čerpadlo", "Terasa 30 m²", "Zahrada 800 m²", "Chytrá domácnost", "Podlahové vytápění"],
      en: ["2-car garage", "Fireplace", "Air conditioning", "Heat pump", "Terrace 30 sqm", "Garden 800 sqm", "Smart home", "Underfloor heating"]
    },
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    ],
    matterport: "https://my.matterport.com/show/?m=JRW1uFh6n1e&play=1" 
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    title: { cz: "Světlý byt v centru", en: "Bright Apartment in Center" },
    loc: "Karlovy Vary",
    lat: "50.2319",
    lng: "12.8720",
    price: "4 200 000 CZK",
    beds: "3+1",
    area: "74 m²",
    type: "apartment",
    tag: { cz: "Novinka", en: "New" },
    description: {
      cz: "Zprostředkujeme Vám prodej velmi světlého a zrekonstruovaného bytu 3+1 v samém srdci Karlových Varů. Byt se nachází ve 3. patře historického cihlového domu s výtahem. Nabízí vysoké stropy, původní repasované parkety a novou kuchyňskou linku se spotřebiči. Ideální investice nebo luxusní bydlení v dosahu lázeňských kolonád.",
      en: "We offer for sale a very bright and renovated 3+1 apartment in the very heart of Karlovy Vary. The apartment is located on the 3rd floor of a historic brick building with an elevator. It features high ceilings, original restored parquet floors, and a new kitchen with appliances. An ideal investment or luxury living within reach of the spa colonnades."
    },
    features: {
      cz: ["Výtah", "Vysoké stropy", "Nová kuchyně", "Sklepní kóje", "Centrální topení", "Parkování před domem"],
      en: ["Elevator", "High ceilings", "New kitchen", "Cellar", "Central heating", "Street parking"]
    },
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817bc7fc60?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80"
    ],
    matterport: "https://my.matterport.com/show/?m=SjD3d2sK8Yn&play=1"
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    title: { cz: "Luxusní vila s bazénem", en: "Luxury Villa with Pool" },
    loc: "Mariánské Lázně",
    lat: "49.9733",
    lng: "12.7019",
    price: "15 900 000 CZK",
    beds: "6+kk",
    area: "320 m²",
    type: "house",
    tag: { cz: "Premium", en: "Premium" },
    description: {
      cz: "Unikátní nabídka luxusní vily s vlastním krytým bazénem a saunou v prestižní čtvrti Mariánských Lázní. Dům je architektonickým skvostem s velkoformátovými okny, které propojují interiér se vzrostlou zahradou. Dominantou domu je obývací prostor s galerií a výškou stropu přes 6 metrů. Součástí je i oddělený byt pro hosty.",
      en: "A unique offer of a luxury villa with a private indoor pool and sauna in a prestigious neighborhood of Mariánské Lázně. The house is an architectural gem with large-format windows that connect the interior with the mature garden. The dominant feature of the house is the living area with a gallery and a ceiling height of over 6 meters. An independent guest apartment is also included."
    },
    features: {
      cz: ["Krytý bazén", "Sauna", "Garáž pro 3 auta", "Hostinský byt", "Zimní zahrada", "Bezpečnostní systém", "Kamerový systém"],
      en: ["Indoor pool", "Sauna", "3-car garage", "Guest apartment", "Winter garden", "Security system", "CCTV"]
    },
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7def511?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80"
    ],
    matterport: "https://my.matterport.com/show/?m=EaKxHh8B6H2&play=1"
  }
];

// =========================================================================
// --- NÁŠ TÝM (ZDE MŮŽETE MĚNIT INFORMACE O MAKLÉŘÍCH) ---
// =========================================================================
const team = [
  { 
    name: "Petr Kubinčan", 
    role: { cz: "Majitel & Hlavní makléř", en: "Owner & Lead Broker" }, 
    img: "/reality 1x1.jpeg" 
  },
  { 
    name: "Spolupracovník 1", 
    role: { cz: "Realitní specialista", en: "Real Estate Specialist" }, 
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80" 
  },
  { 
    name: "Spolupracovník 2", 
    role: { cz: "Hypoteční poradce", en: "Mortgage Advisor" }, 
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80" 
  }
];

// --- GOOGLE SHEETS NASTAVENÍ ---
const SHEET_ID = '1-WjtdnZ2ln3qV6ZJtc9dfWVzhhePt2mNZLJK8qvyfp8';

// --- NASTAVENÍ EMAILU PRO ODESÍLÁNÍ POPTÁVEK Z FORMULÁŘE ---
const CONTACT_EMAIL = 'lukas.kubincan@gmail.com';

// --- COMPONENTS ---
const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [lang, setLang] = useState('cz');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  
  const [lightboxIndex, setLightboxIndex] = useState(null); 
  const galleryScrollRef = useRef(null);

  const [properties, setProperties] = useState(fallbackProperties);
  const [loadingOffers, setLoadingOffers] = useState(true);
  const t = dict[lang];

  // --- STAVY PRO FILTR ---
  const [filterType, setFilterType] = useState('all');
  const [filterTrans, setFilterTrans] = useState('all');
  const [filterLoc, setFilterLoc] = useState('all');

  // Funkce pro získání unikátních lokalit z dat
  const uniqueLocations = ['all', ...new Set(properties.map(p => {
    // Vezmeme jen název města před pomlčkou (např. z "Cheb - Skalka" vezmeme "Cheb")
    return p.loc.split('-')[0].trim();
  }))];

  // Filtrované nemovitosti
  const filteredProperties = properties.filter(prop => {
    const matchType = filterType === 'all' || prop.type === filterType;
    
    // Logika pro filtrování transakce:
    // Pokud máme v aplikaci explicitně oddělené prodeje a pronájmy (např. přes štítky nebo nový sloupec), 
    // můžeme to zde filtrovat. Prozatím předpokládáme, že většina je prodej.
    const matchTrans = filterTrans === 'all' || true; // Placeholder pro skutečnou logiku

    const matchLoc = filterLoc === 'all' || prop.loc.includes(filterLoc);
    
    return matchType && matchTrans && matchLoc;
  });

  const handleSearchClick = () => {
    smoothScrollTo(null, 'navOffers');
  };

  // Načtení dat z Google Tabulky
  useEffect(() => {
    const fetchProperties = async () => {
      if (SHEET_ID === 'VLOZTE_SEM_ID_VASI_TABULKY' || SHEET_ID === '') {
        setLoadingOffers(false);
        return; 
      }
      
      try {
        const response = await fetch(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&range=A:AZ`);
        const text = await response.text();
        
        const json = JSON.parse(text.substring(47).slice(0, -2));
        const rows = json.table.rows;
        
        const fetchedProps = rows.map((row, index) => {
          const c = row.c;
          if (!c) return null;
          const safeVal = (i) => (c[i] && c[i].v !== null) ? c[i].v : '';
          
          const urls = [];
          const pushValidUrl = (val) => {
            if (val && typeof val === 'string' && val.trim() !== '') {
              urls.push(val.trim());
            }
          };

          pushValidUrl(safeVal(14)); // O: Fotka 1
          pushValidUrl(safeVal(15)); // P: Fotka 2
          pushValidUrl(safeVal(16)); // Q: Fotka 3
          
          // S(18): GPS Souřadnice
          const rawGps = String(safeVal(18) || "");
          let parsedLat = "";
          let parsedLng = "";
          if (rawGps.includes(',')) {
            const parts = rawGps.split(',');
            if(parts.length >= 2) {
              parsedLat = parts[0].trim().replace(',', '.');
              parsedLng = parts[1].trim().replace(',', '.');
            }
          }

          // T(19) až do konce (AZ): Další URL adresy fotek
          for (let i = 19; i < 50; i++) {
            pushValidUrl(safeVal(i));
          }

          return {
            id: safeVal(0) || `fallback-${index}`,
            img: urls.length > 0 ? urls[0] : fallbackProperties[0].img, 
            title: { cz: safeVal(1), en: safeVal(2) },
            loc: safeVal(3),
            lat: parsedLat,
            lng: parsedLng,
            price: safeVal(4),
            beds: safeVal(5),
            area: safeVal(6),
            type: String(safeVal(7) || 'house').toLowerCase(),
            tag: { cz: safeVal(8), en: safeVal(9) },
            description: { cz: safeVal(10), en: safeVal(11) },
            features: { 
              cz: String(safeVal(12) || '').split(',').map(s => s.trim()).filter(Boolean), 
              en: String(safeVal(13) || '').split(',').map(s => s.trim()).filter(Boolean)
            },
            gallery: urls,
            matterport: safeVal(17) || ""
          };
        }).filter(prop => prop && prop.title && prop.title.cz !== '' && prop.title.cz !== 'Název (CZ)'); 
        
        if (fetchedProps.length > 0) {
          setProperties(fetchedProps);
        }
      } catch (error) {
        console.error("CHYBA při zpracování dat:", error);
      } finally {
        setLoadingOffers(false);
      }
    };
    
    fetchProperties();
  }, []);

  // Posun na začátek při otevření inzerátu
  useEffect(() => {
    if (selectedProperty) {
      smoothScrollTo(null, 'top');
    }
  }, [selectedProperty]);

  // Vypnutí scrollování pozadí při otevřené fotce na celou obrazovku
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [lightboxIndex]);

  // Klávesové zkratky pro přepínání fotek
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null || !selectedProperty || selectedProperty.gallery.length === 0) return;
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + selectedProperty.gallery.length) % selectedProperty.gallery.length);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % selectedProperty.gallery.length);
      } else if (e.key === 'Escape') {
        setLightboxIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, selectedProperty]);

  // Funkce pro posouvání galerie šipkami
  const scrollGallery = (direction) => {
    if (galleryScrollRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 600 : 300;
      galleryScrollRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-body text-slate-800">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700&family=Inter:wght@300;400;500;600&display=swap');
        
        .font-luxury { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        /* Třída pro skrytí posuvníku v karuselu ale zachování jeho funkce */
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div 
              className="flex-shrink-0 flex items-center gap-4 cursor-pointer group"
              onClick={(e) => {
                setSelectedProperty(null);
                smoothScrollTo(e, 'top');
              }}
            >
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 border-[1.5px] border-slate-900 rotate-45 transition-transform duration-700 ease-in-out group-hover:rotate-180"></div>
                <div className="w-7 h-7 bg-slate-900 flex items-center justify-center transition-transform duration-700 ease-in-out group-hover:rotate-90">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white transition-transform duration-700 ease-in-out group-hover:-rotate-90">
                    <path d="M3 10L12 3l9 7" />
                    <path d="M5 10v11h14V10" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col justify-center mt-1">
                <span className="font-body font-extrabold text-xl tracking-[0.15em] uppercase text-slate-900 leading-none">
                  Kubinčan
                </span>
                <span className="font-body text-[9px] tracking-[0.3em] text-slate-500 uppercase font-bold mt-1">
                  Real Estate
                </span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex space-x-8">
              {!selectedProperty ? (
                ['navHome', 'navOffers', 'navSell', 'navCalc', 'navAbout'].map((item) => (
                  <a 
                    key={`desknav-${item}`} 
                    href={`#${item}`} 
                    onClick={(e) => smoothScrollTo(e, item)}
                    className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
                  >
                    {t[item]}
                  </a>
                ))
              ) : (
                <button 
                  onClick={() => setSelectedProperty(null)}
                  className="flex items-center text-slate-600 hover:text-slate-900 font-medium transition-colors gap-2"
                >
                  <ArrowLeft size={20} strokeWidth={1.5} />
                  {t.backToOffers}
                </button>
              )}
            </nav>

            {/* Language Toggle & Contact */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-md">
                <button onClick={() => setLang('cz')} className={`px-3 py-1.5 rounded-sm text-sm font-medium transition-all ${lang === 'cz' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}>CZ</button>
                <button onClick={() => setLang('en')} className={`px-3 py-1.5 rounded-sm text-sm font-medium transition-all ${lang === 'en' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}>EN</button>
              </div>
              <a 
                href="#contact" 
                onClick={(e) => smoothScrollTo(e, 'contact')}
                className="bg-slate-900 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-sm"
              >
                {t.navContact}
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-4">
              <button onClick={() => setLang(lang === 'cz' ? 'en' : 'cz')} className="text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg font-medium">
                {lang === 'cz' ? 'EN' : 'CZ'}
              </button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-900 p-2">
                {isMobileMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-white border-b border-slate-200 overflow-hidden shadow-lg">
              <div className="px-4 pt-2 pb-6 space-y-2">
                {['navHome', 'navOffers', 'navSell', 'navCalc', 'navAbout', 'navContact'].map((item) => (
                  <a 
                    key={`mobnav-${item}`} 
                    href={`#${item}`} 
                    onClick={(e) => { setIsMobileMenuOpen(false); smoothScrollTo(e, item); }} 
                    className="block px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-lg"
                  >
                    {t[item]}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MAIN CONTENT */}
      <main className="pt-20">
        
        <AnimatePresence mode="wait">
          {selectedProperty ? (
            /* --- PROPERTY DETAIL VIEW --- */
            <motion.div 
              key="detail-view"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-slate-50 min-h-screen pb-24 relative"
            >
              {/* Detail Hero Image */}
              <div 
                className="relative h-[50vh] min-h-[400px] w-full bg-slate-900 cursor-pointer group"
                onClick={() => {
                  if (selectedProperty.gallery && selectedProperty.gallery.length > 0) {
                    setLightboxIndex(0);
                  }
                }}
              >
                <img 
                  src={selectedProperty.img} 
                  alt={selectedProperty.title[lang]}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none"></div>
                
                {/* Maximize Icon Overlay */}
                <div className="absolute top-6 right-6 md:top-8 md:right-8 bg-white/20 backdrop-blur-md p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                  <Maximize size={24} strokeWidth={1.5} />
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 max-w-7xl mx-auto pointer-events-none">
                  <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-md text-white text-sm font-medium mb-4 border border-white/30">
                    {selectedProperty.tag[lang]}
                  </div>
                  <h1 className="text-4xl md:text-6xl font-luxury font-semibold text-white mb-3 pointer-events-auto">
                    {selectedProperty.title[lang]}
                  </h1>
                  <div className="flex items-center text-slate-300 text-lg md:text-xl font-normal pointer-events-auto">
                    <MapPin size={24} strokeWidth={1.5} className="mr-2" /> {selectedProperty.loc}
                  </div>
                </div>
                
                {/* Mobile Back Button Overlay */}
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedProperty(null); }}
                  className="md:hidden absolute top-6 left-4 bg-white shadow-lg p-3 rounded-full z-20 text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  <ArrowLeft size={24} strokeWidth={1.5} />
                </button>
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                  
                  {/* Left Column: Content */}
                  <div className="lg:w-2/3 space-y-12">
                    
                    {/* Quick Specs */}
                    <div className="flex flex-wrap gap-4 md:gap-8 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-600"><Home size={24} strokeWidth={1.5} /></div>
                        <div>
                          <p className="text-sm text-slate-500 font-medium">{t.beds}</p>
                          <p className="text-xl font-semibold text-slate-900">{selectedProperty.beds}</p>
                        </div>
                      </div>
                      <div className="w-px bg-slate-200 hidden md:block"></div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-600"><Map size={24} strokeWidth={1.5} /></div>
                        <div>
                          <p className="text-sm text-slate-500 font-medium">{t.area}</p>
                          <p className="text-xl font-semibold text-slate-900">{selectedProperty.area}</p>
                        </div>
                      </div>
                      <div className="w-px bg-slate-200 hidden md:block"></div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-600"><Building size={24} strokeWidth={1.5} /></div>
                        <div>
                          <p className="text-sm text-slate-500 font-medium">{t.filterType}</p>
                          <p className="text-xl font-semibold text-slate-900 capitalize">{selectedProperty.type === 'house' ? t.propTypeHouse : selectedProperty.type === 'apartment' ? t.propTypeApt : t.propTypeLand}</p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <section>
                      <h2 className="text-3xl font-luxury font-semibold text-slate-900 mb-6 flex items-center gap-3">
                        {t.propDesc}
                      </h2>
                      <p className="text-lg text-slate-600 leading-relaxed font-light">
                        {selectedProperty.description[lang]}
                      </p>
                    </section>

                    {/* Features Grid */}
                    {selectedProperty.features[lang].length > 0 && (
                      <section>
                        <h2 className="text-3xl font-luxury font-semibold text-slate-900 mb-6">
                          {t.propFeatures}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {selectedProperty.features[lang].map((feature, i) => (
                            <div key={`feature-${i}`} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                              <Check className="text-green-500 flex-shrink-0" size={20} strokeWidth={2} />
                              <span className="font-medium text-slate-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Matterport 3D Tour */}
                    {selectedProperty.matterport && (
                      <section>
                        <h2 className="text-3xl font-luxury font-semibold text-slate-900 mb-6 flex items-center gap-3">
                          <Globe className="text-slate-700" strokeWidth={1.5} /> {t.propTour}
                        </h2>
                        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-sm bg-slate-100 relative group border border-slate-200">
                          <div className="absolute inset-0 flex items-center justify-center z-0">
                            <Loader2 className="animate-spin text-slate-400" size={48} strokeWidth={1.5} />
                          </div>
                          <iframe 
                            src={selectedProperty.matterport}
                            className="w-full h-full relative z-10"
                            frameBorder="0"
                            allowFullScreen
                            allow="xr-spatial-tracking"
                            title="3D Virtual Tour"
                          ></iframe>
                        </div>
                      </section>
                    )}

                    {/* NOVÁ POSUVNÁ FOTOGALERIE */}
                    {selectedProperty.gallery.length > 1 && (
                      <section>
                        <h2 className="text-3xl font-luxury font-semibold text-slate-900 mb-6">
                          {t.gallery}
                        </h2>
                        <div className="relative group/slider">
                          {/* Šipka doleva */}
                          <button 
                            onClick={() => scrollGallery('left')} 
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg text-slate-700 hover:text-slate-900 hover:bg-white transition-all opacity-0 md:group-hover/slider:opacity-100 disabled:opacity-0"
                          >
                            <ChevronLeft size={24} strokeWidth={2} />
                          </button>

                          {/* Šipka doprava */}
                          <button 
                            onClick={() => scrollGallery('right')} 
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg text-slate-700 hover:text-slate-900 hover:bg-white transition-all opacity-0 md:group-hover/slider:opacity-100 disabled:opacity-0"
                          >
                            <ChevronRight size={24} strokeWidth={2} />
                          </button>
                          
                          {/* Kontejner s fotkami */}
                          <div 
                            ref={galleryScrollRef}
                            className="flex items-start gap-4 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 hide-scrollbar scroll-smooth"
                          >
                            {/* Přeskakujeme první fotku (slice(1)) */}
                            {selectedProperty.gallery.slice(1).map((img, i) => (
                              <div 
                                key={`gallery-item-${i}`} 
                                onClick={() => setLightboxIndex(i + 1)}
                                className="flex-none w-72 h-56 sm:w-80 sm:h-60 md:w-[24rem] md:h-72 snap-center sm:snap-start rounded-2xl overflow-hidden shadow-md group relative cursor-pointer bg-slate-100"
                              >
                                <img src={img} alt={`Gallery ${i+1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors flex items-center justify-center">
                                  <Maximize className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={32} strokeWidth={1.5} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </section>
                    )}

                  </div>

                  {/* Right Column: Sticky Contact Card */}
                  <div className="lg:w-1/3">
                    <div className="sticky top-28 bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
                      <div className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">{t.price}</div>
                      <div className="text-4xl font-semibold text-slate-900 mb-8">{selectedProperty.price}</div>
                      
                      <div className="space-y-4 mb-8">
                        <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors shadow-sm flex items-center justify-center gap-2">
                          <Mail size={20} strokeWidth={1.5} /> {t.interested}
                        </button>
                        <a href="tel:+420123456789" className="w-full py-4 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl font-medium hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                          <Phone size={20} strokeWidth={1.5} /> {t.callNow}
                        </a>
                        <a href="https://wa.me/420123456789" className="w-full py-4 bg-green-50 text-green-700 border border-green-100 rounded-xl font-medium hover:bg-green-100 transition-colors flex items-center justify-center gap-2">
                          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                          WhatsApp
                        </a>
                      </div>

                      <div className="pt-6 border-t border-slate-100">
                        <h4 className="font-medium text-slate-500 mb-4 uppercase text-xs tracking-wider">{t.contactAgent}</h4>
                        <div className="flex items-center gap-4">
                          <img src={team[0].img} alt={team[0].name} className="w-16 h-16 rounded-full object-cover border border-slate-200" />
                          <div>
                            <div className="font-semibold text-slate-900 text-lg">{team[0].name}</div>
                            <div className="text-sm font-normal text-slate-500">{team[0].role[lang]}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          ) : (
            /* --- LANDING PAGE --- */
            <motion.div 
              key="landing-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* HERO SECTION */}
              <section id="navHome" className="relative h-[85vh] min-h-[600px] flex items-center justify-center">
                
                {/* Background Image (Desktop verze - Počítače a velké obrazovky) */}
                <div 
                  className="absolute inset-0 bg-cover bg-center z-0 hidden lg:block"
                  style={{ backgroundImage: "url('/reality-extend.jpeg')" }}
                />
                
                {/* Background Image (Mobilní verze a tablety - Speciálně oříznutá fotka) */}
                <div 
                  className="absolute inset-0 bg-cover bg-center z-0 block lg:hidden"
                  style={{ backgroundImage: "url('/reality 1x1.jpeg')" }}
                />

                <div className="absolute inset-0 bg-slate-900/60 z-0" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
                  <FadeIn>
                    <h1 className="text-5xl md:text-7xl font-luxury font-semibold text-white leading-tight mb-6">
                      {t.heroTitle}
                    </h1>
                    <p className="text-lg md:text-2xl text-slate-200 mb-12 max-w-3xl mx-auto font-light">
                      {t.heroSub}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                      <a 
                        href="#navOffers" 
                        onClick={(e) => smoothScrollTo(e, 'navOffers')}
                        className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-medium rounded-xl shadow-lg hover:bg-slate-50 hover:-translate-y-1 transition-all"
                      >
                        {t.viewOffers}
                      </a>
                      <a 
                        href="#navSell" 
                        onClick={(e) => smoothScrollTo(e, 'navSell')}
                        className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/50 text-white font-medium rounded-xl hover:bg-white/10 hover:-translate-y-1 transition-all"
                      >
                        {t.wantToSell}
                      </a>
                    </div>
                  </FadeIn>
                </div>

                {/* Search Filter Bar (Absolute positioned at bottom of hero) */}
                <div className="absolute -bottom-16 left-0 right-0 z-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto hidden md:block">
                  <FadeIn delay={0.3}>
                    <div className="bg-white rounded-2xl shadow-xl p-6 flex items-center gap-4 border border-slate-100">
                      <div className="flex-1">
                        <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 ml-1">{t.filterType}</label>
                        <select 
                          value={filterType}
                          onChange={(e) => setFilterType(e.target.value)}
                          className="w-full bg-slate-50 border-none text-slate-900 font-medium rounded-xl focus:ring-0 cursor-pointer py-3 px-4 transition-colors"
                        >
                          <option value="all">{t.filterAll}</option>
                          <option value="house">{t.propTypeHouse}</option>
                          <option value="apartment">{t.propTypeApt}</option>
                          <option value="land">{t.propTypeLand}</option>
                        </select>
                      </div>
                      <div className="w-px h-12 bg-slate-200 mx-2"></div>
                      <div className="flex-1">
                        <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 ml-1">{t.filterTrans}</label>
                        <select 
                          value={filterTrans}
                          onChange={(e) => setFilterTrans(e.target.value)}
                          className="w-full bg-slate-50 border-none text-slate-900 font-medium rounded-xl focus:ring-0 cursor-pointer py-3 px-4 transition-colors"
                        >
                          <option value="all">{t.filterAll}</option>
                          <option value="sale">{t.transSale}</option>
                          <option value="rent">{t.transRent}</option>
                        </select>
                      </div>
                      <div className="w-px h-12 bg-slate-200 mx-2"></div>
                      <div className="flex-1">
                        <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 ml-1">{t.filterLoc}</label>
                        <select 
                          value={filterLoc}
                          onChange={(e) => setFilterLoc(e.target.value)}
                          className="w-full bg-slate-50 border-none text-slate-900 font-medium rounded-xl focus:ring-0 cursor-pointer py-3 px-4 transition-colors"
                        >
                          {uniqueLocations.map(loc => (
                            <option key={`loc-filter-${loc}`} value={loc}>
                              {loc === 'all' ? t.filterAll : loc}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="w-px h-12 bg-slate-200 mx-2"></div>
                      <button 
                        onClick={handleSearchClick}
                        className="bg-slate-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-slate-800 transition-all flex items-center gap-2 shadow-sm mt-6"
                      >
                        <Search size={20} strokeWidth={1.5} />
                        {t.filterSearch}
                      </button>
                    </div>
                  </FadeIn>
                </div>
              </section>

              {/* PROPERTY LISTINGS */}
              <section id="navOffers" className="py-24 md:pt-40 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <FadeIn>
                  <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-luxury font-semibold text-slate-900 mb-4">{t.featuredTitle}</h2>
                    <div className="w-24 h-px bg-slate-300 mx-auto mb-6"></div>
                    <p className="text-lg text-slate-500 font-light max-w-2xl mx-auto">{t.featuredSub}</p>
                  </div>
                </FadeIn>

                {loadingOffers ? (
                  <div className="flex justify-center items-center py-20">
                    <Loader2 className="animate-spin text-slate-400" size={48} strokeWidth={1.5} />
                  </div>
                ) : filteredProperties.length === 0 ? (
                  <div className="text-center py-20 text-slate-500">
                    Nenalezeny žádné nemovitosti odpovídající vašemu výběru.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProperties.map((prop, index) => (
                      <FadeIn key={`prop-${prop.id}-${index}`} delay={index * 0.1}>
                        <div 
                          onClick={() => setSelectedProperty(prop)}
                          className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-slate-100 group cursor-pointer flex flex-col h-full"
                        >
                          <div className="relative h-64 overflow-hidden flex-shrink-0">
                            <img 
                              src={prop.img} 
                              alt={prop.title[lang]} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                            />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-medium text-slate-900 shadow-sm">
                              {prop.tag[lang]}
                            </div>
                          </div>
                          <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-2xl font-luxury font-semibold text-slate-900 mb-2 group-hover:text-slate-600 transition-colors">{prop.title[lang]}</h3>
                            <div className="flex items-center text-slate-400 font-light mb-6 text-sm">
                              <MapPin size={16} strokeWidth={1.5} className="mr-1.5" /> {prop.loc}
                            </div>
                            <div className="text-2xl font-semibold text-slate-900 mb-6 mt-auto">
                              {prop.price}
                            </div>
                            <div className="flex justify-between items-center border-t border-slate-100 pt-4 text-sm text-slate-500 font-normal">
                              <div className="flex items-center gap-1.5"><Home size={16} strokeWidth={1.5} className="text-slate-400"/> {prop.beds}</div>
                              <div className="flex items-center gap-1.5"><Map size={16} strokeWidth={1.5} className="text-slate-400"/> {prop.area}</div>
                              <span className="text-slate-900 font-medium flex items-center group-hover:translate-x-1 transition-transform">
                                {t.moreInfo} <ChevronRight size={16} strokeWidth={1.5} className="ml-1" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                )}
              </section>

              {/* LEAD GENERATION (VALUATION) */}
              <section id="navSell" className="py-24 relative overflow-hidden bg-slate-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                  <FadeIn>
                    <h2 className="text-4xl md:text-5xl font-luxury font-semibold mb-6 text-white">{t.valTitle}</h2>
                    <p className="text-lg text-slate-300 font-light mb-12 max-w-2xl mx-auto">{t.valSub}</p>
                  </FadeIn>
                  
                  <FadeIn delay={0.2}>
                    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-slate-900 text-left relative">
                      <ValuationForm t={t} />
                    </div>
                  </FadeIn>
                </div>
              </section>

              {/* MORTGAGE CALCULATOR */}
              <section id="navCalc" className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <FadeIn>
                    <div className="text-center mb-16">
                      <h2 className="text-4xl md:text-5xl font-luxury font-semibold text-slate-900 mb-4">{t.calcTitle}</h2>
                      <div className="w-24 h-px bg-slate-300 mx-auto mb-6"></div>
                      <p className="text-lg text-slate-500 font-light max-w-2xl mx-auto">{t.calcSub}</p>
                    </div>
                  </FadeIn>
                  <FadeIn delay={0.2}>
                    <MortgageCalculator t={t} />
                  </FadeIn>
                </div>
              </section>

              {/* REGION FOCUS - INTERAKTIVNÍ MAPA NEMOVITOSTÍ */}
              <section className="py-24 bg-white relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <FadeIn>
                    <div className="bg-slate-50 rounded-3xl p-8 md:p-12 lg:p-16 border border-slate-100 shadow-sm overflow-hidden flex flex-col lg:flex-row items-center gap-12">
                      
                      {/* Left Content */}
                      <div className="w-full lg:w-1/2 z-10">
                        <h2 className="text-3xl md:text-4xl font-luxury font-semibold text-slate-900 mb-6">{t.mapTitle}</h2>
                        <p className="text-lg text-slate-600 mb-10 font-light leading-relaxed">
                          {t.mapSub}
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {['Cheb', 'Karlovy Vary', 'Mariánské Lázně', 'Františkovy Lázně', 'Sokolov'].map((city, i) => (
                            <div key={`city-${i}`} className="flex items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                              <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-slate-900">
                                <MapPin size={20} strokeWidth={1.5} />
                              </div>
                              <span className="font-medium text-slate-700">{city}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right Map Container - LEAFLET MAPA S OPRAVENOU VÝŠKOU PRO MOBILY */}
                      <div className="w-full lg:w-1/2 h-[400px] sm:h-[450px] lg:h-[550px] relative rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden isolate bg-slate-100 flex-shrink-0">
                        <RealEstateMap 
                          properties={properties} 
                          onPropertySelect={setSelectedProperty} 
                          t={t} 
                          lang={lang} 
                        />
                      </div>

                    </div>
                  </FadeIn>
                </div>
              </section>

              {/* ABOUT US */}
              <section id="navAbout" className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <FadeIn>
                    <h2 className="text-4xl md:text-5xl font-luxury font-semibold text-slate-900 mb-6">{t.aboutTitle}</h2>
                    <div className="w-16 h-px bg-slate-300 mb-8"></div>
                    <p className="text-lg text-slate-600 mb-6 leading-relaxed font-light">{t.aboutText1}</p>
                    <p className="text-lg text-slate-700 mb-10 leading-relaxed font-medium">{t.aboutText2}</p>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-6 pt-8 border-t border-slate-200">
                      <div>
                        <div className="text-4xl font-semibold text-slate-900 mb-2">15+</div>
                        <div className="text-sm text-slate-500 uppercase font-medium tracking-wider">Let zkušeností</div>
                      </div>
                      <div>
                        <div className="text-4xl font-semibold text-slate-900 mb-2">25+</div>
                        <div className="text-sm text-slate-500 uppercase font-medium tracking-wider">Prodaných nemovitostí</div>
                      </div>
                    </div>
                  </FadeIn>
                  
                  <FadeIn delay={0.2}>
                    <h3 className="text-2xl font-semibold text-slate-900 mb-8">{t.ourTeam}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {team.map((member, i) => (
                        <div key={`team-${i}`} className="flex flex-col items-center text-center">
                          <img src={member.img} alt={member.name} className="w-32 h-32 rounded-full object-cover mb-4 shadow-sm border border-slate-100" />
                          <h4 className="text-lg font-medium text-slate-900">{member.name}</h4>
                          <p className="text-slate-500 font-light">{member.role[lang]}</p>
                        </div>
                      ))}
                    </div>
                  </FadeIn>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* FOOTER */}
      <footer id="contact" className="bg-slate-950 text-slate-400 py-16 pb-32 md:pb-16 mt-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div 
              className="flex items-center gap-4 mb-6 cursor-pointer group w-fit text-white"
              onClick={(e) => {
                setSelectedProperty(null);
                smoothScrollTo(e, 'top');
              }}
            >
              {/* Monogram Footer */}
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 border-[1.5px] border-white/70 rotate-45 transition-transform duration-700 ease-in-out group-hover:rotate-180"></div>
                <div className="w-7 h-7 bg-white flex items-center justify-center transition-transform duration-700 ease-in-out group-hover:rotate-90">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-950 transition-transform duration-700 ease-in-out group-hover:-rotate-90">
                    <path d="M3 10L12 3l9 7" />
                    <path d="M5 10v11h14V10" />
                  </svg>
                </div>
              </div>
              {/* Typography Footer */}
              <div className="flex flex-col justify-center mt-1">
                <span className="font-body font-extrabold text-xl tracking-[0.15em] uppercase text-white leading-none">
                  Kubinčan
                </span>
                <span className="font-body text-[9px] tracking-[0.3em] text-slate-400 uppercase font-bold mt-1">
                  Real Estate
                </span>
              </div>
            </div>
            <p className="mb-6 max-w-xs font-light">{t.heroSub}</p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-sm">Kontakt</h4>
            <ul className="space-y-4 font-light">
              <li className="flex items-center gap-3"><MapPin size={20} strokeWidth={1.5} /> Svobody 15, 350 02 Cheb</li>
              <li className="flex items-center gap-3"><Phone size={20} strokeWidth={1.5} /> +420 123 456 789</li>
              <li className="flex items-center gap-3"><Mail size={20} strokeWidth={1.5} /> info@rkkubincan.cz</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-sm">Odkazy</h4>
            <ul className="space-y-4 font-light">
              <li><a href="#navOffers" onClick={(e) => smoothScrollTo(e, 'navOffers')} className="hover:text-white transition-colors">{t.navOffers}</a></li>
              <li><a href="#navSell" onClick={(e) => smoothScrollTo(e, 'navSell')} className="hover:text-white transition-colors">{t.navSell}</a></li>
              <li><a href="#navCalc" onClick={(e) => smoothScrollTo(e, 'navCalc')} className="hover:text-white transition-colors">{t.navCalc}</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-800 text-sm text-center font-light">
          &copy; {new Date().getFullYear()} Realitní kancelář Kubinčan. Všechna práva vyhrazena.
        </div>
      </footer>

      {/* STICKY MOBILE CONTACT BAR */}
      <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-200 z-50 flex shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <a href="tel:+420123456789" className="flex-1 flex flex-col items-center justify-center py-3 text-slate-900 active:bg-slate-50 transition-colors">
          <Phone size={20} strokeWidth={1.5} className="mb-1" />
          <span className="text-[10px] font-medium uppercase tracking-wider">{t.callNow}</span>
        </a>
        <div className="w-px bg-slate-200"></div>
        <a href="mailto:info@rkkubincan.cz" className="flex-1 flex flex-col items-center justify-center py-3 text-slate-900 active:bg-slate-50 transition-colors">
          <Mail size={20} strokeWidth={1.5} className="mb-1" />
          <span className="text-[10px] font-medium uppercase tracking-wider">{t.emailUs}</span>
        </a>
        <div className="w-px bg-slate-200"></div>
        <a href="https://wa.me/420123456789" className="flex-1 flex flex-col items-center justify-center py-3 text-green-600 active:bg-green-50 transition-colors">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="mb-1">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
          <span className="text-[10px] font-medium uppercase tracking-wider">{t.whatsapp}</span>
        </a>
      </div>

      {/* VYLEPŠENÝ FULLSCREEN IMAGE LIGHTBOX S POSOUVÁNÍM */}
      <AnimatePresence>
        {lightboxIndex !== null && selectedProperty && selectedProperty.gallery.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 md:p-12 select-none"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Tlačítko zavřít */}
            <button 
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white transition-colors z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full"
              onClick={() => setLightboxIndex(null)}
            >
              <X size={28} strokeWidth={1.5} />
            </button>

            {/* Šipka doleva (ukáže se jen pokud je více fotek) */}
            {selectedProperty.gallery.length > 1 && (
              <button 
                className="absolute left-4 md:left-8 text-white/70 hover:text-white transition-colors z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full"
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setLightboxIndex((prev) => (prev - 1 + selectedProperty.gallery.length) % selectedProperty.gallery.length); 
                }}
              >
                <ChevronLeft size={32} strokeWidth={1.5} />
              </button>
            )}

            {/* Samotná Fotka */}
            <motion.img 
              key={`lightbox-img-${lightboxIndex}`} // Zajišťuje animaci při přepnutí fotky
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              src={selectedProperty.gallery[lightboxIndex]} 
              alt="Zvětšená fotografie" 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            />

            {/* Šipka doprava (ukáže se jen pokud je více fotek) */}
            {selectedProperty.gallery.length > 1 && (
              <button 
                className="absolute right-4 md:right-8 text-white/70 hover:text-white transition-colors z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full"
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setLightboxIndex((prev) => (prev + 1) % selectedProperty.gallery.length); 
                }}
              >
                <ChevronRight size={32} strokeWidth={1.5} />
              </button>
            )}

            {/* Počítadlo fotek dole */}
            {selectedProperty.gallery.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 font-medium px-4 py-2 bg-slate-900/50 rounded-full backdrop-blur-sm tracking-widest text-sm">
                {lightboxIndex + 1} / {selectedProperty.gallery.length}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- VERCEL ANALYTICS (VE VS CODE TENTO ŘÁDEK PŘEPIŠTE POUZE NA <Analytics /> ) --- */}
       <Analytics />
       <SpeedInsights />
    </div>
  );
}

// --- SUB-COMPONENTS ---

// NOVÁ BEZPEČNÁ MAPA (LEAFLET PŘES CDN) S AUTOMATICKÝM PŘIBLÍŽENÍM
function RealEstateMap({ properties, onPropertySelect, t, lang }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    const loadLeaflet = async () => {
      // 1. Načtení stylů
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      // 2. Načtení skriptu Leaflet
      if (!window.L) {
        const script = document.createElement('script');
        script.id = 'leaflet-script';
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        document.head.appendChild(script);
        
        await new Promise(resolve => {
          script.onload = resolve;
        });
      }

      if (!mapRef.current || mapInstanceRef.current) return;

      const L = window.L;
      
      // Inicializace mapy
      const map = L.map(mapRef.current);
      mapInstanceRef.current = map;

      // Světlý "Voyager" motiv mapy
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CartoDB</a>'
      }).addTo(map);

      const customIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      // Založení pole pro sběr všech souřadnic nemovitostí
      const boundsCoords = [];
      
      // Funkce pro výběr správné SVG ikony podle typu nemovitosti
      const getIconSvg = (type) => {
        if (type === 'house') return `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`;
        if (type === 'apartment') return `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>`;
        return `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" x2="9" y1="3" y2="18"></line><line x1="15" x2="15" y1="6" y2="21"></line></svg>`;
      };

      // Získání překladu pro daný typ
      const getTypeName = (type) => {
        if (type === 'house') return t.propTypeHouse;
        if (type === 'apartment') return t.propTypeApt;
        return t.propTypeLand;
      };

      // Vykreslení špendlíků z databáze
      properties.forEach(prop => {
        if (prop.lat && prop.lng && !isNaN(parseFloat(prop.lat))) {
          const lat = parseFloat(prop.lat);
          const lng = parseFloat(prop.lng);
          
          // Přidáme souřadnici do našeho pole pro pozdější vycentrování
          boundsCoords.push([lat, lng]);

          const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
          
          // ZVĚTŠENÝ POPUP HTML S IKONOU TYPU
          const popupHtml = `
            <div style="width: 260px; font-family: 'Inter', sans-serif;">
              <div style="height: 160px; width: 100%; position: relative;">
                <img src="${prop.img}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px 8px 0 0;" />
                
                <div style="position: absolute; top: 8px; left: 8px; background: rgba(255,255,255,0.9); padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; color: #0f172a; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  ${prop.tag[lang]}
                </div>
                
                <div style="position: absolute; top: 8px; right: 8px; background: rgba(15,23,42,0.85); backdrop-filter: blur(4px); padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; color: white; display: flex; align-items: center; gap: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  ${getIconSvg(prop.type)}
                  ${getTypeName(prop.type)}
                </div>
              </div>
              <div style="padding: 14px;">
                <div style="font-size: 10px; font-weight: bold; color: #94a3b8; text-transform: uppercase; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  ${prop.loc}
                </div>
                <h4 style="margin: 0 0 8px 0; font-size: 15px; font-weight: 600; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${prop.title[lang]}</h4>
                <p style="margin: 0 0 12px 0; font-weight: 700; color: #0f172a; font-size: 16px;">${prop.price}</p>
                <button id="btn-prop-${prop.id}" style="width: 100%; background: #0f172a; color: white; border: none; padding: 10px; border-radius: 6px; font-weight: 500; cursor: pointer; font-size: 13px; transition: opacity 0.2s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">${t.moreInfo}</button>
              </div>
            </div>
          `;
          
          marker.bindPopup(popupHtml, {
            closeButton: false,
            className: 'custom-leaflet-popup'
          });

          // Napojení tlačítka "Více informací" na otevření detailu
          marker.on('popupopen', () => {
            const btn = document.getElementById(`btn-prop-${prop.id}`);
            if (btn) {
              btn.onclick = () => onPropertySelect(prop);
            }
          });
        }
      });

      // Automatické přiblížení a vycentrování mapy podle nasbíraných pinu
      if (boundsCoords.length > 0) {
        const bounds = L.latLngBounds(boundsCoords);
        // padding: nechá trochu volného okraje, maxZoom: zajistí, aby to nebylo přiblíženo až moc
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
      } else {
        // Fallback pro případ, že žádný inzerát nemá GPS souřadnice
        map.setView([50.15, 12.65], 9);
      }

      // KLÍČOVÁ OPRAVA PRO MOBILY: Vynucené překreslení mapy po načtení
      setTimeout(() => {
        map.invalidateSize();
      }, 300);

    };

    loadLeaflet();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [properties, lang, onPropertySelect, t]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <style>{`
        .custom-leaflet-popup .leaflet-popup-content-wrapper { padding: 0; overflow: hidden; border-radius: 8px; border: none; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); }
        .custom-leaflet-popup .leaflet-popup-content { margin: 0; width: auto !important; }
        .custom-leaflet-popup .leaflet-popup-tip { background: white; }
        .leaflet-container { z-index: 0; font-family: 'Inter', sans-serif; background: transparent; }
      `}</style>
      <div ref={mapRef} className="w-full h-full z-0"></div>
    </div>
  );
}

function ValuationForm({ t }) {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Hodnoty zadané uživatelem do formuláře
  const [formType, setFormType] = useState('Dům');
  const [formCity, setFormCity] = useState('');
  const [formArea, setFormArea] = useState('');
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');

  const submitForm = async () => {
    if (!formName || !formPhone) {
      alert(t.step3.includes('Contacts') ? "Please fill in your name and phone number." : "Prosím vyplňte alespoň jméno a telefon.");
      return;
    }
    
    setIsSending(true);
    
    try {
      // Odeslání na bezplatnou službu FormSubmit (napojeno na váš CONTACT_EMAIL nahoře)
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            Předmět: "Nová poptávka o odhad z webu",
            Typ_nemovitosti: formType,
            Město: formCity || "Neuvedeno",
            Výměra: formArea ? `${formArea} m²` : "Neuvedeno",
            Jméno: formName,
            Telefon: formPhone,
            Email: formEmail || "Neuvedeno"
        })
      });
      
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert("Něco se pokazilo při odesílání zprávy. Zkuste to prosím později.");
      }
    } catch (err) {
       console.error("Chyba při odesílání formuláře:", err);
       alert("Zkontrolujte své připojení k internetu a zkuste to znovu.");
    } finally {
      setIsSending(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-block bg-green-50 p-4 rounded-full mb-6 text-green-600">
          <CheckCircle size={56} strokeWidth={1.5} />
        </motion.div>
        <h3 className="text-2xl font-semibold text-slate-900 mb-2">{t.successMsg}</h3>
        <button onClick={() => { setStep(1); setIsSubmitted(false); setFormCity(''); setFormArea(''); setFormName(''); setFormPhone(''); setFormEmail(''); }} className="mt-8 text-slate-500 hover:text-slate-900 underline font-medium transition-colors">
          Zpět
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="flex justify-between mb-8 relative px-2">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-200 -z-10 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-0 h-px bg-slate-900 -z-10 -translate-y-1/2 transition-all duration-300" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
        {[1, 2, 3].map((s) => (
          <div key={`prog-${s}`} className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm border transition-colors ${step >= s ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-400'}`}>
            {s}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="text-xl font-medium mb-6 text-slate-900 text-center">{t.step1}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['Dům', 'Byt', 'Pozemek'].map((type) => (
                <button 
                  key={`type-${type}`} 
                  onClick={() => { setFormType(type); setStep(2); }} 
                  className={`border rounded-xl p-8 text-center transition-all focus:outline-none focus:ring-1 focus:ring-slate-900 ${formType === type ? 'bg-slate-50 border-slate-900 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-400'}`}
                >
                  <Building size={32} strokeWidth={1.5} className={`mx-auto mb-4 ${formType === type ? 'text-slate-900' : 'text-slate-400'}`} />
                  <span className={`font-medium ${formType === type ? 'text-slate-900' : 'text-slate-700'}`}>{type}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="text-xl font-medium mb-6 text-slate-900 text-center">{t.step2}</h3>
            <div className="space-y-4 max-w-sm mx-auto">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">{t.step2.includes('Where') ? 'City / Municipality' : 'Město / Obec'}</label>
                <input 
                  type="text" 
                  value={formCity}
                  onChange={(e) => setFormCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-slate-900 font-normal" 
                  placeholder={t.step2.includes('Where') ? 'E.g. Cheb' : 'Např. Cheb'} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">{t.step2.includes('Where') ? 'Approx. Area (m²)' : 'Přibližná výměra (m²)'}</label>
                <input 
                  type="number" 
                  value={formArea}
                  onChange={(e) => setFormArea(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-slate-900 font-normal" 
                  placeholder={t.step2.includes('Where') ? 'E.g. 120' : 'Např. 120'} 
                />
              </div>
            </div>
            <div className="flex justify-between mt-10 max-w-sm mx-auto">
              <button onClick={() => setStep(1)} className="text-slate-500 font-medium hover:text-slate-900">Zpět</button>
              <button onClick={() => setStep(3)} className="bg-slate-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition-colors">{t.next}</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="text-xl font-medium mb-6 text-slate-900 text-center">{t.step3}</h3>
            <div className="space-y-4 max-w-sm mx-auto">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">{t.step3.includes('Contacts') ? 'Full Name' : 'Jméno a příjmení'} *</label>
                <input 
                  type="text" 
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 font-normal" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">{t.step3.includes('Contacts') ? 'Phone' : 'Telefon'} *</label>
                <input 
                  type="tel" 
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 font-normal" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">E-mail</label>
                <input 
                  type="email" 
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 font-normal" 
                />
              </div>
            </div>
            <div className="flex justify-between mt-10 max-w-sm mx-auto">
              <button onClick={() => setStep(2)} className="text-slate-500 font-medium hover:text-slate-900">Zpět</button>
              <button 
                onClick={submitForm} 
                disabled={isSending}
                className="bg-slate-900 text-white px-8 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isSending ? <Loader2 size={18} className="animate-spin" /> : null}
                {isSending ? (t.step3.includes('Contacts') ? "Sending..." : "Odesílám...") : t.submit}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MortgageCalculator({ t }) {
  const [amount, setAmount] = useState(5000000);
  const [years, setYears] = useState(25);
  const [rate, setRate] = useState(5.5);

  // Mortgage calculation formula
  const principal = amount;
  const monthlyRate = (rate / 100) / 12;
  const numberOfPayments = years * 12;
  
  let monthlyPayment = 0;
  if (monthlyRate === 0) {
    monthlyPayment = principal / numberOfPayments;
  } else {
    monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  }

  const formatCurrency = (val) => {
    return Math.round(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " CZK";
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden flex flex-col lg:flex-row">
      {/* Sliders Area */}
      <div className="p-8 md:p-14 flex-1 lg:w-2/3 border-b lg:border-b-0 lg:border-r border-slate-100">
        
        {/* Loan Amount Slider */}
        <div className="mb-10">
          <div className="flex justify-between items-end mb-4">
            <label className="font-medium text-slate-500">{t.calcAmount}</label>
            <span className="text-2xl font-semibold text-slate-900">{formatCurrency(amount)}</span>
          </div>
          <input 
            type="range" min="500000" max="20000000" step="100000"
            value={amount} onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
          />
        </div>

        {/* Years Slider */}
        <div className="mb-10">
          <div className="flex justify-between items-end mb-4">
            <label className="font-medium text-slate-500">{t.calcYears}</label>
            <span className="text-2xl font-semibold text-slate-900">{years}</span>
          </div>
          <input 
            type="range" min="5" max="35" step="1"
            value={years} onChange={(e) => setYears(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
          />
        </div>

        {/* Interest Rate Slider */}
        <div>
          <div className="flex justify-between items-end mb-4">
            <label className="font-medium text-slate-500">{t.calcRate}</label>
            <span className="text-2xl font-semibold text-slate-900">{rate.toFixed(1)} %</span>
          </div>
          <input 
            type="range" min="1" max="10" step="0.1"
            value={rate} onChange={(e) => setRate(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
          />
        </div>

      </div>

      {/* Result Area */}
      <div className="p-8 md:p-14 lg:w-1/3 bg-slate-900 text-white flex flex-col justify-center items-center text-center">
        <Calculator size={48} strokeWidth={1.5} className="text-slate-500 mb-6" />
        <h3 className="text-sm font-medium text-slate-400 mb-2 uppercase tracking-widest">{t.calcResult}</h3>
        <div className="text-4xl md:text-5xl font-semibold text-white mb-8">
          {formatCurrency(monthlyPayment)}
        </div>
        <p className="text-xs font-light text-slate-400">
          * Výpočet je pouze orientační a nezahrnuje další poplatky.
        </p>
      </div>
    </div>
  );
}