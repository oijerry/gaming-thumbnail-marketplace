import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Categories from "@/components/Categories/Categories";
import Trending from "@/components/Trending/Trending";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <Trending />
    </>
  );
}