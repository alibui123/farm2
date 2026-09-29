import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustMarquee } from "@/components/TrustMarquee";
import { About } from "@/components/About";
import { Process } from "@/components/Process";
import { Products } from "@/components/Products";
import { WhoWeServe } from "@/components/WhoWeServe";
import { PurityPromise } from "@/components/PurityPromise";
import { Delivery } from "@/components/Delivery";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import {
  CustomCursor,
  ScrollProgress,
  WhatsAppFab,
} from "@/components/Chrome";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <TrustMarquee />
        <About />
        <Process />
        <Products />
        <WhoWeServe />
        <PurityPromise />
        <Delivery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
