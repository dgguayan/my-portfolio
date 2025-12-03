'use client';
import { FolderOpen, Code, Buildings, Phone, Alien } from '@phosphor-icons/react';

export default function Header() {
  return (
    // make header sticky, semi-transparent and above background elements
    <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-sm p-4 border-b-4 border-white">
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
        <a
          href="#space-invaders"
          aria-label="Alien"
          title="Alien"
          className="ml-2 p-2 rounded-full transition-colors text-xl text-black dark:text-white flex items-center"
        >
          <Alien size={32} />
        </a>
      </nav>
    </header>
  );
}