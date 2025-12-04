'use client';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SiReact, SiLaravel, SiPhp, SiMysql, SiFigma, SiUnity } from 'react-icons/si';
import { PiFileCSharpFill } from 'react-icons/pi';

export default function ProjectDetail() {
  const techs = [
    { id: 'react', label: 'React', icon: <SiReact className="w-8 h-8" /> },
    { id: 'laravel', label: 'Laravel', icon: <SiLaravel className="w-8 h-8" /> },
    { id: 'php', label: 'PHP', icon: <SiPhp className="w-8 h-8" /> },
    { id: 'mysql', label: 'MySQL', icon: <SiMysql className="w-8 h-8" /> },
    { id: 'figma', label: 'Figma', icon: <SiFigma className="w-8 h-8" /> },
    { id: 'unity', label: 'Unity', icon: <SiUnity className="w-8 h-8" /> },
    { id: 'csharp', label: 'C#', icon: <PiFileCSharpFill className="w-8 h-8" /> },
  ];

  const Projects = [
    {
      id: 1,
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
      id: 2,
      image: '/images/projects/dpadfinder.png',
      title: "D'PadFinder — Pad & Boarding Houses Finder",
      tech: ['Figma'],
      summary: (
        <>
          <strong>Objective:</strong> 
          <span className="block text-justify">
            D'PadFinder aims to provide students with an accessible and affordable platform to search for nearby pad rentals, boarding houses, and dormitories. The goal is to simplify the housing search process for students by offering options that are budget-friendly and tailored to their academic lifestyles.
          </span>
          <strong>Key Features:</strong>
          <ul className="list-disc list-inside ml-4 text-justify">
            <li>Student-Focused Listings: Shows only student-friendly accomodations such as dorms, pads, and boarding houses with affordable pricing.</li>
            <li>Search & Filter System: Allows students to filter listings by price, distance from campus, amenities, and room type.</li>
            <li>Map Integration: Helps students located nearby accomodations quickly and visualize distance from their university.</li>
            <li>User Reviews & Ratings: Provides feedback from other students to help users make informed decisions.</li>
            <li>Landlord Portal: Allows property owners to post and manage their student-targeted listings.</li>
          </ul>
        </>
      ),
      role: 'Full-stack Developer',
      duration: 'May 2024 — Jul 2024',
      repository: 'https://example.com/repo2',
    },
    {
      id: 3,
      image: '/images/projects/mkwd_admin.png',
      title: 'MKWD Online Management & Billing System',
      tech: ['Figma','Laravel', 'PHP', 'React', 'MySQL'],
      summary: (
        <>
          <strong>Objective:</strong> 
          <span className="block text-justify">
            The objective of the MKWD Online Management & Billing System is to streamline and centralize the management of consumers, employees, billing, and service operations. The system aims to enhance efficiency, accuracy, and transparency across all workflows within the water district.
          </span>
          <strong>Key Features:</strong>
          <ul className="list-disc list-inside ml-4 text-justify">
            <li>User & Consumer Management: Handles the creation of consumers and employee roles such as plumbers, inspectors, meter readers, tellers, and admins.</li>
            <li>Dashboard Monitoring: Tracks total consumers, unbilled accounts, monthly revenue, unpaid bills, service requests, and scheduled meter readings.</li>
            <li>Billing & History Tracking: Stores complete billing histories and manages the end-to-end process from consumer registration to billing and payment.</li>
            <li>Service Request Handling: Monitors consumer requests and supports workflow assignments for inspections, repairs, and meter-related tasks.</li>
          </ul>
        </>
      ),
      role: 'Full-Stack Developer',
      duration: 'Aug 2023 — Dec 2023',
      repository: 'https://example.com/repo3',
    },
    {
      id: 4,
      image: '/images/projects/cmuwais.PNG',
      title: 'CMU-WAIS | Wayfinding Interactive System',
      tech: ['Figma', 'C#', 'Unity', 'MagicaVoxel'],
      summary: (
        <>
          <strong>Objective:</strong> 
          <span className="block text-justify">
            The CMU Wayfinding Interactive System (CMU-WAIS) is designed to assist students, faculty, and visitors in navigating the Central Mindanao University campus. By providing an interactive 2.5D / Isometric map and navigation tools, the system aims to enhance user experience and reduce the time spent searching for locations on campus.
          </span>
          <strong>Key Features:</strong>
          <ul className="list-disc list-inside ml-4 text-justify">
            <li>3D Campus Map: Offers a detailed and interactive 3D representation of the CMU campus, including buildings, landmarks, and pathways.</li>
            <li>Search Functionality: Allows users to search for specific buildings, departments, or facilities within the campus.</li>
            <li>Navigation Assistance: Provides step-by-step directions and visual cues to guide users to their desired locations.</li>
          </ul>
        </>
      ),
      role: 'Front-End and Back-End Developer',
      duration: 'Jan 2024 — Apr 2024',
      repository: 'https://example.com/repo4',
    }
    // More projects coming soon
  ];

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const selectedProject = Projects[selectedIndex];

  const otherProjects = useMemo(() => Projects.filter((_, i) => i !== selectedIndex), [Projects, selectedIndex]);

  const initialExtra = Projects.length > 2 ? 0 : Math.min(2, otherProjects.length);
  const [visibleExtra, setVisibleExtra] = useState<number>(initialExtra);

  const showMore = () => setVisibleExtra((v) => Math.min(otherProjects.length, v + 2));

  const openProject = (projId: string | number) => {
    const idx = Projects.findIndex((p) => p.id === projId);
    if (idx !== -1) {
      setSelectedIndex(idx);
      const rem = Projects.length - 1;
      setVisibleExtra(Projects.length > 2 ? 0 : Math.min(2, rem));
      if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // read search params via Next's client hook so the component reacts to client-side navigation
  const searchParams = useSearchParams();

  // respond whenever the search params change (client navigation)
  useEffect(() => {
    try {
      const pid = searchParams?.get('project');
      if (!pid) return;

      // support forms: "p3" or "3" (normalize candidates)
      const normalizedCandidates = [pid];
      if (/^\d+$/.test(pid)) normalizedCandidates.push(`p${pid}`);
      if (/^p\d+$/.test(pid)) normalizedCandidates.push(pid.replace(/^p/, ''));

      const idx = Projects.findIndex((p) =>
        normalizedCandidates.some((cand) => String(p.id) === cand)
      );

      if (idx !== -1) {
        setSelectedIndex(idx);
        // scroll to detail section if hash present
        if (typeof window !== 'undefined' && window.location.hash === '#project-detail') {
          const el = document.getElementById('project-detail');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } catch (e) {
      // ignore
    }
  }, [searchParams?.toString()]);

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