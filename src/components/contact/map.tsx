
"use client";

import { useState, useMemo, useRef, useEffect } from 'react';
import maplibregl, { Map as MaplibreMap } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function Map() {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<MaplibreMap | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadError, setLoadError] = useState(false);

    const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY || "be9d6e4d5a2f48d5a49e1f6b1b5fdd53";
    const center: [number, number] = useMemo(() => [90.311, 23.903], []); // [lng, lat]

    useEffect(() => {
        if (map.current || !mapContainer.current || !apiKey) return;

        try {
            const mapStyle = `https://maps.geoapify.com/v1/styles/positron/style.json?apiKey=${apiKey}`;

            map.current = new maplibregl.Map({
                container: mapContainer.current,
                style: mapStyle,
                center: center,
                zoom: 15,
            });

            map.current.on('load', () => {
                setIsLoaded(true);
                new maplibregl.Marker({ color: "#1A854D" })
                    .setLngLat(center)
                    .addTo(map.current!);
            });

            map.current.on('error', (e) => {
                console.error("MapLibre error:", e);
                setLoadError(true);
                setIsLoaded(true); // To remove skeleton
            });

        } catch (e) {
            console.error("Failed to initialize map:", e);
            setLoadError(true);
            setIsLoaded(true); // To remove skeleton
        }

        return () => {
            map.current?.remove();
            map.current = null;
        };

    }, [apiKey, center]);


    if (!apiKey) {
        return (
            <Card>
                <CardContent className="h-[480px] w-full flex items-center justify-center p-6">
                   <div className="text-muted-foreground text-center space-y-4">
                    <p className="font-semibold text-lg">Map API Key is missing.</p>
                    <p>Please add `NEXT_PUBLIC_GEOAPIFY_API_KEY` to your environment variables to display the map.</p>
                   </div>
                </CardContent>
            </Card>
        );
    }

    if (loadError) {
        return (
            <Card>
                <CardContent className="h-[480px] w-full flex items-center justify-center p-6">
                   <div className="text-muted-foreground text-center space-y-4">
                    <p className="font-semibold text-lg">Map cannot be loaded.</p>
                    <p>There was an issue loading the map from Geoapify. Please check if your API key is correct and has the required permissions.</p>
                   </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="overflow-hidden">
            <div className="h-[480px] w-full relative">
                {!isLoaded && (
                    <Skeleton className="absolute inset-0 h-full w-full" />
                )}
                <div ref={mapContainer} className="h-full w-full" />
            </div>
        </Card>
    );
}
