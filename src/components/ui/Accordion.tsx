import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * FAQ-Eintrag (echte Buttons → tastaturbedienbar). Die Antwort steht immer im
 * DOM und wird nur ein-/ausgeblendet: So deckt sich das FAQPage-Markup mit dem
 * sichtbaren Seiteninhalt, Screenreader finden über aria-controls ein Ziel und
 * die Seite bleibt ohne JavaScript vollständig lesbar.
 */
export function AccordionItem({ item, defaultOpen = false }: { item: FAQItem; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  return (
    <div className="bg-white rounded-2xl border border-line shadow-soft overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full flex justify-between items-center gap-6 p-6 text-left cursor-pointer hover:bg-paper/70 transition-colors"
      >
        <span className="font-headline font-bold text-lg text-navy">{item.question}</span>
        <span
          className={cn(
            'flex-shrink-0 w-9 h-9 rounded-full grid place-items-center transition-all duration-300',
            open ? 'bg-accent text-white rotate-45' : 'bg-paper text-brand'
          )}
          aria-hidden
        >
          <Plus size={18} />
        </span>
      </button>
      <div
        id={panelId}
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
        aria-hidden={!open}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-slate leading-relaxed">{item.answer}</p>
        </div>
      </div>
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
