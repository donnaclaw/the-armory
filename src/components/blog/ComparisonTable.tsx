'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { Check, X, Shield, TrendingUp, ArrowRight } from "lucide-react"

interface ComparisonTableProps {
    title?: string
    data?: {
        metric: string
        aged: string | boolean
        fresh: string | boolean
        isHighlight?: boolean
    }[]
}

const DEFAULT_DATA = [
    { metric: "Trust Factor", aged: "High Authority (Legacy)", fresh: "Sandbox Restricted", isHighlight: true },
    { metric: "Daily Action Limits", aged: "50+ DMs / Hour", fresh: "< 5 DMs / Hour" },
    { metric: "Shadowban Resistance", aged: "Hardened Profile", fresh: "High-Risk (Instantly Flagged)" },
    { metric: "Verification", aged: "OGE & 2FA Integrated", fresh: "New Email (No History)" }
]

export function ComparisonTable({
    title = "TECHNICAL TRUST SCORE: AGED VS. FRESH ASSETS (2026 BENCHMARKS)",
    data = DEFAULT_DATA
}: ComparisonTableProps) {
    return (
        <div
            className="my-12 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl"
            itemScope
            itemType="https://schema.org/Table"
        >
            <div className="p-6 border-b border-white/10 bg-white/5">
                <h3 className="text-sm font-black text-white tracking-widest uppercase flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#4F46E5]" />
                    <span itemProp="about">{title}</span>
                </h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Metric</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#4F46E5] bg-[#4F46E5]/10">
                                AGED (2010-2026)
                            </th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                FRESH (NEW)
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {data.map((row, i) => (
                            <motion.tr
                                key={row.metric}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="group hover:bg-white/5 transition-colors"
                            >
                                <td className="px-6 py-5 text-xs font-bold text-gray-400 group-hover:text-white transition-colors">{row.metric}</td>
                                <td className="px-6 py-5 text-sm font-black text-white bg-[#4F46E5]/5 border-x border-white/5">
                                    <div className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-[#4F46E5]" />
                                        {row.aged}
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-sm font-medium text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <X className="w-4 h-4 text-red-900" />
                                        {row.fresh}
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-6 bg-gradient-to-r from-transparent via-[#4F46E5]/10 to-transparent flex flex-col items-center gap-4 text-center border-t border-white/10">
                <p className="text-[10px] text-[#4F46E5] font-black uppercase tracking-[0.3em] flex items-center gap-2">
                    <TrendingUp className="w-3 h-3" /> BENCHMARK DATA: ARMORY RESEARCH LAB 2026
                </p>
                <div className="w-full h-px bg-white/5" />
                <Link
                    href="/#inventory"
                    className="group inline-flex items-center gap-3 px-8 py-3 bg-[#4F46E5] text-white text-xs font-black rounded-full hover:bg-[#4F46E5]/90 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)]"
                >
                    READY TO SCALE? VIEW AGED INVENTORY
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    )
}
