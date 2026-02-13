import React from 'react';

export const SectionHeader = ({ title, count }: { title: string, count: number }) => (
  <div className="flex items-end gap-4 mb-4 mt-6">
    <h3 className="font-serif text-lg font-bold text-primary-dark tracking-wide uppercase border-b-2 border-gold pb-1 leading-none">
      {title}
    </h3>
    <span className="text-xs text-gray-500 font-medium mb-1.5">{count} spots</span>
  </div>
);