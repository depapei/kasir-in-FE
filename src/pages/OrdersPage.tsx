import { useOrders } from "../hooks/useApi";
import { Search, Filter, Calendar } from "lucide-react";
import { Order } from "../types/order";

export default function OrdersPage() {
  const { data: orders, isLoading } = useOrders();

  return (
    <div className="flex-1 flex flex-col p-8 bg-gray-50 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Order History
          </h1>
          <p className="text-gray-500 text-sm">View and manage past orders</p>
        </div>
        <div className="flex gap-4 justify-between w-full md:justify-start md:w-fit">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border-none rounded-2xl bg-white shadow-sm focus:ring-2 focus:ring-orange-500 text-sm"
              placeholder="Search orders..."
            />
          </div>
          <button className="bg-white p-3 rounded-2xl shadow-sm text-gray-600 hover:text-orange-500 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
        {isLoading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-24 bg-gray-100 rounded-2xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : orders?.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <Calendar className="w-16 h-16 mb-4 opacity-20" />
            <p>No orders found</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {orders?.map((order: Order) => (
              <div
                key={order.order_id || order.id}
                className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center font-bold text-lg">
                    #{(order.order_id || order.id).slice(-4)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      {order.customer_name}
                    </h3>
                    <p className="text-gray-500 text-sm flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(order.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-gray-500 text-sm mb-1">
                      {order.items.length} items
                    </p>
                    <p className="font-bold text-gray-900 text-xl">
                      ${order.total.toLocaleString()}
                    </p>
                  </div>
                  <div className="px-4 py-2 bg-green-100 text-green-600 rounded-xl font-semibold text-sm">
                    Completed
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
