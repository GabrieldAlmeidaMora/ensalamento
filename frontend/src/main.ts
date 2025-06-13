/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

import { supabase } from './plugins/supabase'
import router from './router'
import { useAppStore } from './stores/app'
// Styles
import 'unfonts.css'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')

const appStore = useAppStore()

// Recupera sessão atual (caso já esteja logado)
supabase.auth.getSession().then(({ data: { session } }) => {
  if (session) {
    appStore.user = session.user
    appStore.token = session.access_token

    if (router.currentRoute.value.path === '/login') {
      router.push('/dashboard')
    }
  }
})

// Escuta login/logout em tempo real
supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    appStore.user = session.user
    appStore.token = session.access_token
  } else {
    appStore.user = null
    appStore.token = ''
  }
})
