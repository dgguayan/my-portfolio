'use client';
import { SquaresFour } from '@phosphor-icons/react';

type FilterProps = {
  // list of filter labels to render (e.g. ['All', 'React', 'Laravel'])
  filters: string[];
  onFilterSelect?: (filter: string) => void;
  active?: string;
};

export default function Filter({ filters, onFilterSelect, active }: FilterProps) {
  return (
    <div className="flex flex-wrap justify-center mb-6 gap-3 px-4">
      {filters.map((filter) => {
        const isActive = active === filter;
        return (
            <button
            key={filter}
            onClick={() => onFilterSelect?.(filter)}
            className={`px-4 py-2 rounded-sm text-sm md:text-base transition-colors flex items-center gap-2
              ${isActive ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200'}`}
            aria-pressed={isActive}
            type="button"
            >
            {filter}
            </button>
        );
      })}
    </div>
  );
}