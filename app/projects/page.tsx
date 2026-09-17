import { supabase } from '@/lib/supabase'

export const metadata = {
  title: 'Projects — Ashutosh Sharma',
  description: 'Process, reporting, and finance-focused projects and initiatives.',
}

export default async function ProjectsPage() {
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

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="font-display text-3xl mb-10">Projects</h1>
      <div className="space-y-10">
        {projects?.map((proj) => (
          <div key={proj.id}>
            {proj.cover_image_url && (
              <img
                src={proj.cover_image_url}
                alt={proj.name}
                className="w-full rounded mb-3 object-cover"
                style={{ maxHeight: '280px' }}
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
    </main>
  )
}