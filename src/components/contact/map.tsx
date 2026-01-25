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
                <CardContent className="h-[480px] w-full flex items-center justify-center p-6">
                   <div className="text-muted-foreground text-center space-y-4">
                    <p className="font-semibold text-lg">Map cannot be loaded.</p>
                    <p>The "ApiProjectMapError" suggests an issue with your Google Maps API setup. Please check the following in your Google Cloud Console:</p>
                    <ol className="text-left list-decimal list-inside space-y-2">
                        <li>The <strong>Maps JavaScript API</strong> is enabled for your project.</li>
                        <li>The API key has the correct <strong>Application restrictions</strong> (e.g., HTTP referrers) to work with this website's domain.</li>
                        <li>Your project has a valid <strong>billing account</strong> attached.</li>
                    </ol>
                    <p>Make sure the correct API key is in your <code>.env.local</code> file.</p>
                   </div>
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
