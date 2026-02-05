export interface Pet {
  id: string;
  name: string;
  species: string;
  breed?: string;
  age: number;
  imageUrl: string;
  description?: string;
  tutorName?: string;
  location?: string;
}
