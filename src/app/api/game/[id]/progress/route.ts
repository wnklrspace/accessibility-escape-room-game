import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { supabaseServer } from "@/lib/gameServer"

export async function POST(req: Request) {
  const { page, gameId } = await req.json() as { page:number; gameId:string }
  if (!gameId || !(page>=1 && page<=6)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }

  const c = cookies()
  const token = (await c).get("game_token")?.value
  if (!token) return NextResponse.json({ error: "No auth" }, { status: 401 })

  const supabase = supabaseServer()
  const col = `page${page}` as const

  const { error } = await supabase
    .from("games")
    .update({ [col]: true as any })
    .eq("id", gameId)
    .eq("access_token", token)

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ ok: true })
}
