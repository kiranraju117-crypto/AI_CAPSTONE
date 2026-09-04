import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NAV_ITEMS, Sidebar } from './Sidebar';
import { Header } from './Header';

export function AppLayout() {
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();
  const active = NAV_ITEMS.find((item) =>
  item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to)
  );

  return (
    <div className="min-h-full w-full bg-canvas font-sans">
      <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />
      <div className="lg:pl-64">
        <Header title={active?.title ?? 'MailSentry'} onOpenNav={() => setNavOpen(true)} />
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="mx-auto w-full max-w-[1400px] px-4 py-6 md:px-8 md:py-8">
          
          <Outlet />
        </motion.main>
      </div>
    </div>);

}