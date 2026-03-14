import { Plus, Minus } from "lucide-react";
import { CartItem as CartItemType } from "../types/cart";

interface CartItemProps {
  item: CartItemType;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  removeItem: (id: string) => void;
}

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  removeItem,
}: CartItemProps) {
  return (
    item.qty > 0 && (
      <div className="flex items-center gap-3 md:gap-4 py-3 md:py-4">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl overflow-hidden bg-gray-50 shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 text-sm md:text-base mb-0.5 md:mb-1 truncate">
            {item.name}
          </h4>
          <p className="text-gray-900 font-bold text-base md:text-lg">
            Rp. {item.price.toLocaleString()}
          </p>
        </div>

        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <button
            onClick={() => {
              if (item.qty === 1) {
                removeItem(item.productId);
              } else {
                onDecrease(item.productId);
              }
            }}
            className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-gray-600 text-white hover:bg-gray-700 transition-colors active:scale-95 shadow-sm"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3 h-3 md:w-4 md:h-4" strokeWidth={2.5} />
          </button>
          <span className="w-4 text-center font-bold text-gray-900 text-base md:text-lg">
            {item.qty}
          </span>
          <button
            onClick={() => onIncrease(item.productId)}
            className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-gray-900 text-white hover:bg-primary-purple transition-colors active:scale-95 shadow-sm"
            aria-label="Increase quantity"
          >
            <Plus className="w-3 h-3 md:w-4 md:h-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    )
  );
}
