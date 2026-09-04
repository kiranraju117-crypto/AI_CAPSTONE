import React from 'react';
import { BellIcon, MenuIcon, SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

interface HeaderProps {
  title: string;
  onOpenNav: () => void;
}

export function Header({ title, onOpenNav }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-surface/85 px-4 backdrop-blur md:px-8">
      <button
        type="button"
        className="rounded-lg p-2 text-ink-500 hover:bg-canvas lg:hidden"
        onClick={onOpenNav}
        aria-label="Open navigation">
        
        <MenuIcon className="h-5 w-5" />
      </button>

      <h1 className="truncate text-[15px] font-semibold text-ink-900">{title}</h1>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden md:block">
          <SearchIcon
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
            aria-hidden="true" />
          
          <input
            type="search"
            placeholder="Search analyses..."
            aria-label="Search analyses"
            onKeyDown={(event) => {
              if (event.key === 'Enter') navigate('/history');
            }}
            className="h-9 w-56 rounded-lg border border-line bg-canvas pl-9 pr-3 text-[13px] text-ink-900 placeholder:text-ink-400 focus:border-brand-400 focus:bg-surface focus:outline-none xl:w-72" />
          
        </div>

        <Button
          size="sm"
          variant="secondary"
          className="hidden sm:inline-flex"
          onClick={() => navigate('/analyze')}>
          
          Analyze
        </Button>

        <button
          type="button"
          className="relative rounded-lg p-2 text-ink-500 transition-colors duration-150 ease-out hover:bg-canvas hover:text-ink-900"
          aria-label="Notifications">
          
          <BellIcon className="h-[18px] w-[18px]" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-spam-500" />
        </button>

        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-[12px] font-semibold text-brand-700">
          AR
        </span>
      </div>
    </header>);

}