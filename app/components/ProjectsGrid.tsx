'use client';
import { useMemo, useState, useEffect } from 'react';
import Filter from './Filter';

export default function ProjectsGrid() {
	const projects = [
		{
			id: 1,
			title: "M.Montesclaros Holdings ID Management System",
			description: "Description",
			tech: "Figma, Laravel, PHP, React, MySQL",
			image: '/images/projects/mmid_admin.png',
		},
		{
			id: 2,
			title: "(Prototype) D'PadFinder | Pad and Boarding Houses Finder for Students.",
			description: "Description",
			tech: "Figma",
			image: '/images/projects/dpadfinder.png',
		},
		{
			id: 3,
			title: "MKWD | Metro Kidapawan Water District Online Management and Billing System",
			description: "Description",
			tech: "Figma, Laravel, React, PHP, MySQL",
			image: '/images/projects/mkwd_admin.png',
		},
		{
			id: 4,
			title: "CMU-WAIS | Central Mindanao University Wayfinding Interactive System",
			description: "Description",
			tech: "Figma, C#, Unity, MagicaVoxel",
			image: '/images/projects/cmuwais.PNG',
		},
		{
			id: 5,
			title: "(Prototype) CMU FOODE | Central Mindanao University Food Ordering and Delivery System",
			description: "Description",
			tech: "Figma",
		},
		// Adding more projects soon
	];

	// derive unique tech filters from projects (split by comma)
	const derivedFilters = useMemo(() => {
		const set = new Set<string>();
		for (const p of projects) {
			if (!p.tech) continue;
			p.tech.split(',').map(s => s.trim()).forEach(x => {
				if (x) set.add(x);
			});
		}
		// ensure a stable order: All first, then alphabetic
		const techs = Array.from(set).sort((a, b) => a.localeCompare(b));
		return ['All', ...techs];
	}, [projects]);

	// selected filter
	const [selectedFilter, setSelectedFilter] = useState<string>('All');

	// filtered projects based on selected filter
	const filteredProjects = useMemo(() => {
		if (!selectedFilter || selectedFilter === 'All') return projects;
		const needle = selectedFilter.toLowerCase();
		return projects.filter(p => (p.tech || '').toLowerCase().split(',').map(s => s.trim()).includes(needle));
	}, [projects, selectedFilter]);

	// pagination over filteredProjects
	const pages = useMemo(() => {
		const size = 6;
		const out: typeof projects[] = [];
		for (let i = 0; i < filteredProjects.length; i += size) {
			out.push(filteredProjects.slice(i, i + size));
		}
		return out;
	}, [filteredProjects]);

	const [pageIndex, setPageIndex] = useState(0);
	const pageCount = Math.max(1, pages.length);

	useEffect(() => {
		// reset to first page when filter changes so user sees results from beginning
		setPageIndex(0);
	}, [selectedFilter, filteredProjects.length]);

	const prev = () => setPageIndex((p) => (p - 1 + pageCount) % pageCount);
	const next = () => setPageIndex((p) => (p + 1) % pageCount);
	const goTo = (i: number) => setPageIndex(i);

	return (
		<section id="projects" className="py-8">
			<div className="container mx-auto relative">
				{/* dynamic filter */}
				<Filter filters={derivedFilters} onFilterSelect={setSelectedFilter} active={selectedFilter} />

				{/* carousel viewport */}
				<div className="overflow-hidden">
					{/* sliding track */}
					<div
						className="flex transition-transform duration-500 ease-in-out"
						style={{ width: `${pageCount * 100}%`, transform: `translateX(-${(pageIndex * 100) / pageCount}%)` }}
					>
						{pages.map((page, idx) => (
							<div key={idx} className="w-full px-1" style={{ width: `${100 / pageCount}%` }}>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
									{page.map((project) => (
										<div
											data-cursor-lock
											key={project.id}
											className="relative bg-white rounded-2xl border-4 border-white overflow-hidden shadow-lg"
										>
											{/* image / visual area */}
											<div className="bg-gray-100 h-56 md:h-64 lg:h-72 overflow-hidden">
												{project.image ? (
													<img
														src={project.image}
														alt={project.title}
														className="w-full h-full object-cover"
														loading="lazy"
													/>
												) : (
													<div className="w-full h-full bg-[repeating-linear-gradient(45deg,#eee,#eee_20px,#fff_20px,#fff_40px)]" />
												)}
											</div>

											{/* bottom panel with title, divider and tech list */}
											<div className="bg-black text-white px-6 py-5">
												<h4 className="text-center text-lg md:text-xl font-bold leading-tight">
													{project.title.length > 70 ? project.title.slice(0, 70) + '...' : project.title}
												</h4>

												<div className="my-3">
													<hr className="border-t border-white/40" />
												</div>

												<p className="text-sm text-white/90 truncate">{project.tech}</p>
											</div>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* controls */}
				{pageCount > 1 && (
					<>
						<button
							onClick={prev}
							aria-label="Previous projects"
							className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/70 p-2 rounded-full shadow hover:scale-105 transition-transform ml-2"
						>
							‹
						</button>

						<button
							onClick={next}
							aria-label="Next projects"
							className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/70 p-2 rounded-full shadow hover:scale-105 transition-transform mr-2"
						>
							›
						</button>

						{/* pagination dots */}
						<div className="flex justify-center gap-2 mt-4">
							{Array.from({ length: pageCount }).map((_, i) => (
								<button
									key={i}
									onClick={() => goTo(i)}
									aria-label={`Go to page ${i + 1}`}
									className={`w-3 h-3 rounded-full transition-colors ${i === pageIndex ? 'bg-black dark:bg-white' : 'bg-gray-300 dark:bg-gray-600'}`}
								/>
							))}
						</div>
					</>
				)}
			</div>
		</section>
	);
}