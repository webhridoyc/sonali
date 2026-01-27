import { cn } from '@/lib/utils';

export function SiteLogoIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn(className)}
      {...props}
    >
      <circle cx="50" cy="50" r="50" fill="hsl(var(--primary))" />
      <text
        x="50%"
        y="50%"
        fontFamily="var(--font-poppins), sans-serif"
        fontSize="60"
        fontWeight="bold"
        fill="hsl(var(--accent))"
        dominantBaseline="central"
        textAnchor="middle"
      >
        S
      </text>
    </svg>
  );
}
