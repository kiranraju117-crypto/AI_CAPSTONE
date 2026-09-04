import React from "react";
import { motion } from "framer-motion";
import { ArrowDownIcon, BoxIcon } from "lucide-react";
interface PipelineStepProps {
  index: number;
  title: string;
  description: string;
  icon: BoxIcon;
  isLast?: boolean;
}
export function PipelineStep({
  index,
  title,
  description,
  icon: Icon,
  isLast = false
}: PipelineStepProps) {
  return <li>
      <motion.div initial={{
      opacity: 0,
      y: 10
    }} whileInView={{
      opacity: 1,
      y: 0
    }} viewport={{
      once: true,
      margin: '-40px'
    }} transition={{
      duration: 0.26,
      delay: index * 0.04,
      ease: [0.23, 1, 0.32, 1]
    }} className="flex items-start gap-4 rounded-2xl border border-line bg-surface p-5 shadow-card transition-shadow duration-150 ease-out hover:shadow-lift">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[11px] font-semibold text-brand-500">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="text-[14px] font-semibold uppercase tracking-[0.04em] text-ink-900">
              {title}
            </h3>
          </div>
          <p className="mt-1.5 text-[13px] leading-6 text-ink-500">{description}</p>
        </div>
      </motion.div>

      {!isLast ? <div className="flex justify-center py-2" aria-hidden="true">
          <ArrowDownIcon className="h-4 w-4 text-ink-400" />
        </div> : null}
    </li>;
}