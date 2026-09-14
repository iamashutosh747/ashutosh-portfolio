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

  const { data: skills } = await supabase
    .from('skills')
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

      <section>
  <div className="flex items-center justify-between mb-2">
    <h2 className="font-display text-2xl">Projects</h2>
    <a href="/projects" className="text-sm" style={{ color: 'var(--color-accent)' }}>
      View all →
    </a>
  </div>
  <p className="text-sm opacity-70">
    A collection of process, reporting, and finance-focused work — click through to see all of them.
  </p>
</section>

      {/* Skills */}
      <section>
        <h2 className="font-display text-2xl mb-6">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills?.map((skill) => (
            <span
              key={skill.id}
              className="text-sm px-3 py-1 rounded-full border"
              style={{ borderColor: 'var(--color-line)' }}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </section>

      <div className="my-16 h-px" style={{ backgroundColor: 'var(--color-line)' }} />

      {/* Footer */}
      <footer className="flex items-center justify-between text-sm">
        <span className="opacity-60">{settings?.location}</span>
        <div className="flex gap-5">
          {settings?.email && (
            <a href={`mailto:${settings.email}`} style={{ color: 'var(--color-accent)' }}>
              Email
            </a>
          )}
          {settings?.linkedin_url && (
            <a
              href={settings.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--color-accent)' }}
            >
              LinkedIn
            </a>
          )}
          {settings?.github_url && (
            <a
              href={settings.github_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--color-accent)' }}
            >
              GitHub
            </a>
          )}
        </div>
      </footer>
    </main>
  )
}