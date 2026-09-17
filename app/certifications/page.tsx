import { supabase } from '@/lib/supabase'

export default async function CertificationsPage() {
  const { data: certifications } = await supabase
    .from('certifications')
    .select('*')
    .eq('published', true)
    .order('display_order', { ascending: true })

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="font-display text-3xl mb-10">Certifications</h1>
      <div className="space-y-8">
        {certifications?.map((cert) => (
          <div key={cert.id}>
            <h3 className="font-medium text-base">{cert.name}</h3>
            <p className="text-sm opacity-70 mb-1">
              {cert.issuing_organization}
              {cert.issue_date && ` · ${new Date(cert.issue_date).getFullYear()}`}
            </p>
            {cert.description && (
              <p className="text-sm leading-relaxed opacity-80">{cert.description}</p>
            )}
            {cert.credential_url && (
              <a
                href={cert.credential_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs mt-1 inline-block"
                style={{ color: 'var(--color-accent)' }}
              >
                View credential →
              </a>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}