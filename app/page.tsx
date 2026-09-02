import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data: settings } = await supabase
    .from('site_settings')
    .select('*')
    .single()

  const { data: experiences } = await supabase
    .from('experiences')
    .select('*')
    .eq('published', true)
    .order('display_order', { ascending: true })

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
          {settings?.short_bio}
        </p>
      </section>

      <div className="my-16 h-px" style={{ backgroundColor: 'var(--color-line)' }} />

      {/* Experience */}
      <section>
        <h2 className="font-display text-2xl mb-8">Experience</h2>
        <div className="space-y-10">
          {experiences?.map((exp) => (
            <div key={exp.id} className="flex gap-6">
              <div className="w-28 shrink-0 text-sm opacity-60 pt-1">
                {new Date(exp.start_date).getFullYear()}
                {' – '}
                {exp.is_current ? 'Present' : new Date(exp.end_date).getFullYear()}
              </div>
              <div>
                <h3 className="font-medium text-base">{exp.job_title}</h3>
                <p className="text-sm opacity-70 mb-2">{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                <p className="text-sm leading-relaxed opacity-80">{exp.description}</p>
                {exp.technologies && (
                  <p className="text-xs mt-2 opacity-50">{exp.technologies}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="my-16 h-px" style={{ backgroundColor: 'var(--color-line)' }} />

      {/* Projects placeholder */}
      <section>
        <h2 className="font-display text-2xl mb-2">Projects</h2>
        <p className="opacity-70 text-sm">Coming soon — work and initiatives, with case studies.</p>
      </section>
    </main>
  )
}