import { Dispatch, SetStateAction, useEffect, useState, type ReactNode } from 'react'
import { AdvancedMarker, Map, MapCameraChangedEvent } from '@vis.gl/react-google-maps'

interface GoogleMapsProps {
    locationInputValue: google.maps.places.PlaceResult | null
    setLocationInputValue: Dispatch<SetStateAction<google.maps.places.PlaceResult | null>>
    setStep: Dispatch<SetStateAction<{ one: boolean, two: boolean }>>
}

const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID

function GoogleMaps({ locationInputValue }: GoogleMapsProps): ReactNode {

    //* Google maps state
    const [zoom, setZoom] = useState<number>(13)
    const [geocodeResult, setGeocodeResult] = useState<{ lat: number, lng: number } | null>(null)

    const handleCameraChanged = (ev: MapCameraChangedEvent) => {
        setZoom(ev.detail.zoom)
    }

    useEffect(() => {
        if (locationInputValue !== null && locationInputValue.geometry !== undefined && locationInputValue.geometry.location !== undefined) {
            const newGeoLocation = {
                lat: locationInputValue.geometry.location.lat(),
                lng: locationInputValue.geometry.location.lng()
            }
            console.log(newGeoLocation)
            setGeocodeResult(newGeoLocation)
            setZoom(18)
        }
    }, [locationInputValue])

    return (
        <main>
            <div className="flex flex-col h-[450px]">
                <Map
                    zoom={zoom}
                    mapId={mapId}
                    defaultZoom={13}
                    center={geocodeResult}
                    defaultCenter={{ lat: geocodeResult?.lat || -33.44888970000001, lng: geocodeResult?.lng || 289.3307345 }}
                    onCameraChanged={handleCameraChanged}>
                    {geocodeResult && <AdvancedMarker position={geocodeResult} />}
                </Map>
            </div>

        </main>

    )
}

export default GoogleMaps
