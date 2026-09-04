import React from 'react';
import { cn } from '../../utils/format';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article';
}

export function Card({ children, className, as: Tag = 'div' }: CardProps) {
  return (
    <Tag
      className={cn(
        'rounded-2xl border border-line bg-surface shadow-card',
        className
      )}>
      
      {children}
    </Tag>);

}

interface CardHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function CardHeader({ title, description, action, className }: CardHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-start justify-between gap-4 border-b border-line px-6 py-5',
        className
      )}>
      
      <div className="min-w-0">
        <h2 className="text-[15px] font-semibold text-ink-900">{title}</h2>
        {description ?
        <p className="mt-1 text-[13px] leading-5 text-ink-500">{description}</p> :
        null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>);

}