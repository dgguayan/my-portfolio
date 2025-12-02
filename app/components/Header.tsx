'use client';
import { useEffect, useState } from 'react';
import { FolderOpen, Code, Buildings, Phone, Sun, MoonStars } from '@phosphor-icons/react';

export default function Header() {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const startDark = stored ? stored === 'dark' : prefersDark;
    setIsDark(startDark);
    if (startDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="bg-black p-4 border-b-4 border-white">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-4xl font-bold text-black dark:text-white"><span className='font-black'>{"<"} D.G /{">"}</span></h1>
        <ul className="flex gap-6 items-center uppercase">
          <li>
            <a
              className="text-2xl text-black dark:text-white flex items-center gap-2 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              href="#project-detail"
            >
              <FolderOpen size={32} />
              <span>Projects</span>
            </a>
          </li>
          <li>
            <a
              className="text-2xl text-black dark:text-white flex items-center gap-2 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              href="#techstack"
            >
              <Code size={32} />
              <span>Tech Stack</span>
            </a>
          </li>
          <li>
            <a
              className="text-2xl text-black dark:text-white flex items-center gap-2 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              href="#experience"
            >
              <Buildings size={32} />
              <span>Experience</span>
            </a>
          </li>
          <li>
            <a
              className="text-2xl text-black dark:text-white flex items-center gap-2 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              href="#contactme"
            >
              <Phone size={32} />
              <span>Contact Me</span>
            </a>
          </li>
        </ul>
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title="Toggle theme"
          className="ml-2 p-2 rounded-full transition-colors text-xl text-black dark:text-white"
        >
          {isDark ? <Sun size={32} color="#ffffff" weight="fill" /> : <MoonStars size={32} color="#ffffff" weight="fill" />}
        </button>
      </nav>
    </header>
  );
}