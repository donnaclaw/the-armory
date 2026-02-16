import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-[#0B0B0B] text-gray-300 py-20 px-4 font-mono">
            <div className="max-w-3xl mx-auto space-y-12">
                <Link href="/" className="inline-flex items-center gap-2 text-[#4F46E5] hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    RETURN TO ARMORY
                </Link>

                <header className="border-b border-white/10 pb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">TERMS OF SERVICE</h1>
                    <p className="text-sm text-gray-500">LAST UPDATED: 2026-02-16</p>
                </header>

                <section className="space-y-6">
                    <h2 className="text-xl font-bold text-white">1. ACCEPTANCE OF TERMS</h2>
                    <p>By accessing The Armory and purchasing any digital assets, you agree to be bound by these Terms of Service. If you do not agree, do not proceed with any transaction.</p>
                    <p className="text-[#4F46E5] font-bold text-sm bg-[#4F46E5]/5 border border-[#4F46E5]/20 p-4 rounded-lg">
                        🛡️ NOTE: By proceeding with a purchase, you acknowledge and agree to our pre-selected terms of service.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-xl font-bold text-white">2. NATURE OF GOODS & TRANSFER</h2>
                    <p>You are purchasing access credentials for aged social media accounts. These are digital goods with no physical delivery.</p>
                    <p className="p-4 bg-white/5 border border-white/10 rounded-lg text-sm">
                        <strong>DIGITAL ASSET TRANSFER:</strong> Once credentials are sent via Telegram/Discord, the sale is **final**. The Customer assumes all platform-risk (shadowbans, locks, or restrictions) after the first 24 hours of possession.
                    </p>
                </section>

                <section className="space-y-6 p-6 border border-red-500/20 bg-red-500/5 rounded-lg">
                    <h2 className="text-xl font-bold text-red-500">3. USAGE RISK & LIABILITY</h2>
                    <p className="font-bold">THE BUYER ASSUMES ALL RISK AFTER DELIVERY.</p>
                    <p>
                        The Armory provides valid credentials at the time of transfer. We do not control third-party platforms (e.g., Instagram, Facebook) and are not liable for bans, locks, or restrictions that occur due to user activity, proxy quality, or device fingerprints after the initial login.
                    </p>
                    <p>
                        It is the buyer's sole responsibility to use high-quality residential proxies and anti-detect browsers to maintain account integrity.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-xl font-bold text-white">4. PROHIBITED ACTIVITIES</h2>
                    <p>These assets are provided for legitimate marketing and branding purposes. Any use for illegal activities, harassment, or fraud will result in an immediate blacklist from our services.</p>
                </section>
            </div>
        </main>
    )
}
