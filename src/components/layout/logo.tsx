import { cn } from '@/lib/utils';

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-primary", className)}
      {...props}
    >
      <path d="M7.5 16.5c-2.5-1.5-3-5.5-3-5.5s1.5-4 4-4c2.5 0 4.5 2 4.5 2" />
      <path d="M16.5 16.5c2.5-1.5 3-5.5 3-5.5s-1.5-4-4-4c-2.5 0-4.5 2-4.5 2" />
      <path d="M12 11c0 0-2-3-4-3" />
      <path d="M12 11c0 0 2-3 4-3" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="m2 12 h2" />
      <path d="m20 12 h2" />
      <path d="m4.93 19.07 1.41-1.41" />
      <path d="m17.66 6.34 1.41-1.41" />
    </svg>
  );
}
