import Link from "next/link"
import type { ComponentType, ReactNode } from "react"
import { ChevronDown, ShieldCheck, CreditCard, Lock, Mail, Zap } from "lucide-react"

interface FaqItem {
  question: string
  answer: ReactNode
  icon: ComponentType<{ className?: string }>
}

const FAQS: FaqItem[] = [
  {
    question: "How do I use the 2FA?",
    answer: (
      <>
        Ensure you are using our internal{' '}
        <Link href="/tools/2fa-code-generator" className="text-[#4F46E5] hover:underline">
          2FA TOOL
        </Link>{' '}
        page. If codes fail, contact{' '}
        <a href="https://t.me/luke_of" target="_blank" rel="noreferrer" className="underline">
          @luke_of
        </a>{' '}
        for a 24h replacement.
      </>
    ),
    icon: Lock,
  },
  {
    question: "What does OGE mean?",
    answer: (
      <>
        <strong className="text-white">Original Email (OGE)</strong> access. This ensures you are the sole owner and the
        account cannot be recovered by others. We provide the login credentials for the email itself.
      </>
    ),
    icon: Mail,
  },
  {
    question: "Login Safety Protocols",
    answer: (
      <>
        Always use a high-quality residential proxy or <strong className="text-white">anti-detect browser</strong>
        {' '}(GoLogin/AdsPower). Wait <strong className="text-white">24-48 hours</strong> after the first login
        before aggressive actions like mass-following or link-bio changes.
      </>
    ),
    icon: ShieldCheck,
  },
  {
    question: "Payment Methods",
    answer: (
      <>
        We accept all major <strong className="text-white">cryptocurrencies</strong> (BTC, ETH, LTC, USDT) and{' '}
        <strong className="text-white">Wise</strong> payment links for instant processing.
        <br />
        <br />
        <span className="text-[#4F46E5] font-bold">Conversion Bridge:</span> Send a screenshot of your transfer to{' '}
        <a href="https://t.me/luke_of" target="_blank" rel="noreferrer" className="underline">
          @luke_of
        </a>{' '}
        on Telegram for fastest delivery confirmation.
      </>
    ),
    icon: CreditCard,
  },
  {
    question: "Can I use these accounts for OFM or AI-influencer models?",
    answer: (
      <>
        Yes. Our aged accounts are vetted for high-trust environments like <strong className="text-white">OFM and AI-growth</strong>,
        where fresh accounts are often flagged quickly by behavioral models.
      </>
    ),
    icon: ShieldCheck,
  },
  {
    question: "Do the accounts come with followers?",
    answer: (
      <>
        We offer both <strong className="text-white">Clean Slate</strong> aged accounts and <strong className="text-white">Seeded</strong>{' '}
        accounts with followers. Check card-level notes inside inventory for each option.
      </>
    ),
    icon: Lock,
  },
  {
    question: "Is there a limit to how many accounts I can buy?",
    answer: (
      <>
        No. We handle bulk orders from <strong className="text-white">50 to 5,000+ units</strong>. Contact us on Telegram
        for custom wholesale pricing.
      </>
    ),
    icon: Zap,
  },
  {
    question: "What happens if the 2FA code does not work?",
    answer: (
      <>
        First, verify the secret in our built-in{' '}
        <Link href="/tools/2fa-code-generator" className="text-[#4F46E5] hover:underline">
          2FA Generator Tool
        </Link>
        . If the code still fails, our 24h replacement guarantee applies. Contact @luke_of on Telegram immediately.
      </>
    ),
    icon: ShieldCheck,
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-black text-white mb-12 text-center tracking-tighter uppercase">
          PRO-VENDOR <span className="text-[#4F46E5]">KNOWLEDGE BASE</span>
        </h2>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="glass rounded-xl overflow-hidden group border border-white/5 hover:border-[#4F46E5]/30 transition-colors"
            >
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none text-white font-bold hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white/5 rounded-lg text-[#4F46E5]">
                      <faq.icon className="w-5 h-5" />
                    </div>
                    <span>{faq.question}</span>
                  </div>
                  <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-300 group-open:rotate-180 group-open:text-[#4F46E5]" />
                </summary>
                <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4 pl-[4.5rem]">
                  {faq.answer}
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
