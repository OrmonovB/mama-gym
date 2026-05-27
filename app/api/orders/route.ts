import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

// GET — list all orders (admin only)
export async function GET(req: NextRequest) {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// POST — create new order
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, last_name, phone, email, product, size, competition_date, comment } = body

    if (!name || !phone || !product) {
      return NextResponse.json({ error: 'Заполните обязательные поля' }, { status: 400 })
    }

    const supabase = createAdminClient()
    const { data, error } = await supabase.from('orders').insert({
      name,
      last_name: last_name || '',
      phone,
      email: email || '',
      product,
      size: size || '',
      competition_date: competition_date || null,
      comment: comment || '',
      status: 'new',
    }).select().single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true, order: data })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}
