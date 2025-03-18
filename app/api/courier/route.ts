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
            `http://testservices.wschilexpress.com/georeference/api/v1/coverage-areas?RegionCode=${regionCode}&type=${type}`
        )
        console.log(data)
        return NextResponse.json({ data }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}