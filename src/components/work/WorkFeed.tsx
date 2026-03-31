import React, { useState } from 'react';
import type { CollectionEntry } from 'astro:content';

interface Props {
  projects: CollectionEntry<'projects'>[];
}

export default function WorkFeed({ projects }: Props) {
  const [view, setView] = useState<'grid' | 'table'>('grid');

  return (
    <div className="w-full">
      
      {/* 1. THE CONTROLS (The Switch) */}
      <div className="flex justify-end mb-12 border-b border-muted/20 pb-4">
        <div className="flex gap-6 font-mono text-xs tracking-widest cursor-pointer select-none">
          <button 
            onClick={() => setView('grid')}
            className={`transition-colors duration-300 ${view === 'grid' ? 'text-accent' : 'text-muted hover:text-fg'}`}
          >
            [ VISUAL ]
          </button>
          <button 
            onClick={() => setView('table')}
            className={`transition-colors duration-300 ${view === 'table' ? 'text-accent' : 'text-muted hover:text-fg'}`}
          >
            [ INDEX ]
          </button>
        </div>
      </div>

      {/* 2. THE GRID VIEW (The Poetic) */}
      {view === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[var(--layout-gap)] gap-y-32 animate-in fade-in duration-500">
          {projects.map((project) => (
            <a 
              key={project.slug} 
              href={project.data.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block w-full cursor-none" // cursor-none because we use our Custom HUD
              data-cursor="VIEW CASE"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-bg-light mb-6">
                <img 
                  src={project.data.image} 
                  alt={project.data.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
              </div>
              <div className="flex flex-row-reverse justify-between items-baseline border-t border-muted/20 pt-4 text-right">
                <div className="flex flex-col items-end">
                  <span className="font-mono text-xs text-accent tracking-widest uppercase mb-1">
                    * {project.data.tag}
                  </span>
                  <h3 className="font-sys font-bold text-3xl text-fg group-hover:text-accent transition-colors duration-300">
                    {project.data.title}
                  </h3>
                </div>
                <span className="font-mono text-xs text-muted">
                  [{project.data.year}]
                </span>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* 3. THE TABLE VIEW (The Systematic) */}
      {view === 'table' && (
        <div className="w-full animate-in fade-in duration-500">
          {/* Table Header */}
          <div className="grid grid-cols-12 border-b border-muted text-muted font-mono text-xs uppercase tracking-widest pb-4 mb-4">
            <div className="col-span-1">ID</div>
            <div className="col-span-5">Project / Client</div>
            <div className="col-span-3 text-right">Service</div>
            <div className="col-span-2 text-right">Year</div>
            <div className="col-span-1 text-right">Link</div>
          </div>

          {/* Table Rows */}
          <div className="flex flex-col">
            {projects.map((project, index) => (
              <a 
                key={project.slug}
                href={project.data.link}
                target="_blank" 
                rel="noopener noreferrer"
                className="group grid grid-cols-12 py-6 border-b border-muted/20 hover:bg-white/5 transition-colors duration-200 cursor-none items-baseline"
                data-cursor="OPEN DATA"
              >
                <div className="col-span-1 font-mono text-xs text-muted">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
                <div className="col-span-5 font-sys text-xl font-bold text-fg group-hover:text-accent transition-colors">
                  {project.data.title}
                </div>
                <div className="col-span-3 text-right font-mono text-xs text-muted uppercase">
                  {project.data.tag}
                </div>
                <div className="col-span-2 text-right font-mono text-xs text-muted">
                  {project.data.year}
                </div>
                <div className="col-span-1 text-right font-mono text-xs text-accent">
                  ↗
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
