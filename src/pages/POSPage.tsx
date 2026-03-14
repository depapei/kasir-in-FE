import {
  Archive,
  ShoppingBag,
  SlidersHorizontal,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import CartItem from "../components/CartItem";
import CategoryFilter from "../components/CategoryFilter";
import OrderSummary from "../components/OrderSummary";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { useCategories, useCreateOrder, useProducts } from "../hooks/useApi";
import { useCartStore } from "../store/useCartStore";
import { Category } from "../types/category";
import { Product } from "../types/product";
import { AnimatePresence, motion } from "motion/react";

export default function POSPage() {
  const [search, setSearch] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const {
    selectedCategory,
    setSelectedCategory,
    cartItems,
    addItem,
    increaseQty,
    decreaseQty,
    removeItem,
    customerName,
    clearCart,
  } = useCartStore();

  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { data: products, isLoading: isProductsLoading } = useProducts({
    category_id: selectedCategory || undefined,
    search: search || undefined,
  });

  const createOrderMutation = useCreateOrder();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );
  const discount = 0;
  const serviceCharge = subtotal * 0.2; // 20% in the image
  const tax = 0.5; // Fixed tax in the image
  const total = subtotal - discount + serviceCharge + tax;

  const validate = cartItems.length !== 0;
  const handleCreateOrder = () => {
    if (!validate) {
      alert("Cart is empty");
      return;
    }

    createOrderMutation.mutate(
      {
        customer_name: customerName || "Guest",
        items: cartItems.map((item) => ({
          product_id: item.productId,
          qty: item.qty,
          price: item.price,
        })),
      },
      {
        onSuccess: () => {
          alert("Order created successfully!");
          clearCart();
          setIsCartOpen(false);
        },
        onError: () => {
          alert("Failed to create order");
        },
      },
    );
  };

  const selectedCategoryName =
    categories?.find((c: Category) => c.id === selectedCategory)?.name ||
    "All Items";
  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="flex w-full h-full bg-[#f3f4f6] relative">
      {/* Main Area */}
      <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 overflow-hidden w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-4">
          <div>
            <h2 className="text-primary-purple font-bold text-base md:text-lg mb-1 md:mb-2">
              Items
            </h2>
            <div className="flex items-center gap-2 cursor-pointer">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                {selectedCategory ? selectedCategoryName : "All"}
              </h1>
              {/* <Archive
                className="w-5 h-5 md:w-6 md:h-6 text-gray-900 mt-1"
                strokeWidth={3}
              /> */}
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
            <div className="flex-1 md:flex-none">
              <SearchBar value={search} onChange={setSearch} />
            </div>
            <button className="p-3 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition-colors shrink-0">
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Categories */}
        <CategoryFilter
          categories={categories || []}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          isLoading={isCategoriesLoading}
        />

        {/* Products Grid */}
        <div className="flex-1 overflow-y-auto pr-1 md:pr-2 pb-20 md:pb-8">
          {isProductsLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl md:rounded-4xl p-3 md:p-4 animate-pulse h-48 md:h-72"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
              {products?.map((product: Product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={addItem}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button for Mobile Cart */}
      <div className="lg:hidden fixed bottom-20 right-4 z-40">
        <button
          onClick={() => setIsCartOpen(true)}
          className="bg-primary-purple text-white p-4 rounded-full shadow-xl flex items-center justify-center relative active:scale-95 transition-transform"
        >
          <ShoppingBag className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Cart Overlay */}
      {isCartOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-50 flex justify-end transition-opacity"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="w-full sm:w-96 bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 pb-4 flex justify-between items-center border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">
                Current Order
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 bg-gray-100 rounded-full text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 pb-2">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/150?img=47"
                  alt="Customer"
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-medium text-gray-900">Emma Wang</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <p>No items in cart</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.productId}
                      item={item}
                      onIncrease={increaseQty}
                      onDecrease={decreaseQty}
                      removeItem={removeItem}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-100">
              <OrderSummary
                subtotal={subtotal}
                discount={discount}
                serviceCharge={serviceCharge}
                tax={tax}
                total={total}
                onContinue={handleCreateOrder}
                isProcessing={createOrderMutation.isPending}
                isDisabled={cartItems.length === 0}
              />
            </div>
          </div>
        </div>
      )}

      {/* Desktop/Tablet Current Order Panel */}
      <div className="hidden lg:flex w-[320px] xl:w-100 bg-white flex-col h-full shadow-[-10px_0_30px_rgba(0,0,0,0.02)] z-20 rounded-l-4xl my-4 mr-4 shrink-0">
        <div className="p-6 xl:p-8 pb-4">
          <h2 className="text-xl xl:text-2xl font-bold text-gray-900 mb-6">
            Current Order
          </h2>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/150?img=47"
                alt="Customer"
                className="w-10 h-10 rounded-full"
              />
              <span className="font-medium text-gray-900">Emma Wang</span>
            </div>

            <button
              onClick={() => {
                clearCart();
              }}
              className="w-12 h-12 bg-primary-purple/5 text-red-600 hover:text-white rounded-xl flex items-center justify-center hover:bg-red-600 group-hover:text-white transition-colors hover:cursor-pointer"
            >
              <Trash2 className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 xl:px-8">
          {cartItems.length === 0 ? (
            <AnimatePresence>
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <p>No items in cart</p>
              </div>
            </AnimatePresence>
          ) : (
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.productId}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  layout
                  className="flex flex-col gap-2"
                >
                  <CartItem
                    key={item.productId}
                    item={item}
                    onIncrease={increaseQty}
                    onDecrease={decreaseQty}
                    removeItem={removeItem}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        <div className="p-6">
          <OrderSummary
            subtotal={subtotal}
            discount={discount}
            serviceCharge={serviceCharge}
            tax={tax}
            total={total}
            onContinue={handleCreateOrder}
            isProcessing={createOrderMutation.isPending}
            isDisabled={!validate}
          />
        </div>
      </div>
    </div>
  );
}
