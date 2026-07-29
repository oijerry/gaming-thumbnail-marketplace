export type Template = {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
  badge: string;
  rating: number;
  downloads: number;
  description: string;
};

const templates: Template[] = [
  {
    id: 1,
    title: "Dream Girl",
    category: "Free Fire",
    price: 99,
    image: "/templates/template1.jpg",
    badge: "Best Seller",
    rating: 4.9,
    downloads: 2450,
    description: "Professional Free Fire live stream thumbnail.",
  },
  {
    id: 2,
    title: "GTA VI Live",
    category: "GTA VI",
    price: 149,
    image: "/templates/template2.jpg",
    badge: "Trending",
    rating: 4.8,
    downloads: 1800,
    description: "Ultra HD GTA VI gaming thumbnail.",
  },
  {
    id: 3,
    title: "Grandmaster Push",
    category: "BGMI",
    price: 199,
    image: "/templates/template3.jpg",
    badge: "Premium",
    rating: 5,
    downloads: 3200,
    description: "BGMI conqueror push thumbnail.",
  },
];

export default templates;