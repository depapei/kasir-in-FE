import { Plus } from "lucide-react";
import { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl md:rounded-[2rem] p-3 md:p-4 flex flex-col relative group hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 shadow-sm h-full">
      <div className="w-full aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden mb-3 md:mb-5 bg-gray-50 flex items-center justify-center p-1 md:p-2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg md:rounded-xl group-hover:scale-105 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="px-1 md:px-2 pb-8 md:pb-2 flex-1 flex flex-col justify-end">
        <h3 className="text-gray-900 font-medium text-sm md:text-lg mb-1 md:mb-2 line-clamp-2 md:line-clamp-1">
          {product.name}
        </h3>
        <p className="text-gray-900 font-bold text-base md:text-xl">
          Rp. {product.price.toLocaleString()}
        </p>
      </div>

      <button
        className="absolute bottom-3 right-3 md:bottom-5 md:right-5 bg-gray-900 text-white w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center hover:bg-primary-purple hover:cursor-pointer hover:scale-110 transition-all shadow-md active:scale-95"
        onClick={() => onAdd(product)}
        aria-label={`Add ${product.name} to cart`}
      >
        <Plus className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
      </button>
    </div>
  );
}
