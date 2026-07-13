import { Fragment } from 'react';

interface HeadlineTextProps {
  text: string;
}

/**
 * Hält kurze Bindestrich-Komposita in Display-Überschriften zusammen.
 * Lange deutsche Wörter werden über die Headline-CSS grundsätzlich nur an
 * echten Wortgrenzen umbrochen; vorhandene Bindestriche sollen dabei nicht zu
 * optisch losgelösten Wortteilen führen.
 */
export default function HeadlineText({ text }: HeadlineTextProps) {
  const parts = text.split(/(\s+)/);
  const output = [];

  for (let index = 0; index < parts.length; index += 1) {
    const part = parts[index];
    if (!part) continue;

    const nextSpace = parts[index + 1];
    const nextWord = parts[index + 2];
    const isSuspendedCompound =
      part.endsWith('-') && /^\s+$/.test(nextSpace ?? '') && /^(und|oder)$/i.test(nextWord ?? '');

    if (isSuspendedCompound) {
      output.push(
        <span key={`${index}-${part}`} className="whitespace-nowrap">
          {part}
          {nextSpace}
          {nextWord}
        </span>,
      );
      index += 2;
      continue;
    }

    if (part.includes('-') && part !== '-') {
      output.push(
        <span key={`${index}-${part}`} className="whitespace-nowrap">
          {part}
        </span>,
      );
      continue;
    }

    output.push(<Fragment key={`${index}-${part}`}>{part}</Fragment>);
  }

  return <>{output}</>;
}
