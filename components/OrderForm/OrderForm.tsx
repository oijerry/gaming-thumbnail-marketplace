"use client";

type Props = {
  customerName: string;
  setCustomerName: (value: string) => void;

  customerEmail: string;
  setCustomerEmail: (value: string) => void;
};

export default function OrderForm({
  customerName,
  setCustomerName,
  customerEmail,
  setCustomerEmail,
}: Props) {
  return (
    <div className="mt-8">
      <input
        type="text"
        placeholder="Enter Your Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        className="w-full p-4 rounded-xl bg-zinc-800 text-white border border-cyan-500"

        
      />
      <input
  type="email"
  placeholder="Enter Your Email"
  value={customerEmail}
  onChange={(e) => setCustomerEmail(e.target.value)}
  className="w-full p-4 rounded-xl bg-zinc-800 text-white border border-cyan-500 mt-4"
/>


    </div>
  );
}