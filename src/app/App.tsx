import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { projectId, publicAnonKey } from '/utils/supabase/info';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css";
import Logo from "./components/Logo";

import martini1 from "figma:asset/58b1627daffb3b845483fb721f95a43885da2b77.png";

import texturesV1 from "figma:asset/5639ea4fd7d179ffb2946c17594831fd8f78cd0d.png";
import texturesV2 from "figma:asset/9386d2c30968c927cc3105dac9096174631bd4f8.png";
import texturesV3 from "figma:asset/4154d84ed1daac380aec415dc5aa534006e9e4ae.png";

import texturesI1 from "figma:asset/7876323ece53de10353d4adb29958c7a45aebd8e.png";
import texturesI2 from "figma:asset/63e87aa8632d42050d2e0b22fda35f49294d5ec4.png";

import theSwim1 from "figma:asset/3c5cd9cdafefd548e993ae86fc1762587f9c864d.png";
import theSwim2 from "figma:asset/9c8f80a50503334e39b4e8ad35968e9b5d3e3c5c.png";

import texturesII1 from "../imports/IMG_9780_Large.jpeg";
import texturesII2 from "../imports/IMG_9776_Large.jpeg";

import silla1 from "../imports/IMG_9774_Large.jpeg";
import silla2 from "../imports/IMG_9770_Large.jpeg";
import silla3 from "../imports/IMG_9771_Large.jpeg";

import bodegon1 from "figma:asset/85cd41c8d70cca74ce3ecaa15ed0db7cedf6532a.png";
import bodegon2 from "figma:asset/9600995a1b41f405612e48b8431f7f795b21163e.png";
import bodegon3 from "figma:asset/0b858fbe28c14e4dd36e3c7b9752faeb471f51d8.png";

import texturesIV1 from "figma:asset/9ff4145e7012eeff468c39b56117a74dd26568ab.png";
import texturesIV2 from "figma:asset/781589af853813d7db2b0f55ce58420b07c13bd0.png";

type Language = "en" | "es";

interface Artwork {
  title: string;
  price: number;
  images: string[];
  dimensions?: string;
  sold?: boolean;
}

const translations = {
  en: {
    nav: {
      work: "Works",
      studio: "About",
      contact: "Contact",
    },
    hero: {
      description: "Contemporary artist | textured painting | unique pieces",
    },
    work: {
      title: "Available Works",
      subtitle: "Original paintings available for purchase",
    },
    artworks: [
      { title: "Martini", dimensions: "60 x 80 cm" },
      { title: "Textures V", dimensions: "100 x 80 cm" },
      { title: "Textures I", dimensions: "50 x 70 cm" },
      { title: "The Swim", dimensions: "30 x 40 cm" },
      { title: "Textures II", dimensions: "40 x 60 cm" },
      { title: "Silla", dimensions: "40 x 60 cm" },
      { title: "Bodegón", dimensions: "80 x 80 cm" },
      { title: "Textures IV", dimensions: "100 x 80 cm" },
    ],
    approach: {
      title: "About Me",
      description:
        "I create contemporary art that explores the intersection of color, form, and emotion. Each piece is an original work, painted in my studio with a focus on texture and visual impact.",
      principles: [
        {
          title: "Original Art",
          description: "Every painting is a unique original, hand-painted with care and attention to detail",
        },
        {
          title: "Quality Materials",
          description: "Professional-grade paints and canvases to ensure longevity and vibrant colors",
        },
        {
          title: "Direct from Studio",
          description: "Purchase directly from the artist with secure payment and worldwide shipping",
        },
      ],
    },
    cta: {
      title: "Commission a Piece",
      subtitle: "Interested in a custom artwork for your space?",
      button: "GET IN TOUCH",
    },
    footer: {
      copyright: "© 2026 Arconada Studio",
    },
    buyButton: "Buy Now",
    inquiryButton: "Ask a Question",
    soldButton: "Sold",
    currency: "EUR",
    checkout: {
      loading: "Processing...",
      error: "Error processing payment. Please try again.",
      successTitle: "Thank you for your purchase!",
      successMessage: "Your order has been confirmed. We will contact you soon with shipping details.",
      canceledTitle: "Purchase Canceled",
      canceledMessage: "The payment was not completed. You can try again anytime.",
      close: "Close",
    },
  },
  es: {
    nav: {
      work: "Obras",
      studio: "Sobre Mí",
      contact: "Contacto",
    },
    hero: {
      description: "Artista contemporánea | pintura matérica | piezas únicas",
    },
    work: {
      title: "Obras Disponibles",
      subtitle: "Pinturas originales disponibles para compra",
    },
    artworks: [
      { title: "Martini", dimensions: "60 x 80 cm" },
      { title: "Textures V", dimensions: "100 x 80 cm" },
      { title: "Textures I", dimensions: "50 x 70 cm" },
      { title: "The Swim", dimensions: "30 x 40 cm" },
      { title: "Textures II", dimensions: "40 x 60 cm" },
      { title: "Silla", dimensions: "40 x 60 cm" },
      { title: "Bodegón", dimensions: "80 x 80 cm" },
      { title: "Textures IV", dimensions: "100 x 80 cm" },
    ],
    approach: {
      title: "Sobre Mí",
      description:
        "Creo arte contemporáneo que explora la intersección del color, la forma y la emoción. Cada pieza es una obra original, pintada en mi estudio con un enfoque en la textura y el impacto visual.",
      principles: [
        {
          title: "Arte Original",
          description: "Cada cuadro es un original único, pintado a mano con cuidado y atención al detalle",
        },
        {
          title: "Materiales de Calidad",
          description: "Pinturas y lienzos de grado profesional para garantizar longevidad y colores vibrantes",
        },
        {
          title: "Directo del Estudio",
          description: "Compra directamente del artista con pago seguro y envío a todo el mundo",
        },
      ],
    },
    cta: {
      title: "Encarga una Obra",
      subtitle: "¿Interesado en una obra personalizada para tu espacio?",
      button: "CONTÁCTAME",
    },
    footer: {
      copyright: "© 2026 Arconada Studio",
    },
    buyButton: "Comprar Ahora",
    inquiryButton: "Consultar",
    soldButton: "Vendido",
    currency: "EUR",
    checkout: {
      loading: "Procesando...",
      error: "Error al procesar el pago. Inténtalo de nuevo.",
      successTitle: "¡Gracias por tu compra!",
      successMessage: "Tu pedido ha sido confirmado. Nos pondremos en contacto contigo pronto con los detalles de envío.",
      canceledTitle: "Compra Cancelada",
      canceledMessage: "El pago no se completó. Puedes intentarlo de nuevo cuando quieras.",
      close: "Cerrar",
    },
  },
};

