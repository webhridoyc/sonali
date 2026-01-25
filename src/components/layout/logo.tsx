import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("relative", className)} {...props}>
        <Image
            src="/logo.png"
            alt="Sonali Shokal Somobay Somity Logo"
            fill
            className="object-contain dark:invert-0 invert"
            priority
        />
    </div>
  );
}
