import axios from 'axios'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const regionCode = searchParams.get('regionCode')
    const type = searchParams.get('type')

    if (!regionCode || !type) {
        return NextResponse.json({ error: 'Missing regionCode or type' }, { status: 400 })
    }

    try {
        const { data } = await axios.get(
            `https://testservices.wschilexpress.com/georeference/api/v1/coverage-areas?RegionCode=${regionCode}&type=${type}`
        )
        console.log(data)
        return NextResponse.json({ data }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    // Parse the JSON body
    const { regionCode, destinationCounty, declaredWorth, deliveryTime } = await request.json()

    try {
        // Get coverage areas for the given region
        const coverageResponse = await axios.get(
            `https://testservices.wschilexpress.com/georeference/api/v1/coverage-areas?RegionCode=${regionCode.toString()}&type=0`
        )
        const deliveryZones = coverageResponse.data.coverageAreas

        // Find the county matching the destinationCounty name
        const county = deliveryZones.find((county: { coverageName: string, countyCode: string }) => county.coverageName === destinationCounty)

        if (!county || !county.countyCode) {
            return NextResponse.json({ error: 'Destination county not found.' }, { status: 400 })
        }

        const destinationCountyCode = county.countyCode

        // Request rating from the courier API using the destinationCountyCode
        const ratingResponse = await axios.post(
            'https://testservices.wschilexpress.com/rating/api/v1/rates/courier',
            {
                originCountyCode: 'STGO',
                destinationCountyCode,
                package: {
                    weight: "1",
                    height: "1",
                    width: "1",
                    length: "1"
                },
                productType: 3,
                contentType: 1,
                declaredWorth,
                deliveryTime
            },
            {
                headers: {
                    'Ocp-Apim-Subscription-Key': '33d0de3fff974729ae4c3f074bce476d'
                }
            }
        )
        console.log(ratingResponse.data)
        return NextResponse.json({ data: ratingResponse.data }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Internal error' }, { status: 500 })
    }
}