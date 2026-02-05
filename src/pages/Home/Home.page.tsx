import HeroContent from "./section/HeroContent";
import HeroImages from "./section/HeroImages";

const HomePage = () => {
  return (
  <section className="bg-background px-4 sm:px-6 py-12 md:py-20">
  <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
    
    <HeroContent />

   
    <HeroImages />
  </div>
</section>
  )
}

export default HomePage;