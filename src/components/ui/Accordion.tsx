import { useId, useState } from 'react';
import { Plus, Minus } from 'lucide-react';
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
 *
 * Gestaltung: eine Liste mit Haarlinien statt einzelner Karten.
 */
export function AccordionItem({ item, defaultOpen = false }: { item: FAQItem; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  return (
    <div className="border-b border-line">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group w-full flex justify-between items-start gap-6 py-5 text-left cursor-pointer"
      >
        <span className="font-headline font-semibold text-lg text-navy group-hover:text-accent transition-colors">
          {item.question}
        </span>
        <span className="flex-shrink-0 mt-1 text-navy group-hover:text-accent transition-colors" aria-hidden>
          {open ? <Minus size={20} aria-hidden="true" /> : <Plus size={20} aria-hidden="true" />}
        </span>
      </button>
      <div
        id={panelId}
        className={cn(
          'grid transition-opacity duration-200 ease-out motion-reduce:transition-none',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
        aria-hidden={!open}
      >
        <div className="overflow-hidden">
          <p className="pb-6 pr-10 text-slate leading-relaxed max-w-3xl">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function Accordion({ items }: { items: FAQItem[] }) {
  return (
    <div className="border-t border-navy">
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
