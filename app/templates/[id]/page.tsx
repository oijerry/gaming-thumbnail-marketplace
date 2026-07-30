import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Template from "@/models/Template";
import TemplateDetailsClient from "@/components/TemplateDetailsClient";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TemplateDetails({ params }: Props) {
  await connectDB();

  const { id } = await params;

  const template = (await Template.findById(id).lean()) as
    | {
        _id: string;
        title: string;
        image: string;
        price: number;
      }
    | null;

  if (!template) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
       <TemplateDetailsClient
  templateId={template._id.toString()}
  template={JSON.parse(JSON.stringify(template))}
/>
      </div>
    </div>
  );
}