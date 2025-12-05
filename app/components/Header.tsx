'use client';
import Link from 'next/link';
import { FolderOpen, Code, Buildings, Phone, Alien } from '@phosphor-icons/react';
import { usePathname } from 'next/navigation'; // added import

export default function Header() {
  // detect current pathname and decide if we're on the space-invaders page
  const pathname = usePathname();
  const isSpace = !!pathname && pathname.startsWith('/space-invaders');

  // helper: when on space route return "/" as href so anchor visually points to root
  const hrefOr = (orig: string) => (isSpace ? '/' : orig);

  // handler factory: when on space route force a full page reload to the target.
  const handleReload = (orig: string) => {
    if (!isSpace) return undefined;
    return (e: React.MouseEvent) => {
      e.preventDefault();
      // preserve fragment if present (e.g. '/#hero' -> '/#hero')
      const fragIndex = orig.indexOf('#');
      const target = fragIndex >= 0 ? '/' + orig.slice(fragIndex) : '/';
      window.location.href = target;
    };
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-sm p-4 border-b-4 border-white">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href={hrefOr('/#hero')} onClick={handleReload('/#hero')} aria-label="Go to Projects" title="Go to Projects">
          <h1 className="text-4xl font-bold text-black dark:text-white cursor-pointer">
            <span className='font-black'>{"<"} D.G /{">"}</span>
          </h1>
        </Link>

        <ul className="flex gap-6 items-center uppercase">
          <li>
            <Link
              className="text-lg text-black dark:text-white flex items-center gap-2 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              href={hrefOr('/#project-detail')}
              onClick={handleReload('/#project-detail')}
            >
              <FolderOpen size={25} />
              <span>Projects</span>
            </Link>
          </li>
          <li>
            <Link
              className="text-lg text-black dark:text-white flex items-center gap-2 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              href={hrefOr('/#techstack')}
              onClick={handleReload('/#techstack')}
            >
              <Code size={25} />
              <span>Tech Stack</span>
            </Link>
          </li>
          <li>
            <Link
              className="text-lg text-black dark:text-white flex items-center gap-2 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              href={hrefOr('/#experience')}
              onClick={handleReload('/#experience')}
            >
              <Buildings size={25} />
              <span>Experience</span>
            </Link>
          </li>
          <li>
            <Link
              className="text-lg text-black dark:text-white flex items-center gap-2 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              href={hrefOr('/#contactme')}
              onClick={handleReload('/#contactme')}
            >
              <Phone size={25} />
              <span>Contact Me</span>
            </Link>
          </li>
        </ul>

        {/* link to the standalone Space Invaders route */}
        <Link
          href={hrefOr('/space-invaders')}
          aria-label="Alien"
          title="Alien"
          className="ml-2 p-2 rounded-full transition-colors text-xl text-black dark:text-white flex items-center"
          onClick={handleReload('/space-invaders')}
        >
          <Alien size={32} />
        </Link>
      </nav>
    </header>
  );
}