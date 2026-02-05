import HeroContent from "./section/HeroContent";
import HeroImages from "./section/HeroImages";
import FilterSection from "./section/FilterSection";
import PetsSection from "./section/PetsSection";
import Footer from "@/shared/layout/Footer";

const HomePage = () => {
  return (
    <>
      <section className="bg-background px-4 sm:px-6 py-8 md:py-12">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <HeroContent />
          <HeroImages />
        </div>
      </section>
      
      <FilterSection />
      <PetsSection />
      <Footer />
    </>
  )
}

export default HomePage;