import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Award, Cpu, Globe, Shield, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { AboutViewTracker } from '@/components/AboutViewTracker'
import { buildPageMetadata, toAbsoluteUrl } from '@/lib/seo'

export const metadata = buildPageMetadata({
  title: 'About The Armory | Global Digital Asset Infrastructure',
  description:
    'Learn how The Armory operates across the USA, Dubai, Portugal, and Italy to provide high-trust aged social media assets with OGE and 2FA security.',
  path: '/about',
})

const ABOUT_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      url: toAbsoluteUrl('/about'),
      name: 'About The Armory',
      description:
        'The Armory is a global digital asset infrastructure brand focused on high-trust aged social media assets.',
      inLanguage: 'en-US',
      isPartOf: toAbsoluteUrl('/'),
    },
    {
      '@type': 'Organization',
      name: 'The Armory',
      url: toAbsoluteUrl('/'),
      logo: toAbsoluteUrl('/icon.svg'),
      foundingDate: '2017',
      description:
        'Global infrastructure provider for aged social media assets with OGE and 2FA coverage.',
      sameAs: ['https://t.me/luke_of'],
      areaServed: ['United States', 'United Arab Emirates', 'Portugal', 'Italy'],
    },
  ],
}

const operations = ['USA', 'DUBAI', 'PORTUGAL', 'ITALY']

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] pt-32 pb-20 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ABOUT_SCHEMA) }}
      />
      <AboutViewTracker />

      <div className="max-w-5xl mx-auto space-y-24">
        <header className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4F46E5]/10 border border-[#4F46E5]/20 text-[#4F46E5] text-[10px] font-black uppercase tracking-widest">
            <Shield className="w-3 h-3" />
            Established 2017
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-tight max-w-4xl mx-auto">
            THE ARMORY: GLOBAL{' '}
            <span className="text-[#4F46E5]">INFRASTRUCTURE</span>
            {' '}FOR DIGITAL ASSETS
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
            The Armory powers high-trust account operations for agencies and growth teams.
            We run globally across the USA, Dubai, Portugal, and Italy with security-first delivery.
          </p>
        </header>

        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-[#4F46E5]/10 border border-[#4F46E5]/20 flex items-center justify-center">
              <Award className="w-6 h-6 text-[#4F46E5]" />
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">The Mission</h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              The Armory was founded to solve the trust deficit in the digital asset marketplace.
              While buyagedinstagramaccount.com is our core domain, our brand represents the
              operational security and technical discipline behind every transfer.
            </p>
          </div>

          <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm group">
            <Image
              src="/images/dubai-hq.png"
              alt="The Armory operations team headquarters in Dubai"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover grayscale-[0.25] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
              <div className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                LIVE FEED: DUBAI HQ OPERATIONS
              </div>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="md:order-2 space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-[#4F46E5]/10 border border-[#4F46E5]/20 flex items-center justify-center">
              <Globe className="w-6 h-6 text-[#4F46E5]" />
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">Global Presence</h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              Our team operates across multiple hubs so support, inventory checks, and transfer
              handling continue around the clock. This distributed model keeps delivery stable and
              response times tight for high-volume buyers.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {operations.map((location) => (
              <div
                key={location}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
              >
                <span className="text-white font-black uppercase tracking-widest text-xs">
                  {location}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="p-12 rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#4F46E5]/5 blur-3xl rounded-full -mr-32 -mt-32" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="w-20 h-20 rounded-3xl bg-[#4F46E5] flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.3)]">
              <Cpu className="w-10 h-10 text-white" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                Technical Transparency
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
                We do not only deliver accounts. We also provide process tooling, operator guides,
                and security standards so teams can scale without exposing themselves to recovery
                risk or unstable infrastructure.
              </p>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-4">
          <article className="rounded-2xl border border-white/10 bg-[#101010] p-6">
            <ShieldCheck className="w-5 h-5 text-[#4F46E5] mb-3" />
            <h3 className="text-white font-black uppercase tracking-widest text-xs mb-2">Security</h3>
            <p className="text-sm text-gray-400">OGE-first transfer logic with clear ownership handoff protocols.</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-[#101010] p-6">
            <ShieldCheck className="w-5 h-5 text-[#4F46E5] mb-3" />
            <h3 className="text-white font-black uppercase tracking-widest text-xs mb-2">Operations</h3>
            <p className="text-sm text-gray-400">Structured intake, delivery verification, and support response standards.</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-[#101010] p-6">
            <ShieldCheck className="w-5 h-5 text-[#4F46E5] mb-3" />
            <h3 className="text-white font-black uppercase tracking-widest text-xs mb-2">Scale</h3>
            <p className="text-sm text-gray-400">Bulk-ready provisioning for agencies running multi-account infrastructure.</p>
          </article>
        </section>

        <section className="text-center pt-8 space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">
            Need inventory immediately?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#inventory">
              <Button className="bg-[#4F46E5] text-white hover:bg-[#4F46E5]/90 px-10 py-6 font-black uppercase tracking-[0.2em] text-xs rounded-full group transition-all hover:scale-105">
                Explore Inventory
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link
              href="/blog"
              className="px-10 py-3 rounded-full border border-white/15 text-gray-200 text-xs font-black uppercase tracking-[0.2em] hover:border-[#4F46E5]/40 hover:text-white transition-colors"
            >
              Read Alpha Academy
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
