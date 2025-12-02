'use client';
import { SquaresFour } from '@phosphor-icons/react';

type FilterProps = {
  onFilterSelect?: (filter: string) => void;
};

export default function Filter({ onFilterSelect }: FilterProps) {
  const filters = ["All", "Figma Prototypes", "Laravel", "Flutter", "React Native", "Android Studio", "Django", "Next.js", "PHP", "Java", "Python", "COBOL", "JavaScript", "React", "Laravel Blade"];

  return (
    <div className="flex justify-center mb-2 space-x-4">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterSelect?.(filter)}
          className="px-4 py-2 bg-white text-black text-lg rounded hover:bg-gray-300 transition-colors flex items-center"
          aria-pressed="false"
          type="button"
        >
          
          <span>{filter}</span>
        </button>
      ))}
    </div>
  );
}