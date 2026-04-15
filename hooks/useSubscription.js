"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useUser } from "./useUser"

export function useSubscription() {
  const { user } = useUser()
  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => {
        setSubscription(data)
        setLoading(false)
      })
  }, [user])

  return {
    subscription,
    loading,
    isPro: subscription?.status === "active",
  }
}
