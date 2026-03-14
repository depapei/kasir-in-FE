interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  serviceCharge: number;
  tax: number;
  total: number;
  onContinue: () => void;
  isProcessing: boolean;
  isDisabled: boolean;
}

export default function OrderSummary({
  subtotal,
  discount,
  serviceCharge,
  tax,
  total,
  onContinue,
  isProcessing,
  isDisabled,
}: OrderSummaryProps) {
  return (
    <div className="p-4 md:p-6 bg-gray-50 rounded-2xl md:rounded-4xl mt-auto">
      <div className="flex flex-col gap-2 md:gap-3 mb-4 md:mb-6">
        <div className="flex justify-between text-gray-600 text-sm md:text-base">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">
            Rp. {subtotal.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-gray-600 text-sm md:text-base">
          <span>Discount</span>
          <span className="font-medium text-gray-900">
            Rp. {discount.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-gray-600 text-sm md:text-base">
          <span>Service Charge</span>
          <span className="font-medium text-gray-900">20%</span>
        </div>
        <div className="flex justify-between text-gray-600 text-sm md:text-base">
          <span>Tax</span>
          <span className="font-medium text-gray-900">
            Rp. {tax.toLocaleString()}
          </span>
        </div>

        <div className="border-t border-dashed border-gray-300 my-1 md:my-2"></div>

        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-bold text-lg md:text-xl">
            Total
          </span>
          <span className="text-gray-900 font-bold text-xl md:text-2xl">
            Rp. {total.toLocaleString()}
          </span>
        </div>
      </div>

      <button
        onClick={onContinue}
        disabled={isDisabled || isProcessing}
        className="w-full bg-primary-purple hover:bg-[#3b00b3] disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 md:py-4 rounded-full font-medium text-base md:text-lg flex items-center justify-center transition-all shadow-lg active:scale-[0.98]"
      >
        {isProcessing ? "Processing..." : "Continue"}
      </button>
    </div>
  );
}
