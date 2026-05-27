import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createAdminClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Заполните все поля' }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      return NextResponse.json({ error: 'Неверный email или пароль' }, { status: 401 })
    }

    // Check role — use admin client to bypass RLS
    const adminClient = createAdminClient()
    const { data: profile } = await adminClient
      .from('users')
      .select('role, name, last_name')
      .eq('id', data.user.id)
      .single()

    const isAdmin = profile?.role === 'admin'

    return NextResponse.json({
      success: true,
      isAdmin,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: profile?.name || '',
        lastName: profile?.last_name || '',
        role: profile?.role || 'user',
      },
      accessToken: data.session.access_token,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}
