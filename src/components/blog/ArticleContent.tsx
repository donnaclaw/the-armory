import ReactMarkdown from 'react-markdown'
import { ChevronRight } from 'lucide-react'

interface ArticleContentProps {
    content: string
}

export function ArticleContent({ content }: ArticleContentProps) {
    return (
        <div className="prose prose-invert max-w-none">
            <ReactMarkdown
                components={{
                    h2: ({ ...props }) => (
                        <h2 className="group flex items-center gap-4 text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mt-16 mb-8 relative" {...props}>
                            <div className="w-1.5 h-8 bg-gradient-to-b from-[#4F46E5] to-[#7C3AED] rounded-full" />
                            <span className="relative">
                                {props.children}
                                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4F46E5] group-hover:w-full transition-all duration-500 opacity-50" />
                            </span>
                        </h2>
                    ),
                    p: ({ ...props }) => (
                        <p className="text-gray-400 leading-[1.8] text-lg mb-8 font-medium" {...props} />
                    ),
                    strong: ({ ...props }) => (
                        <strong className="text-[#4F46E5] font-black uppercase tracking-tight relative px-1" {...props}>
                            <span className="relative z-10">{props.children}</span>
                            <span className="absolute inset-0 bg-[#4F46E5]/10 rounded-sm -skew-x-6" />
                        </strong>
                    ),
                    ul: ({ ...props }) => (
                        <ul className="space-y-4 mb-10" {...props} />
                    ),
                    li: ({ ...props }) => (
                        <li className="flex items-start gap-3 text-gray-400 leading-relaxed font-medium">
                            <ChevronRight className="w-5 h-5 text-[#4F46E5] mt-1 flex-shrink-0" />
                            <span>{props.children}</span>
                        </li>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    )
}
