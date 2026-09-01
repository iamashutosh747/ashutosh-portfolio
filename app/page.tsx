import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data: settings } = await supabase
    .from('site_settings')
    .select('*')
    .single()

  return (
    <main className="max-w-2xl mx-auto px-6 py-24">
      {/* Hero */}
      <section>
        <h1 className="font-display text-5xl font-medium mb-3">
          {settings?.full_name}
        </h1>
        <p className="text-lg" style={{ color: 'var(--color-accent)' }}>
          {settings?.professional_title}
        </p>
        <p className="mt-6 text-base leading-relaxed opacity-80 max-w-lg">
          {settings?.short_bio || "Operations leader working toward FP&A — bringing process discipline and reporting rigor to financial planning."}
        </p>
      </section>

      {/* Divider */}
      <div
        className="my-16 h-px"
        style={{ backgroundColor: 'var(--color-line)' }}
      />

      {/* Section previews */}
      <section className="space-y-10">
        <div>
          <h2 className="font-display text-2xl mb-2">Experience</h2>
          <p className="opacity-70 text-sm">Coming soon — career timeline pulled from the database.</p>
        </div>
        <div>
          <h2 className="font-display text-2xl mb-2">Projects</h2>
          <p className="opacity-70 text-sm">Coming soon — work and initiatives, with case studies.</p>
        </div>
      </section>
    </main>
  )
}