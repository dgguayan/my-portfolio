'use client';
import React from 'react';
import { Cpu } from '@phosphor-icons/react';
import {
  SiReact,
  SiNextdotjs,
  SiDjango,
  SiFlutter,
  SiLaravel,
  SiPhp,
  SiJavascript,
  SiPython,
  SiDart,
  SiFigma,
  SiMysql,
  SiPostgresql,
  SiFirebase,
  SiCodeigniter,
  SiUnity,
  SiGit,
//   SiJava
} from 'react-icons/si';

export default function TechStack() {
  const categories = [
    {
      id: 'languages',
      title: 'Programming Languages',
      items: ['Python', 'PHP', 'Dart', 'C#', 'COBOL'],
    },
    {
      id: 'databases',
      title: 'Databases',
      items: ['MySQL', 'PostgreSQL', 'Firebase'],
    },
    {
      id: 'backend',
      title: 'Backend Frameworks / Server-Side Technologies',
      items: ['Laravel', 'CodeIgniter'],
    },
    {
      id: 'frontend',
      title: 'Frontend / Mobile App Frameworks',
      items: ['Flutter', 'React Native', 'Next.js'],
    },
    {
      id: 'game',
      title: 'Game Development',
      items: ['Unity', 'MagicaVoxel'],
    },
    {
      id: 'nocode',
      title: 'No-Code / Low-Code Platforms',
      items: ['FlutterFlow', 'Bubble.io'],
    },
    {
      id: 'design',
      title: 'Design / Prototyping Tools',
      items: ['Figma'],
    },
    {
      id: 'vcs',
      title: 'Version Control & Collaboration',
      items: ['Git'],
    },
  ];

  const icons: Record<string, React.ReactElement> = {
    'Figma': <SiFigma className="w-10 h-10" />,
    'React': <SiReact className="w-10 h-10" />,
    'Next.js': <SiNextdotjs className="w-10 h-10" />,
    'Django': <SiDjango className="w-10 h-10" />,
    'Flutter': <SiFlutter className="w-10 h-10" />,
    'Laravel': <SiLaravel className="w-10 h-10" />,
    'PHP': <SiPhp className="w-10 h-10" />,
    'JavaScript': <SiJavascript className="w-10 h-10" />,
    'Python': <SiPython className="w-10 h-10" />,
    'Dart': <SiDart className="w-10 h-10" />,
    'MySQL': <SiMysql className="w-10 h-10" />,
    'PostgreSQL': <SiPostgresql className="w-10 h-10" />,
    'Firebase': <SiFirebase className="w-10 h-10" />,
    'CodeIgniter': <SiCodeigniter className="w-10 h-10" />,
    'Unity': <SiUnity className="w-10 h-10" />,
    'Git': <SiGit className="w-10 h-10" />,
    // 'Java': <SiJava className="w-10 h-10" />,
  };

  return (
    <section id="techstack" className="py-8">
      <div className="container mx-auto space-y-10">
        <h3 className="text-5xl md:text-7xl font-black mb-6 text-center">Tech Stack</h3>

        {categories.map((cat) => (
          <div key={cat.id} className="bg-transparent ">
            <div className="mb-4">
              <h4 className="text-2xl md:text-3xl font-semibold">{cat.title}</h4>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-6 justify-center">
              {cat.items.map((tech) => (
                <div
                  data-cursor-lock
                  key={tech}
                  className="flex flex-col items-center bg-transparent p-3 rounded-lg hover:scale-105 transition-transform"
                >
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/90 dark:bg-gray-800 shadow-md">
                    <div className="text-black dark:text-white">
                      {icons[tech] ?? <Cpu className="w-8 h-8" />}
                    </div>
                  </div>

                  <div className="mt-3">
                    <span className="text-center text-sm md:text-base font-medium text-gray-700 dark:text-gray-200">
                      {tech}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}