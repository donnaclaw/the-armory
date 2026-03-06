import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowRight, KeyRound, Wrench } from 'lucide-react'
import { buildPageMetadata, toAbsoluteUrl } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Tools Hub | Security Utilities for Aged Accounts',
  description:
    'Operational tools for aged Instagram and Threads account workflows, including our browser-based 2FA code generator.',
  path: '/tools',
  keywords: [
    'aged account tools',
    '2fa generator',
    'instagram tools',
    'threads tools',
    'account security tools',
  ],
  languages: {
    'en-US': '/tools',
  },
})

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'The Armory Tools Hub',
  url: toAbsoluteUrl('/tools'),
  inLanguage: 'en-US',
  description:
    'Operational tools for aged Instagram and Threads account workflows, including browser-based 2FA generation.',
  hasPart: [
    {
      '@type': 'SoftwareApplication',
      name: '2FA Code Generator',
      url: toAbsoluteUrl('/tools/2fa-code-generator'),
      applicationCategory: 'SecurityApplication',
    },
  ],
}

export default function ToolsHubPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] pt-32 pb-20 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <div className="max-w-6xl mx-auto space-y-14">
        <header className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F46E5]/10 border border-[#4F46E5]/20 text-[#4F46E5] text-xs font-bold uppercase tracking-widest">
            <Wrench className="w-3 h-3" />
            Infrastructure Tools
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-tight">
            Security <span className="text-[#4F46E5]">Tools Hub</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Dedicated utilities for day-to-day aged account operations. Fast checks, cleaner logins, and better account safety.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <article className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-8 space-y-5">
            <div className="w-12 h-12 rounded-xl bg-[#4F46E5]/10 text-[#4F46E5] flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">2FA Code Generator</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Generate live 6-digit TOTP codes in-browser from your secret key. No server storage and RFC 6238 compatible.
            </p>
            <Link
              href="/tools/2fa-code-generator"
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#4F46E5] hover:text-white transition-colors"
            >
              Open Tool
              <ArrowRight className="w-4 h-4" />
            </Link>
          </article>

          <article className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-8 space-y-5">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Need full account setup?</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Combine tools with production-ready inventory and proven setup playbooks for better login stability and safer scaling.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest">
              <Link href="/buy/instagram" className="text-[#4F46E5] hover:text-white transition-colors">Aged Instagram</Link>
              <Link href="/buy/threads" className="text-[#4F46E5] hover:text-white transition-colors">Aged Threads</Link>
              <Link href="/blog" className="text-[#4F46E5] hover:text-white transition-colors">Alpha Academy</Link>
            </div>
          </article>
        </section>
      </div>
    </main>
  )
}
