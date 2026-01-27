import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("relative h-8 w-8", className)} {...props}>
        <Image
            src="/logo.png"
            alt="Sonali Shokal Somobay Somity Logo"
            fill
            sizes="40px"
            className="object-contain"
            priority
        />
    </div>
  );
}
