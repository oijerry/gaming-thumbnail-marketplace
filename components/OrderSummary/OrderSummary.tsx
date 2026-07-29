type Props = {
  title: string;
  category: string;
  price: number;
};

export default function OrderSummary({
  title,
  category,
  price,
}: Props) {
  return (
    <div className="bg-zinc-900 rounded-2xl p-6 mt-8 border border-cyan-500">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Order Summary
      </h2>

      <div className="space-y-3">

        <div className="flex justify-between">
          <span>Template</span>
          <span>{title}</span>
        </div>

        <div className="flex justify-between">
          <span>Category</span>
          <span>{category}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery</span>
          <span>24 Hours</span>
        </div>

        <hr className="border-zinc-700" />

        <div className="flex justify-between text-2xl font-bold text-cyan-400">
          <span>Total</span>
          <span>₹{price}</span>
        </div>

      </div>

    </div>
  );
}