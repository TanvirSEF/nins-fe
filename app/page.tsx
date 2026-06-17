import { Navbar } from "@/components/home/navbar";
import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";
import { Services } from "@/components/home/services";
import { Footer } from "@/components/home/footer";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Services />
      </main>
      <Footer />
    </div>
  );
}
