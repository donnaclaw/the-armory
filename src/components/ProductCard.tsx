import { motion } from "framer-motion"
import { Check, Shield } from "lucide-react"
import { Button } from "@/components/ui/Button"

interface ProductProps {
    title: string
    year: string
    price: string
    features: string[]
    popular?: boolean
}

export function ProductCard({ title, year, price, features, popular }: ProductProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={`relative p-6 rounded-2xl glass transition-all duration-300 group ${popular ? 'border-[#4F46E5]/50 shadow-[0_0_30px_rgba(79,70,229,0.15)]' : 'border-white/5'}`}
        >
            {popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#4F46E5] text-white text-[10px] uppercase font-bold tracking-widest rounded-full shadow-lg">
                    Best Value
                </div>
            )}

            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Shield className={`w-4 h-4 ${popular ? 'text-[#4F46E5]' : 'text-gray-400'}`} />
                        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">{year} VINTAGE</span>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#4F46E5] transition-colors">{title}</h3>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-black text-white">${price}</div>
                </div>
            </div>

            <div className="space-y-3 mb-6">
                {features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                        <Check className="w-4 h-4 text-[#4F46E5]" />
                        <span>{feature}</span>
                    </div>
                ))}
            </div>

            <Button className="w-full" variant={popular ? 'primary' : 'outline'}>
                SECURE UNIT
            </Button>
        </motion.div>
    )
}
