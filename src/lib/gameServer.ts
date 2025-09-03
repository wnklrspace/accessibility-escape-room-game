import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

export function supabaseServer() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
}

/** read token from cookie or ?t= query; if ?t= present, persist to cookie */
export async function readGameIdentity(gameId: string) {
  const c = cookies()
  const h = headers()
  const url = new URL((await h).get("x-url") ?? "http://localhost")
  const tokenFromQuery = url.searchParams.get("t")

  const cookieId = (await c).get("game_id")?.value
  const cookieToken = (await c).get("game_token")?.value

  const token = tokenFromQuery ?? cookieToken ?? null

  // persist when provided via URL
  if (tokenFromQuery) {
    (await c).set("game_id", gameId, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 })
    ;(await c).set("game_token", tokenFromQuery, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 })
  }

  return { token, cookieId }
}

export async function fetchGameOrRedirect(gameId: string) {
  const { token } = await readGameIdentity(gameId)
  if (!token) redirect("/") // no identity → back to welcome

  const supabase = supabaseServer()
  const { data, error } = await supabase
    .from("games")
    .select("id, page1, page2, page3, page4, page5, page6, completed_at")
    .eq("id", gameId)
    .eq("access_token", token)
    .single()

  if (error || !data) redirect("/") // invalid game/token
  return data
}

export function firstIncompletePage(g: {
  page1:boolean;page2:boolean;page3:boolean;page4:boolean;page5:boolean;page6:boolean
}) {
  const arr = [g.page1,g.page2,g.page3,g.page4,g.page5,g.page6]
  const idx = arr.findIndex(v => !v)
  return idx === -1 ? 7 : idx + 1
}
