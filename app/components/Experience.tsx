'use client';

import React from 'react';
import { SiReact, SiLaravel, SiPhp, SiMysql, SiFirebase } from 'react-icons/si';

type Exp = {
  id: string;
  position: string;
  company: string;
  duration: string;
  location: string;
  tech?: string[];
};

const EXPERIENCES: Exp[] = [
  {
    id: 'e1',
    position: 'Frontend & Backend Developer',
    company: 'M.Montesclaros Holdings',
    duration: 'Jan 2024 — Apr 2024',
    location: 'Philippines · Remote',
    tech: ['Laravel', 'PHP', 'MySQL'],
  },
  {
    id: 'e2',
    position: 'Mobile Developer / Designer',
    company: "D'PadFinder",
    duration: 'May 2024 — Jul 2024',
    location: 'Philippines · Hybrid',
    tech: ['React Native', 'Firebase'],
  },
  // add more experiences as needed
];

export default function Experience() {
  return (
    <section id="experience" className="py-16 px-6">
      <div className="container mx-auto">
        <h2 className="text-5xl md:text-7xl font-black mb-12 text-center uppercase">
          Experience
        </h2>

        <div className="space-y-12 max-w-5xl mx-auto">
          {EXPERIENCES.map((exp, idx) => (
            <div data-cursor-lock key={exp.id} className="flex items-start gap-8">
              {/* Logo / image column */}
              <div className="flex-shrink-0">
                <div className="w-28 h-28 rounded-md bg-white/5 border-2 border-white/10 shadow-sm" />
                
              </div>

              {/* Text column */}
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-1">{exp.position}</h3>
                <div className="text-lg text-gray-200 mb-3">{exp.company}</div>

                <div className="text-sm text-gray-400 mb-4">
                  <div>{exp.duration}</div>
                  <div>{exp.location}</div>
                </div>

                {/* Tech badges / icons */}
                {exp.tech && (
                  <div className="flex gap-4 mt-2">
                    {exp.tech.map((t) => (
                      <div
                        key={t}
                        className="flex items-center justify-center w-16 h-16 rounded-md bg-white/5 border border-white/10 text-sm text-gray-200"
                        title={t}
                      >
                        {/* try to show a matching icon for common techs */}
                        {t === 'React' && <SiReact className="w-6 h-6" />}
                        {t === 'Laravel' && <SiLaravel className="w-6 h-6" />}
                        {t === 'PHP' && <SiPhp className="w-6 h-6" />}
                        {t === 'MySQL' && <SiMysql className="w-6 h-6" />}
                        {t === 'React Native' && <SiReact className="w-6 h-6" />}
                        {t === 'Firebase' && <SiFirebase className="w-6 h-6" />}
                        {!( ['React', 'Laravel', 'PHP', 'MySQL', 'React Native', 'Firebase'].includes(t) ) && (<span className="text-xs">{t}</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}