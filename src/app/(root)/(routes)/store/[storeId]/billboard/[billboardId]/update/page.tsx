import BillboardForm from "@/components/forms/billboard-form";
import { prisma } from "@/lib/db";

interface UpdateBillboardPageProps {
  params: {
    billboardId: string;
    storeId: string;
  };
}

export default async function UpdateBillboardPage({
  params,
}: UpdateBillboardPageProps) {
  const billboard = await prisma.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <>
      <BillboardForm initialData={billboard!} />
    </>
  );
}
