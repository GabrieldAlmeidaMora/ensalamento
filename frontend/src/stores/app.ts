// stores/app.ts
import { defineStore } from 'pinia'
import { supabase } from '@/plugins/supabase'
import router from '@/router'

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

      this.user = email
      this.token = `${email}${password}`

      router.push('/dashboard')
      this.loading = false
    },

    async loginWithGoogle () {
      this.error = ''
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
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

      router.push('/logout')
    },
  },

  persist: true,
})
