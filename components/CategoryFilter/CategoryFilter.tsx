const categories = [
  "All",
  "Free Fire",
  "BGMI",
  "GTA VI",
  "Valorant",
];

type Props = {
  selected: string;
  setSelected: (value: string) => void;
};

export default function CategoryFilter({
  selected,
  setSelected,
}: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-10">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelected(category)}
          className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
            selected === category
              ? "bg-cyan-400 text-black"
              : "bg-zinc-900 text-white hover:bg-cyan-500 hover:text-black"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}