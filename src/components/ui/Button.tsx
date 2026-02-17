'use client'

import * as React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    variant?: "primary" | "secondary" | "outline"
    glow?: boolean
    children?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", glow = true, children, ...props }, ref) => {
        const variants = {
            primary: "bg-[#4F46E5] text-white border border-[#4F46E5] hover:bg-[#4338ca]",
            secondary: "bg-white/10 text-white border border-white/10 hover:bg-white/20 backdrop-blur-md",
            outline: "bg-transparent text-white border border-white/20 hover:border-[#4F46E5] hover:text-[#4F46E5]",
        }

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    "relative inline-flex items-center justify-center px-8 py-4 text-sm font-bold tracking-wider uppercase transition-all duration-300 rounded-sm overflow-hidden",
                    variants[variant],
                    glow && variant === 'primary' && "shadow-[0_0_20px_rgba(79,70,229,0.5)] hover:shadow-[0_0_30px_rgba(79,70,229,0.7)]",
                    className
                )}
                {...props}
            >
                <span className="relative z-10 flex items-center gap-2">{children}</span>
                {variant === 'primary' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:animate-[shimmer_1.5s_infinite]" />
                )}
            </motion.button>
        )
    }
)
Button.displayName = "Button"

export { Button }
