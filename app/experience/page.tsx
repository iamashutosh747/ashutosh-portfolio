import { supabase } from '@/lib/supabase'

export const metadata = {
  title: 'Experience — Ashutosh Sharma',
  description: 'Career history across operations, auditing, and financial reporting roles.',
}

export default async function ExperiencePage() {
  const { data: experiences } = await supabase
    .from('experiences')
    .select('*')
    .eq('published', true)
    .order('display_order', { ascending: true })

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="font-display text-3xl mb-10">Experience</h1>
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
    </main>
  )
}