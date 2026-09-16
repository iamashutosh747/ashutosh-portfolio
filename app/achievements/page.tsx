import { supabase } from '@/lib/supabase'

export default async function AchievementsPage() {
  const { data: achievements } = await supabase
    .from('achievements')
    .select('*')
    .eq('published', true)
    .order('display_order', { ascending: true })

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="font-display text-3xl mb-10">Achievements</h1>
      <div className="space-y-8">
        {achievements?.map((ach) => (
          <div key={ach.id}>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="font-medium text-base">{ach.title}</h3>
              {ach.date && (
                <span className="text-xs opacity-50">{new Date(ach.date).getFullYear()}</span>
              )}
            </div>
            {ach.organization && (
              <p className="text-sm opacity-70 mb-1">{ach.organization}</p>
            )}
            {ach.description && (
              <p className="text-sm leading-relaxed opacity-80">{ach.description}</p>
            )}
            {ach.link_url && (
              <a
                href={ach.link_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs mt-1 inline-block"
                style={{ color: 'var(--color-accent)' }}
              >
                View →
              </a>
            )}
          </div>
        ))}
      </div>
    </main >
  )
}