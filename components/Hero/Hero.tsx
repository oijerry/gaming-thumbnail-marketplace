export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">

      {/* Background Glow */}
      <div className="absolute h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-3xl"></div>
      <div className="absolute right-10 top-10 h-[350px] w-[350px] rounded-full bg-purple-600/20 blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">

        <h1 className="text-6xl font-extrabold leading-tight">
          Premium Gaming
          <br />
          <span className="text-cyan-400">
            Thumbnail Marketplace
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-300 mx-auto">
          Buy high-quality YouTube Gaming Thumbnail Templates
          for GTA VI, Free Fire, BGMI, Valorant and many more.
        </p>

        <div className="mt-10 flex justify-center gap-5">
          <button className="rounded-xl bg-cyan-500 px-8 py-4 font-bold text-black transition hover:scale-105">
            Browse Templates
          </button>

          <button className="rounded-xl border border-cyan-500 px-8 py-4 font-bold text-cyan-400 transition hover:bg-cyan-500 hover:text-black">
            Explore Categories
          </button>
        </div>

      </div>

    </section>
  );
}