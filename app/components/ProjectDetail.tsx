'use client';
import React, { useState, useMemo, useRef } from 'react';
import { SiReact, SiLaravel, SiPhp, SiMysql, SiFigma } from 'react-icons/si';

export default function ProjectDetail() {
  const techs = [
    { id: 'react', label: 'React', icon: <SiReact className="w-8 h-8" /> },
    { id: 'laravel', label: 'Laravel', icon: <SiLaravel className="w-8 h-8" /> },
    { id: 'php', label: 'PHP', icon: <SiPhp className="w-8 h-8" /> },
    { id: 'mysql', label: 'MySQL', icon: <SiMysql className="w-8 h-8" /> },
    { id: 'figma', label: 'Figma', icon: <SiFigma className="w-8 h-8" /> },
  ];

  const Projects = [
    {
      id: 'p1',
      image: '/images/projects/mmid_admin.png',
      title: 'M.Montesclaros Holdings ID Management System',
      tech: ['Figma', 'Laravel', 'PHP', 'React', 'MySQL'],
      summary: (
        <>
          <strong>Objective:</strong> 
          <span className="block text-justify">
            Centralize and streamline employee identification data management.
            The system simplifies the creation, updating, and monitoring of employee IDs, ensuring accuracy, efficiency, and ease of administration.
          </span>
          <strong>Key Features:</strong>
          <ul className="list-disc list-inside ml-4 text-justify">
            <li>Employee Data Storage: Securely stores all essential employee ID information in a centralized database.</li>
            <li>Dynamic ID Template Management: Allows administrators to upload custom ID templates and automatically map employee data to the correct fields. Supports future or updated templates without requiring system changes.</li>
            <li>ID Status Tracking: Monitors ID validity, alerts administrators when IDs are near expiration, and manages the renewal process.</li>
            <li>Employee Status Monitoring: Tracks employee employment status, including active, retired, and terminated employees.</li>
            <li>Automated Updates: Automatically reflects status changes and ensures ID-related actions align with current employment status.</li>
          </ul>
        </>
      ),
      role: 'Frontend & Backend Developer',
      duration: 'Jan 2024 — Apr 2024',
      repository: 'https://example.com/repo',
    },
    {
      id: 'p2',
      title: "D'PadFinder — Pad & Boarding Houses Finder",
      tech: ['Figma', 'React Native', 'Firebase'],
      summary: (
        <>
          A mobile app for students to locate pads and boarding houses with filters and maps.<br />
          Features include real-time listings, map integration, and advanced search filters for convenience.
        </>
      ),
      role: 'Mobile Developer / Designer',
      duration: 'May 2024 — Jul 2024',
      repository: 'https://example.com/repo2',
    },
    {
      id: 'p3',
      title: 'MKWD Online Management & Billing System',
      tech: ['Laravel', 'PHP', 'React', 'MySQL'],
      summary: (
        <>
          An online management and billing system for Metro Kidapawan Water District.<br />
          Enables efficient billing, customer management, and reporting for water utility operations.
        </>
      ),
      role: 'Full Stack Developer',
      duration: 'Aug 2023 — Dec 2023',
      repository: 'https://example.com/repo3',
    },
    // More projects coming soon
  ];

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const selectedProject = Projects[selectedIndex];

  const otherProjects = useMemo(() => Projects.filter((_, i) => i !== selectedIndex), [Projects, selectedIndex]);

  const initialExtra = Projects.length > 2 ? 0 : Math.min(2, otherProjects.length);
  const [visibleExtra, setVisibleExtra] = useState<number>(initialExtra);

  const showMore = () => setVisibleExtra((v) => Math.min(otherProjects.length, v + 2));

  const openProject = (projId: string) => {
    const idx = Projects.findIndex((p) => p.id === projId);
    if (idx !== -1) {
      setSelectedIndex(idx);
      const rem = Projects.length - 1;
      setVisibleExtra(Projects.length > 2 ? 0 : Math.min(2, rem));
      if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // swipeable tech scroller for desktop (mouse drag) and native swipe on touch
  function TechScroller({ items }: { items: string[] }) {
    const ref = useRef<HTMLDivElement | null>(null);
    const isDown = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const onMouseDown = (e: React.MouseEvent) => {
      if (!ref.current) return;
      isDown.current = true;
      ref.current.classList.add('cursor-grabbing');
      startX.current = e.pageX - ref.current.offsetLeft;
      scrollLeft.current = ref.current.scrollLeft;
      document.body.style.userSelect = 'none';
    };

    const onMouseMove = (e: React.MouseEvent) => {
      if (!isDown.current || !ref.current) return;
      e.preventDefault();
      const x = e.pageX - ref.current.offsetLeft;
      const walk = x - startX.current;
      ref.current.scrollLeft = scrollLeft.current - walk;
    };

    const stopDrag = () => {
      isDown.current = false;
      if (ref.current) {
        ref.current.classList.remove('cursor-grabbing');
      }
      document.body.style.userSelect = '';
    };

    return (
      <div className="relative">
        <div
          ref={ref}
          className="flex gap-6 pb-2 hide-scrollbar"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          style={{
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            paddingBottom: 8,
            cursor: 'grab',
          }}
          aria-label="Project technologies"
        >
          {items.map((label, i) => (
            <div
              key={label + i}
              className="w-20 flex-shrink-0 h-20 rounded-md bg-white/90 dark:bg-gray-800 flex items-center justify-center shadow-md"
              title={label}
            >
              <div className="text-black dark:text-white">
                {techs.find(t => t.label.toLowerCase() === String(label).toLowerCase())?.icon ?? <span className="text-xs">{label}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const RenderFullProject = ({ proj }: { proj: typeof Projects[number] }) => (
    <div>
      <h2 className="text-4xl font-black">{proj.title}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start pt-5 pb-20" key={proj.id}>
        <div className="lg:col-span-2">
            <div className="rounded-2xl overflow-hidden border-4 border-white/10 bg-white/5">
            {proj.image ? (
              <img
              src={proj.image}
              alt={proj.title}
              className="object-cover w-full h-96 md:h-[520px]"
              />
            ) : (
              <div className="bg-[repeating-linear-gradient(45deg,#eee,#eee_20px,#fff_20px,#fff_40px)] h-96 md:h-[520px] w-full" />
            )}
            </div>

          <div className="mt-5">
            <h4 className="text-lg font-semibold mb-4">Tech Used</h4>
            <div className="w-full">
              {/* use TechScroller which enables mouse-drag swiping on desktop */}
              <TechScroller items={proj.tech || []} />
            </div>
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-28">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h4 className="text-xl font-bold mb-3">Summary</h4>
              <div className="text-sm text-gray-300 leading-relaxed mb-4">{proj.summary}</div>

              <div className="space-y-3">
                <div>
                  <h5 className="text-sm font-semibold">My Role</h5>
                  <p className="text-sm text-gray-300">{proj.role}</p>
                </div>

                <div>
                  <h5 className="text-sm font-semibold">Duration</h5>
                  <p className="text-sm text-gray-300">{proj.duration}</p>
                </div>

                <div className="mt-3 flex gap-2">
                  <a href={proj.repository} target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 bg-black text-white rounded hover:opacity-90">View Repository</a>
                  <button onClick={() => openProject(proj.id)} className="px-4 py-2 border border-white/10 rounded">Open</button>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );

  const remaining = Math.max(0, otherProjects.length - visibleExtra);

  return (
    <section id="project-detail" className="py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-black mb-8 text-center tracking-tight uppercase">Project Details</h2>

        {/* main project */}
        <RenderFullProject proj={selectedProject} />

        {/* additional full-size project detail sections */}
        {otherProjects.slice(0, visibleExtra).map((p) => (
          <RenderFullProject proj={p} key={p.id} />
        ))}

        {remaining > 0 && (
          <div className="mt-6 text-center">
            <button
            
              onClick={showMore}
              className="px-6 py-2 bg-white text-black rounded-full font-semibold hover:opacity-90 transition"
            >
              Load more ({Math.min(2, remaining)} more)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}