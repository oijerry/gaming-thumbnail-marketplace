type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export default function SearchBar({ search, setSearch }: Props) {
  return (
    <div className="max-w-2xl mx-auto mb-12">
      <input
        type="text"
        placeholder="🔍 Search Templates..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-zinc-900 border border-cyan-500 rounded-2xl px-6 py-4 text-white outline-none focus:ring-2 focus:ring-cyan-400"
      />
    </div>
  );
}