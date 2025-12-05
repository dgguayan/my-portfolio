'use client';

import React from 'react';
import { SiReact, SiLaravel, SiPhp, SiMysql, SiFirebase, SiFigma } from 'react-icons/si';

type Exp = {
  id: string;
  position: string;
  company: string;
  duration: string;
  location: string;
  tech?: string[];
  image?: string;
  companyUrl?: string;
};

const EXPERIENCES: Exp[] = [
  {
    id: 'e1',
    image: '/images/companies/mm.png',
    companyUrl: 'https://www.linkedin.com/company/m-montesclaros-holdings-inc/',
    position: 'Full-stack Developer',
    company: 'M.Montesclaros Holdings Inc.',
    duration: 'Feb 2025 — May 2025',
    location: 'Philippines · On-Site',
    tech: ['Figma', 'Laravel', 'React', 'PHP', 'MySQL'],
  },
  {
    id: 'e2',
    image: '/images/companies/obx.png',
    companyUrl: 'https://obxsolution.com/',
    position: 'Associate Developer',
    company: "OBX Solutions Technology Inc.",
    duration: 'June 2025 — Present',
    location: 'Philippines · On-Site',
    tech: ['Figma', 'Laravel', 'React', 'PHP', 'MySQL'],
  },
  // adding more experience soon...
];

export default function Experience() {
  return (
    <section id="experience" className="py-16 px-6">
      <div className="container mx-auto">
        <h2 className="text-5xl md:text-7xl font-black mb-12 text-center uppercase">
          Experience
        </h2>

        <div className="space-y-12 max-w-5xl mx-auto">
          {EXPERIENCES.map((exp) => {
            const imgSrc = exp.image ?? `/images/companies/${exp.id}.png`;
            const imageContent = imgSrc ? (
              <img
                src={imgSrc}
                alt={exp.company}
                className="w-20 h-20 object-contain rounded"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <span className="text-sm font-semibold text-gray-200">
                {exp.company.split(' ').map(s => s[0]).slice(0,2).join('')}
              </span>
            );

            const rowContent = (
              <>
                {/* Logo / image column */}
                <div className="flex-shrink-0">
                  <div className="w-28 h-28 rounded-md bg-white/5 border-2 border-white/10 shadow-sm flex items-center justify-center">
                    {imageContent}
                  </div>
                </div>

                {/* Text column */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-1">{exp.position}</h3>

                  {/* company name */}
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
                          {t === 'Figma' && <SiFigma className="w-6 h-6" />}
                          {!( ['React', 'Laravel', 'PHP', 'MySQL', 'React Native', 'Firebase', 'Figma'].includes(t) ) && (<span className="text-xs">{t}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            );

            return exp.companyUrl ? (
              <a
                data-cursor-lock
                key={exp.id}
                href={exp.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={exp.company}
                className="flex items-start gap-8"
              >
                {rowContent}
              </a>
            ) : (
              <div data-cursor-lock key={exp.id} className="flex items-start gap-8">
                {rowContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}