'use client'

import Link from "next/link"
import { Shield, ArrowRight } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

interface ProductBridgeProps {
    title: string
    description: string
    link: string
}

export function ProductBridge({ title, description, link }: ProductBridgeProps) {
    return (
        <div className="my-16 p-px rounded-2xl bg-gradient-to-br from-[#4F46E5] to-transparent shadow-2xl shadow-[#4F46E5]/10 group">
            <div className="bg-[#0B0B0B] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#4F46E5] to-black flex items-center justify-center border border-white/20 group-hover:scale-105 transition-transform">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <div className="space-y-1">
                        <div className="text-[10px] font-black text-[#4F46E5] uppercase tracking-widest mb-1">Recommended Asset</div>
                        <h4 className="text-xl font-black text-white tracking-tighter uppercase">{title}</h4>
                        <p className="text-gray-500 text-sm">{description}</p>
                    </div>
                </div>
                <Link
                    href={link}
                    className="w-full md:w-auto px-8 py-4 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#4F46E5]/20"
                    onClick={() =>
                        trackEvent("blog_to_buy_click", {
                            source: "blog_product_bridge",
                            target: link,
                        })
                    }
                >
                    ENTER THE ARMORY
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    )
}
