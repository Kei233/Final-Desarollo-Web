import TopStrip from "./components/TopStrip";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PlatoDelDia from "./components/PlatoDelDia";
import Menu from "./components/Menu";
import Nosotros from "./components/Nosotros";
import Pedir from "./components/Pedir";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <TopStrip />
      <Header />
      <main>
        <Hero />
        <PlatoDelDia />
        <Menu />
        <Nosotros />
        <Pedir />
      </main>
      <Footer />
    </>
  );
}
