import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FAQItem {
  question: string;
  answer: string;
}

/** Animierter FAQ-Eintrag (echte Buttons → tastaturbedienbar). */
export function AccordionItem({ item, defaultOpen = false }: { item: FAQItem; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-2xl border border-line shadow-soft overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex justify-between items-center gap-6 p-6 text-left cursor-pointer hover:bg-paper/70 transition-colors"
      >
        <span className="font-headline font-bold text-lg text-navy">{item.question}</span>
        <span
          className={cn(
            'flex-shrink-0 w-9 h-9 rounded-full grid place-items-center transition-all duration-300',
            open ? 'bg-accent text-white rotate-45' : 'bg-paper text-brand'
          )}
        >
          <Plus size={18} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.2, 0.65, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-slate leading-relaxed">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Accordion({ items }: { items: FAQItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <AccordionItem key={i} item={item} defaultOpen={i === 0} />
      ))}
    </div>
  );
}

/** Erzeugt das schema.org-FAQPage-Markup aus denselben Daten. */
export function faqSchemaFrom(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}
