import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    const { name, lastName, email, password, phone } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Заполните обязательные поля' }, { status: 400 })
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Пароль должен быть минимум 6 символов' }, { status: 400 })
    }

    const adminClient = createAdminClient()

    // Create auth user with admin (auto-confirms email)
    const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })

    if (authError) {
      if (authError.message.includes('already registered') || authError.message.includes('already exists')) {
        return NextResponse.json({ error: 'Пользователь с таким email уже существует' }, { status: 409 })
      }
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    // Save profile
    await adminClient.from('users').insert({
      id: authData.user.id,
      name,
      last_name: lastName || '',
      email,
      phone: phone || '',
      role: 'user',
    })

    // Auto sign-in after registration
    const anonClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data: sessionData, error: signInError } = await anonClient.auth.signInWithPassword({ email, password })

    if (signInError || !sessionData.session) {
      // Registration succeeded but auto-login failed — redirect to login
      return NextResponse.json({ success: true, autoLogin: false })
    }

    return NextResponse.json({
      success: true,
      autoLogin: true,
      isAdmin: false,
      user: { id: sessionData.user.id, email: sessionData.user.email, name, lastName: lastName || '', phone: phone || '' },
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}
