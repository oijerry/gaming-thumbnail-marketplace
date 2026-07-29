const categories = [
  {
    name: "GTA VI",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500",
  },
  {
    name: "Free Fire",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500",
  },
  {
    name: "BGMI",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=500",
  },
  {
    name: "Valorant",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500",
  },
  {
    name: "Minecraft",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500",
  },
  {
    name: "CS2",
    image: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=500",
  },
];

export default function Categories() {
  return (
    <section className="bg-black py-20 px-6">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-5xl font-bold text-center text-cyan-400 mb-14">
          Browse Categories
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {categories.map((item) => (
            <div
              key={item.name}
              className="group overflow-hidden rounded-2xl border border-cyan-500 bg-zinc-900 transition duration-300 hover:scale-105 hover:shadow-[0_0_40px_#00ffff]"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-60 w-full object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="p-6">

                <h3 className="text-2xl font-bold text-white">
                  {item.name}
                </h3>

                <button className="mt-5 rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-black transition hover:bg-cyan-400">
                  Explore
                </button>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}