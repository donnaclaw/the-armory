import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function RefundPolicyPage() {
    return (
        <main className="min-h-screen bg-[#0B0B0B] text-gray-300 py-20 px-4 font-mono">
            <div className="max-w-3xl mx-auto space-y-12">
                <Link href="/" className="inline-flex items-center gap-2 text-[#4F46E5] hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    RETURN TO ARMORY
                </Link>

                <header className="border-b border-white/10 pb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">REFUND & REPLACEMENT POLICY</h1>
                    <p className="text-sm text-gray-500">STRICT ENFORCEMENT PROTOCOL</p>
                </header>

                <section className="space-y-6">
                    <h2 className="text-xl font-bold text-white">1. NO REFUNDS</h2>
                    <p>Due to the irreversible nature of digital goods, we do not offer cash refunds under any circumstances. We offer <strong>replacements only</strong> for defective units.</p>
                </section>

                <section className="space-y-6 p-6 border border-[#4F46E5]/20 bg-[#4F46E5]/5 rounded-lg">
                    <h2 className="text-xl font-bold text-[#4F46E5]">2. 24-HOUR DOA REPLACEMENT GUARANTEE</h2>
                    <p>
                        <strong>Replacement only if account is locked at first login.</strong> If an account is non-functional ("Dead on Arrival") at the time of delivery, we will replace it free of charge within 24 hours of purchase.
                    </p>
                    <h3 className="text-lg font-bold text-white mt-4">REQUIRED PROOF:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>You must record a video of the entire login process.</li>
                        <li>The video must show the copy/paste of credentials and the error message on the official login page.</li>
                        <li>The video must show the system time/date.</li>
                    </ul>
                    <p className="mt-4 text-xs uppercase tracking-widest text-gray-500">FAILURE TO PROVIDE VIDEO PROOF VOIDS THIS GUARANTEE.</p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-xl font-bold text-white">3. EXCLUSIONS</h2>
                    <p>We do not replace accounts if:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>You changed the username or password immediately without warming up (48h rule).</li>
                        <li>You used a flagged/low-quality proxy or IP address.</li>
                        <li>The account was locked due to aggressive activity (spamming, mass liking).</li>
                    </ul>
                </section>
            </div>
        </main>
    )
}
