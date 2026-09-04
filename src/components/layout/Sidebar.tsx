import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ActivityIcon,
  BarChart3Icon,
  CpuIcon,
  HistoryIcon,
  LayoutDashboardIcon,
  MailSearchIcon,
  SettingsIcon,
  ShieldCheckIcon,
  XIcon } from
'lucide-react';
import { cn } from '../../utils/format';

export const NAV_ITEMS = [
{ to: '/', label: 'Dashboard', icon: LayoutDashboardIcon, title: 'Email Security Dashboard' },
{ to: '/analyze', label: 'Analyze Email', icon: MailSearchIcon, title: 'Analyze Email' },
{ to: '/models', label: 'Model Performance', icon: BarChart3Icon, title: 'Model Performance' },
{ to: '/history', label: 'Detection History', icon: HistoryIcon, title: 'Detection History' },
{ to: '/how-it-works', label: 'How It Works', icon: CpuIcon, title: 'How Spam Detection Works' },
{ to: '/settings', label: 'Settings', icon: SettingsIcon, title: 'Settings' }];


interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {open ?
      <div
        className="fixed inset-0 z-30 bg-ink-900/30 lg:hidden"
        onClick={onClose}
        aria-hidden="true" /> :

      null}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-line bg-surface transition-transform duration-200 ease-out lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
        aria-label="Primary">
        
        <div className="flex items-center gap-2.5 px-5 py-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600">
            <ShieldCheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-semibold leading-tight text-ink-900">
              MailSentry
            </p>
            <p className="truncate text-[11px] text-ink-500">ML Spam Detection</p>
          </div>
          <button
            type="button"
            className="rounded-md p-1 text-ink-500 hover:bg-canvas lg:hidden"
            onClick={onClose}
            aria-label="Close navigation">
            
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-2 scroll-thin">
          {NAV_ITEMS.map((item) =>
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            onClick={onClose}
            className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors duration-150 ease-out',
              isActive ?
              'bg-brand-50 text-brand-700' :
              'text-ink-500 hover:bg-canvas hover:text-ink-900'
            )
            }>
            
              {({ isActive }) =>
            <>
                  <item.icon
                className={cn('h-4 w-4', isActive ? 'text-brand-600' : 'text-ink-400')}
                aria-hidden="true" />
              
                  {item.label}
                </>
            }
            </NavLink>
          )}
        </nav>

        <div className="border-t border-line p-3">
          <div className="flex items-center gap-2 rounded-lg bg-ham-50 px-3 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ham-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ham-500" />
            </span>
            <span className="text-[12px] font-semibold text-ham-700">ML Engine Online</span>
            <ActivityIcon className="ml-auto h-3.5 w-3.5 text-ham-600" aria-hidden="true" />
          </div>

          <div className="mt-3 flex items-center gap-3 rounded-lg px-2 py-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-[12px] font-semibold text-brand-700">
              AR
            </span>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-medium text-ink-900">Aarav Rao</p>
              <p className="truncate text-[11px] text-ink-500">Security Analyst</p>
            </div>
          </div>
        </div>
      </aside>
    </>);

}