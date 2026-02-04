import ImageCard from "@/shared/components/ImageCard";

import Pet1 from '@/assets/images/pet1.jpg';

import Dog5 from '@/assets/images/dog5.jpg';
import Dog2 from '@/assets/images/dog2.jpg';
const HeroImages = () => (
  <div className="relative grid grid-cols-2 gap-6">
    <ImageCard src={Dog5} className="row-span-2" />
    <ImageCard src={Dog2} />
    <ImageCard src={Pet1} />

    
   
  </div>
);

export default HeroImages;
