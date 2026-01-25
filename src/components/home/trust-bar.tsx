"use client";

import { useLanguage } from '@/context/language-context';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function TrustBar() {
  const { t, lang } = useLanguage();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const textContent = t('trustBar.text');

  return (
    <div className="w-full bg-accent text-accent-foreground py-2 overflow-hidden">
      <div className="relative flex whitespace-nowrap">
        {isClient && (
          <div className="animate-marquee flex">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={cn("mx-8 text-sm font-semibold", lang === 'en' ? 'font-headline' : 'font-body')}>
                {textContent}
              </span>
            ))}
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          display: flex;
          width: 200%; /* Adjust based on content */
        }
      `}</style>
    </div>
  );
}
