import { DataTable } from "@/components/table/data-table";
import Api from "@/components/ui/api";
import Heading from "@/components/ui/heading";
import { getOrderByStoreId } from "@/lib/actions/orders";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";
import { OrderColumnType, OrderColumns } from "./components/column";

export default async function BillboardPage({
  params,
}: {
  params: { storeId: string };
}) {
  const orders = await getOrderByStoreId(params.storeId);

  const formattedOrders: OrderColumnType[] = orders.map((order) => ({
    id: order.id,
    address: order.address,
    products: order.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: formatter.format(
      order.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    createdAt: format(order.createdAt, "MM do yyyy"),
    isPaid: order.isPaid,
    phone: order.phone,
  }));

  return (
    <div className="min-h-[calc(100vh-5rem)] max-w-7xl mx-auto px-5">
      <div className="flex flex-row justify-between items-center">
        <Heading title="Orders" subtitle="All your Orders here" />
      </div>
      <DataTable columns={OrderColumns} data={formattedOrders} />
      <Api entityIdName="orderId" entityName="orders" />
    </div>
  );
}
