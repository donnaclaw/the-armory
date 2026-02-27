'use client'

import { Lightbulb } from "lucide-react"

interface KeyFindingsProps {
    findings: string[]
}

export function KeyFindings({ findings }: KeyFindingsProps) {
    return (
        <div className="my-12 p-8 rounded-2xl bg-gradient-to-br from-[#4F46E5]/10 to-transparent border border-[#4F46E5]/20 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6 text-[#4F46E5]">
                <Lightbulb className="w-5 h-5 font-black" />
                <h3 className="text-sm font-black uppercase tracking-widest">Key Findings & Data</h3>
            </div>
            <ul className="space-y-4">
                {findings.map((finding, index) => (
                    <li key={index} className="flex gap-4 items-start text-gray-300">
                        <span className="text-[#4F46E5] font-black mt-1">0{index + 1}</span>
                        <p className="leading-relaxed text-sm font-medium">{finding}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
