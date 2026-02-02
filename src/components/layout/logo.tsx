
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { LOGO_PATH, SITE_NAME_EN, withAssetVersion } from '@/lib/seo';

export function Logo({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('relative h-8 w-8', className)} {...props}>
      <Image
        src={withAssetVersion(LOGO_PATH)}
        alt={SITE_NAME_EN}
        fill
        sizes="48px"
        className="object-contain"
        priority
      />
    </div>
  );
}
