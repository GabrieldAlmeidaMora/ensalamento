// stores/app.ts
import { defineStore } from 'pinia'
import { supabase } from '@/plugins/supabase'

export const useAppStore = defineStore('app', {
  state: () => ({
    user: null as any | null,
    token: '' as string,
    loading: false,
    error: '' as string,
  }),

  actions: {
    async loginWithEmail (email: string, password: string) {
      this.loading = true
      this.error = ''

      const { data, error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        this.error = error.message
      } else {
        this.user = data.user
        this.token = data.session?.access_token || ''
      }

      this.loading = false
    },

    async loginWithGoogle () {
      this.error = ''
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      })

      if (error) {
        this.error = error.message
      }
    },

    async fetchUser () {
      const { data } = await supabase.auth.getUser()
      this.user = data.user ?? null
    },

    async logout () {
      await supabase.auth.signOut()
      this.user = null
      this.token = ''
    },
  },

  persist: true,
})
