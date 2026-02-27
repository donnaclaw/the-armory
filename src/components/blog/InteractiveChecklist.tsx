'use client'

import { useState } from 'react'
import { CheckCircle2, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

interface InteractiveChecklistProps {
    title: string
    items: string[]
}

export function InteractiveChecklist({ title, items }: InteractiveChecklistProps) {
    const [checked, setChecked] = useState<number[]>([])

    const toggle = (index: number) => {
        setChecked(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        )
    }

    return (
        <div className="my-12 p-8 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-white font-black uppercase tracking-widest text-sm mb-8 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#4F46E5]" />
                {title}
            </h3>
            <div className="space-y-3">
                {items.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => toggle(index)}
                        className={cn(
                            "w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 text-left border",
                            checked.includes(index)
                                ? "bg-[#4F46E5]/10 border-[#4F46E5]/30 text-white"
                                : "bg-black/20 border-white/5 text-gray-400 hover:border-white/20"
                        )}
                    >
                        {checked.includes(index) ? (
                            <CheckCircle2 className="w-5 h-5 text-[#4F46E5] flex-shrink-0" />
                        ) : (
                            <Circle className="w-5 h-5 flex-shrink-0" />
                        )}
                        <span className="text-sm font-medium leading-tight">{item}</span>
                    </button>
                ))}
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">
                    Process Integrity: {Math.round((checked.length / items.length) * 100)}%
                </span>
                <div className="h-1 w-32 bg-white/5 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] transition-all duration-500"
                        style={{ width: `${(checked.length / items.length) * 100}%` }}
                    />
                </div>
            </div>
        </div>
    )
}
