"use client";

import { useEffect, useState } from "react";
import TemplateCard from "@/components/TemplateCard/TemplateCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import CategoryFilter from "@/components/CategoryFilter/CategoryFilter";

type Template = {
  _id: string;
  title: string;
  category: string;
  price: number;
  image: string;
  badge: string;
  rating: number;
  downloads: number;
};

export default function Trending() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTemplates();
    }, 300);

    return () => clearTimeout(timer);
  }, [search, selectedCategory]);

  const fetchTemplates = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (search.trim()) {
        params.append("search", search);
      }

      if (selectedCategory !== "All") {
        params.append("category", selectedCategory);
      }

      const res = await fetch(
        `/api/templates/search?${params.toString()}`
      );

      const data = await res.json();

      if (data.success) {
        setTemplates(data.templates);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#050505] py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl text-cyan-400 font-bold text-center mb-12">
          Trending Templates
        </h2>

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <CategoryFilter
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />

        {loading ? (
          <div className="text-center text-cyan-400 text-xl mt-10">
            Loading Templates...
          </div>
        ) : templates.length === 0 ? (
          <div className="text-center text-gray-400 text-xl mt-10">
            No Templates Found 😢
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 mt-10">
            {templates.map((template) => (
              <TemplateCard
                key={template._id}
                template={template}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}