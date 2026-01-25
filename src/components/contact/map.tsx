import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Map() {
  const mapData = PlaceHolderImages.find((img) => img.id === 'map-location');

  if (!mapData) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          Map could not be loaded.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[16/6] w-full">
        <Image
          src={mapData.imageUrl}
          alt={mapData.description}
          data-ai-hint={mapData.imageHint}
          fill
          className="object-cover"
        />
      </div>
    </Card>
  );
}
