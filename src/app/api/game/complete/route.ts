import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabaseServer } from "@/utils/supabase/server";


export async function POST() {
  const c = cookies()
  const gameId = (await c).get('game_id')?.value
  const token  = (await c).get('game_token')?.value
  if (!gameId || !token) return NextResponse.json({ error: 'No active game' }, { status: 400 })

  const supabase = supabaseServer()
  const { error } = await supabase
    .from('games')
    .update({ completed_at: new Date().toISOString() })
    .eq('id', gameId)
    .eq('access_token', token)

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  // optional: clear cookies after completion
  ;(await
		// optional: clear cookies after completion
		c).set('game_id', '', { path: '/', maxAge: 0 })
  ;(await c).set('game_token', '', { path: '/', maxAge: 0 })

  return NextResponse.json({ ok: true })
}