export default function App() {
  const [language, setLanguage] = useState<Language>("es");
  const t = translations[language];

  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "canceled" | "error"; message: string; title: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const worksRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll();

  const heroY = useTransform(scrollYProgress, [0, 0.3], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Handle Stripe success/cancel URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      const artworkName = params.get("artwork") || "";
      setNotification({
        type: "success",
        title: t.checkout.successTitle,
        message: t.checkout.successMessage,
      });
      // Clean URL params
      window.history.replaceState({}, "", window.location.pathname);
    } else if (params.get("canceled") === "true") {
      setNotification({
        type: "canceled",
        title: t.checkout.canceledTitle,
        message: t.checkout.canceledMessage,
      });
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleStripeCheckout = async (artworkTitle: string, price: number, artworkId: string) => {
    setCheckoutLoading(artworkId);
    try {
      const baseUrl = `${window.location.origin}${window.location.pathname}`;
      const successUrl = `${baseUrl}?success=true&artwork=${encodeURIComponent(artworkTitle)}`;
      const cancelUrl = `${baseUrl}?canceled=true`;

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dcbbc65e/create-checkout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ artworkTitle, price, artworkId, successUrl, cancelUrl }),
        }
      );

      const data = await response.json();
      console.log('Checkout response:', data);

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('No Stripe URL returned:', data);
        setNotification({
          type: 'error',
          title: t.checkout.error,
          message: data.error || data.details || 'No se recibió URL de pago',
        });
      }
    } catch (error) {
      console.error('Checkout fetch error:', error);
      setNotification({
        type: 'error',
        title: t.checkout.error,
        message: String(error),
      });
    } finally {
      setCheckoutLoading(null);
    }
  };

  const handleInquiry = (title: string, dimensions: string | undefined, price: number) => {
    const message = language === "es"
      ? `Hola,\n\nEstoy interesado/a en la obra:\n\nTítulo: ${title}\nDimensiones: ${dimensions || ""}\nPrecio: ${price}€\n\n¿Podrías darme más información?\n\nGracias.`
      : `Hello,\n\nI'm interested in:\n\nTitle: ${title}\nDimensions: ${dimensions || ""}\nPrice: ${price}€\n\nCould you give me more information?\n\nThank you.`;

    const subject = language === "es"
      ? `Consulta sobre "${title}"`
      : `Inquiry about "${title}"`;

    window.location.href = `mailto:martafrancoarco@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  };

  const artworkIds = ['martini', 'textures-v', 'textures-i', 'the-swim', 'textures-ii', 'silla', 'bodegon', 'textures-iv'];

  const artworks: Artwork[] = [
    {
      title: t.artworks[0].title,
      price: 300,
      images: [martini1],
      dimensions: t.artworks[0].dimensions,
    },
    {
      title: t.artworks[1].title,
      price: 500,
      images: [texturesV1, texturesV2, texturesV3],
      dimensions: t.artworks[1].dimensions,
    },
    {
      title: t.artworks[2].title,
      price: 300,
      images: [texturesI1, texturesI2],
      dimensions: t.artworks[2].dimensions,
    },
    {
      title: t.artworks[3].title,
      price: 100,
      images: [theSwim1, theSwim2],
      dimensions: t.artworks[3].dimensions,
    },
    {
      title: t.artworks[4].title,
      price: 300,
      images: [texturesII2, texturesII1],
      dimensions: t.artworks[4].dimensions,
    },
    {
      title: t.artworks[5].title,
      price: 300,
      images: [silla1, silla2, silla3],
      dimensions: t.artworks[5].dimensions,
    },
    {
      title: t.artworks[6].title,
      price: 0,
      images: [bodegon1, bodegon2, bodegon3],
      dimensions: t.artworks[6].dimensions,
      sold: true,
    },
    {
      title: t.artworks[7].title,
      price: 0,
      images: [texturesIV1, texturesIV2],
      dimensions: t.artworks[7].dimensions,
      sold: true,
    },
  ];

  return (
    <div className="relative min-h-screen bg-white text-primary overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 px-5 sm:px-8 py-5 sm:py-6 flex justify-between items-center transition-colors duration-300 ${scrolled ? "bg-white/90 backdrop-blur-sm" : "bg-transparent"}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Logo className={`text-base sm:text-lg font-light transition-colors duration-300 ${scrolled ? "text-primary" : "text-white md:text-primary"}`} />

        {/* Desktop nav */}
        <div className={`hidden md:flex gap-8 lg:gap-12 items-center transition-colors duration-300 ${scrolled ? "text-primary" : "text-white"}`}>
          <button onClick={() => scrollToSection(worksRef)} className="hover:opacity-60 transition-opacity cursor-pointer">
            {t.nav.work}
          </button>
          <button onClick={() => scrollToSection(aboutRef)} className="hover:opacity-60 transition-opacity cursor-pointer">
            {t.nav.studio}
          </button>
          <button onClick={() => scrollToSection(contactRef)} className="hover:opacity-60 transition-opacity cursor-pointer">
            {t.nav.contact}
          </button>
          <div className="flex gap-2 ml-4">
            <button onClick={() => setLanguage("en")} className={`hover:opacity-60 transition-opacity ${language === "en" ? "underline" : ""}`}>
              EN
            </button>
            <span>/</span>
            <button onClick={() => setLanguage("es")} className={`hover:opacity-60 transition-opacity ${language === "es" ? "underline" : ""}`}>
              ES
            </button>
          </div>
        </div>

        {/* Mobile: language + hamburger */}
        <div className={`flex md:hidden items-center gap-4 transition-colors duration-300 ${scrolled ? "text-primary" : "text-white"}`}>
          <div className="flex gap-1 text-sm">
            <button onClick={() => setLanguage("en")} className={`hover:opacity-60 transition-opacity ${language === "en" ? "underline" : ""}`}>
              EN
            </button>
            <span>/</span>
            <button onClick={() => setLanguage("es")} className={`hover:opacity-60 transition-opacity ${language === "es" ? "underline" : ""}`}>
              ES
            </button>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-[5px] w-6 justify-center items-center"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-[1.5px] transition-all duration-300 ${scrolled ? "bg-primary" : "bg-white"} ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
            <span className={`block w-6 h-[1.5px] transition-all duration-300 ${scrolled ? "bg-primary" : "bg-white"} ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-[1.5px] transition-all duration-300 ${scrolled ? "bg-primary" : "bg-white"} ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-primary flex flex-col items-center justify-center gap-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {[
              { label: t.nav.work, ref: worksRef },
              { label: t.nav.studio, ref: aboutRef },
              { label: t.nav.contact, ref: contactRef },
            ].map(({ label, ref }) => (
              <button
                key={label}
                onClick={() => scrollToSection(ref)}
                className="text-primary-foreground text-4xl tracking-widest hover:opacity-60 transition-opacity"
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center overflow-hidden">
        {/* Mobile: full bleed image + text overlay */}
        <div className="absolute inset-0 md:hidden">
          <motion.img
            src={artworks[0].images[0]}
            alt={artworks[0].title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <motion.div
            className="absolute inset-0 flex flex-col justify-center px-8"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <Logo className="text-white text-[18vw] font-light" />
            </motion.div>
            <motion.p
              className="text-base text-white/80"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              {t.hero.description}
            </motion.p>
          </motion.div>
        </div>

        {/* Desktop: two columns */}
        <div className="hidden md:grid absolute inset-0 grid-cols-2">
          {/* Left: Text */}
          <motion.div
            className="flex flex-col justify-center px-16 lg:px-24"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <Logo className="text-[10vw] font-light" />
            </motion.div>
            <motion.p
              className="text-lg max-w-md text-primary/70"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              {t.hero.description}
            </motion.p>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            className="relative overflow-hidden"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.img
              src={artworks[0].images[0]}
              alt={artworks[0].title}
              className="w-full h-full object-cover"
              style={{ scale: 1.2 }}
            />
          </motion.div>
        </div>
      </section>

      {/* Featured Work */}
      <section ref={worksRef} className="px-8 lg:px-16 py-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl lg:text-8xl tracking-tight mb-4">{t.work.title}</h2>
          <p className="text-primary/60 mb-24 text-lg">{t.work.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {artworks.map((artwork, index) => {
            const sliderSettings = {
              dots: true,
              infinite: artwork.images.length > 1,
              speed: 600,
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              adaptiveHeight: false,
            };

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative mb-4">
                  {artwork.images.length > 1 ? (
                    <Slider {...sliderSettings}>
                      {artwork.images.map((image, imgIndex) => (
                        <div key={imgIndex}>
                          <div className="aspect-[4/5] overflow-hidden">
                            <img
                              src={image}
                              alt={`${artwork.title} - ${imgIndex + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      ))}
                    </Slider>
                  ) : (
                    <div className="aspect-[4/5] overflow-hidden">
                      <motion.img
                        src={artwork.images[0]}
                        alt={artwork.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-2xl tracking-tight mb-1">{artwork.title}</h3>
                    {artwork.dimensions && (
                      <p className="text-primary/50 text-sm">{artwork.dimensions}</p>
                    )}
                  </div>
                  <div className="text-right">
                    {!artwork.sold && (
                      <p className="text-2xl tracking-tight">{artwork.price} {t.currency}</p>
                    )}
                  </div>
                </div>
                {artwork.sold ? (
                  <div className="w-full py-3 tracking-wide transition-colors bg-muted text-muted-foreground text-center">
                    {t.soldButton}
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStripeCheckout(artwork.title, artwork.price, artworkIds[index])}
                      disabled={checkoutLoading === artworkIds[index]}
                      className="flex-1 py-3 tracking-wide transition-colors bg-primary text-primary-foreground hover:bg-primary/90 text-center disabled:opacity-60 disabled:cursor-wait"
                    >
                      {checkoutLoading === artworkIds[index] ? t.checkout.loading : t.buyButton}
                    </button>
                    <button
                      onClick={() => handleInquiry(artwork.title, artwork.dimensions, artwork.price)}
                      className="px-4 py-3 tracking-wide transition-colors border border-primary text-primary hover:bg-primary/5 text-center"
                    >
                      {t.inquiryButton}
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Approach */}
      <section ref={aboutRef} className="px-8 lg:px-16 py-32 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl lg:text-7xl tracking-tight mb-8">{t.approach.title}</h2>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              {t.approach.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {t.approach.principles.map((principle, index) => (
              <div key={index}>
                <h3 className="text-xl mb-3 tracking-tight">{principle.title}</h3>
                <p className="text-primary-foreground/70 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section ref={contactRef} className="px-8 lg:px-16 py-48">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl lg:text-9xl tracking-tighter mb-8">{t.cta.title}</h2>
          <p className="text-xl text-primary/60 mb-8">
            {t.cta.subtitle}
          </p>
          <p className="text-lg text-primary mb-12">
            martafrancoarco@gmail.com
          </p>
          <motion.a
            href="https://www.instagram.com/arconadastudio?igsh=MWpoeWs1ejU1YzFpdg%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-12 py-4 bg-primary text-primary-foreground tracking-wider hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Instagram
          </motion.a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-8 lg:px-16 py-12 border-t border-primary/10">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="text-sm text-primary/50">{t.footer.copyright}</div>
          <div className="flex gap-8 text-sm text-primary/50">
            <a
              href="https://www.instagram.com/arconadastudio?igsh=MWpoeWs1ejU1YzFpdg%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Instagram
            </a>
            <a
              href="mailto:martafrancoarco@gmail.com"
              className="hover:text-primary transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </footer>

      {/* Notification Modal */}
      <AnimatePresence>
        {notification && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setNotification(null)}
          >
            <motion.div
              className="bg-white p-8 max-w-md w-full text-center"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                notification.type === "success" ? "bg-green-100" :
                notification.type === "canceled" ? "bg-yellow-100" : "bg-red-100"
              }`}>
                {notification.type === "success" ? (
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : notification.type === "canceled" ? (
                  <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <h3 className="text-xl font-medium mb-2">{notification.title}</h3>
              <p className="text-primary/60 mb-6">{notification.message}</p>
              <button
                onClick={() => setNotification(null)}
                className="px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors tracking-wide"
              >
                {t.checkout.close}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}