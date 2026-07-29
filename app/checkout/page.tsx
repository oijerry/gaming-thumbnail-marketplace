export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6">

      <div className="bg-zinc-900 border border-cyan-500 rounded-3xl p-10 max-w-xl w-full">

        <h1 className="text-4xl font-bold text-cyan-400">
          Checkout
        </h1>

        <p className="text-gray-400 mt-4">
          Review your order before payment.
        </p>

        <div className="mt-8 space-y-4">

          <div className="flex justify-between">
            <span>Template</span>
            <span>Dream Girl</span>
          </div>

          <div className="flex justify-between">
            <span>Price</span>
            <span>₹99</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery</span>
            <span>24 Hours</span>
          </div>

        </div>

        <button className="w-full mt-10 bg-cyan-500 py-4 rounded-2xl text-black font-bold hover:bg-cyan-400">
          Pay Securely
        </button>

      </div>

    </div>
  );
}