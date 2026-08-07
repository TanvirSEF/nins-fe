import { HeroSlider } from "./hero-slider"

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* 100% Edge-to-Edge Full Width Slider */}
      <div className="w-full">
        <HeroSlider />
      </div>
    </section>
  )
}
