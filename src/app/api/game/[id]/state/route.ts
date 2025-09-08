import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { supabaseServer } from "@/lib/gameServer"

export async function GET({ params }: { params: Promise<{ id: string }> }) {
  const c = cookies()
  const { id } = await params
  console.log("API: GET /api/game/[id]/state", id)
  const token = (await c).get("game_token")?.value
  if (!id || !token) return NextResponse.json({ game: null })

  const supabase = supabaseServer()
  const { data, error } = await supabase
    .from("games")
    .select("id, page1,page2,page3,page4,page5,page6,completed_at")
    .eq("id", id)
    .eq("access_token", token)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ game: data })
}
