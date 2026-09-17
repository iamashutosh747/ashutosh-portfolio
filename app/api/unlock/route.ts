import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { username } = await request.json()

  if (username?.trim().toLowerCase() === process.env.SITE_ACCESS_NAME?.toLowerCase()) {
    const response = NextResponse.json({ success: true })
    response.cookies.set('site_unlocked', 'true', {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })
    return response
  }

  return NextResponse.json({ success: false }, { status: 401 })
}