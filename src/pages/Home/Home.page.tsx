import HeroContent from "./section/HeroContent";
import HeroImages from "./section/HeroImages";
import PetsSection from "./section/PetsSection";

const HomePage = () => {
  return (
    <div className="w-full">
      <section className="bg-background px-4 sm:px-6 py-8 md:py-12">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <HeroContent />
          <HeroImages />
        </div>
      </section>
      
      <PetsSection />
    </div>
  )
}

export default HomePage;