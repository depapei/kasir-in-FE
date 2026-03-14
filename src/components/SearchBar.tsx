import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full md:w-80">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-12 pr-4 py-3 border-none rounded-full bg-white shadow-sm focus:ring-2 focus:ring-primary-purple text-sm text-gray-900 placeholder-gray-400 outline-none transition-all"
        placeholder="Search items..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
