import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import crypto from "node:crypto"
import { supabaseServer } from "@/lib/gameServer"

export async function POST() {
  const supabase = supabaseServer()
  const token = crypto.randomBytes(32).toString("hex")

  const { data, error } = await supabase
    .from("games")
    .insert({ access_token: token })
    .select("id")
    .single()

  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? "Failed to create game" }, { status: 400 })
  }

  // persist for same-browser sessions
  const c = cookies()
  ;(await c).set("game_id", data.id, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60*60*24 })
  ;(await c).set("game_token", token,   { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60*60*24 })

  // shareable URL (includes t=)
  const lobbyUrl = `/game/${data.id}?t=${token}`

  return NextResponse.json({ gameId: data.id, token, lobbyUrl })
}
