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

  const { data: projects } = await supabase
    .from('projects')
    .select(`
      *,
      project_technologies (
        technologies ( name )
      )
    `)
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

      {/* Projects */}
      <section>
        <h2 className="font-display text-2xl mb-8">Projects</h2>
        <div className="space-y-8">
          {projects?.map((proj) => (
            <div key={proj.id}>
              {proj.cover_image_url && (
                <img
                  src={proj.cover_image_url}
                  alt={proj.name}
                  className="w-full rounded mb-3 object-cover"
                  style={{ maxHeight: '240px' }}
                />
              )}
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-medium text-base">{proj.name}</h3>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: 'var(--color-line)',
                    color: 'var(--color-accent)',
                  }}
                >
                  {proj.status}
                </span>
              </div>
              <p className="text-sm leading-relaxed opacity-80">{proj.short_description}</p>
              {proj.project_technologies?.length > 0 && (
                <p className="text-xs mt-2 opacity-50">
                  {proj.project_technologies.map((pt: any) => pt.technologies.name).join(', ')}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="my-16 h-px" style={{ backgroundColor: 'var(--color-line)' }} />

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
    </main>
  )
}