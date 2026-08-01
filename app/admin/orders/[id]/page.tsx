import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminOrderPage({
  params,
}: Props) {
  await connectDB();

  const { id } = await params;

  const order = await Order.findById(id).lean();

  if (!order) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-10">
      <div className="max-w-4xl mx-auto rounded-2xl border border-cyan-500 p-8">

        <h1 className="text-3xl font-bold mb-8">
          Complete Order
        </h1>

        <div className="space-y-4">

          <p>
            <b>Customer :</b>{" "}
            {(order as any).customerName}
          </p>

          <p>
            <b>Template :</b>{" "}
            {(order as any).templateName}
          </p>

          <p>
            <b>Price :</b> ₹
            {(order as any).price}
          </p>

          <p>
            <b>Status :</b>{" "}
            {(order as any).status}
          </p>

        </div>

      </div>
    </div>
  );
}