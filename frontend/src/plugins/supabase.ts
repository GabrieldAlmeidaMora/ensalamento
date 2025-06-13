// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ilsbkwiwbgptaclbwtly.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlsc2Jrd2l3YmdwdGFjbGJ3dGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5OTQxODcsImV4cCI6MjA2NDU3MDE4N30.mh9ZEByHV_ezEzNC3gL1AuDdAfDgdQDQ3LxLFLSLE7I'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
