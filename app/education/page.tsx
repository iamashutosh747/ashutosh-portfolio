import { supabase } from '@/lib/supabase'

export const metadata = {
  title: 'Education — Ashutosh Sharma',
  description: 'Academic background and qualifications.',
}

export default async function EducationPage() {
const { data: education } = await supabase
  .from('education')
  .select('*')
  .eq('published', true)
  .order('display_order', { ascending: true })

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="font-display text-3xl mb-10">Education</h1>
      <div className="space-y-8">
        {education?.map((edu) => (
          <div key={edu.id}>
            <h3 className="font-medium text-base">{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
            <p className="text-sm opacity-70 mb-1">{edu.institution}</p>
            <p className="text-xs opacity-50">
              {edu.start_date && new Date(edu.start_date).getFullYear()}
              {edu.end_date ? ` – ${new Date(edu.end_date).getFullYear()}` : ''}
            </p>
            {edu.description && (
              <p className="text-sm leading-relaxed opacity-80 mt-2">{edu.description}</p>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}