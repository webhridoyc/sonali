
import { cn } from '@/lib/utils';
import { SiteLogoIcon } from '@/components/icons/site-logo-icon';

export function Logo({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("relative h-8 w-8", className)} {...props}>
        <SiteLogoIcon className="h-full w-full" />
    </div>
  );
}
