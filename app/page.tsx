import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data: settings } = await supabase
    .from('site_settings')
    .select('*')
    .single()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-2">{settings?.full_name}</h1>
      <p className="text-xl text-gray-500">{settings?.professional_title}</p>
    </main>
  )
}