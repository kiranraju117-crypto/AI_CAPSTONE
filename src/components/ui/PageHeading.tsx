import React from 'react';

interface PageHeadingProps {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}

export function PageHeading({ title, subtitle, action }: PageHeadingProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-[24px] font-bold leading-tight tracking-tight text-ink-900 md:text-[28px]">
          {title}
        </h2>
        <p className="mt-1.5 text-[13.5px] text-ink-500">{subtitle}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>);

}