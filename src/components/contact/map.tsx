"use client";

import { useMemo } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/context/language-context';

export function Map() {
    const { t } = useLanguage();
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        libraries: ['places'],
    });

    const center = useMemo(() => ({ lat: 23.903, lng: 90.311 }), []);

    if (loadError) {
        return (
            <Card>
                <CardContent className="h-[480px] w-full flex items-center justify-center p-4">
                   <p className="text-muted-foreground text-center">Map cannot be loaded. <br /> Please ensure you have a valid Google Maps API key set as NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment variables.</p>
                </CardContent>
            </Card>
        );
    }

    if (!isLoaded) {
        return (
            <Card className="overflow-hidden">
                 <Skeleton className="h-[480px] w-full" />
            </Card>
        );
    }

    return (
        <Card className="overflow-hidden">
            <div className="h-[480px] w-full">
                <GoogleMap
                    mapContainerClassName="w-full h-full"
                    center={center}
                    zoom={15}
                    options={{
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }}
                >
                    <MarkerF 
                        position={center} 
                        title={t('footer.address')} 
                    />
                </GoogleMap>
            </div>
        </Card>
    );
}
