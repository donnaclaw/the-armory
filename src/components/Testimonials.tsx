import { Star, Quote } from "lucide-react"

const REVIEWS = [
  {
    name: "Marcus D.",
    role: "Agency Owner, Dubai",
    text: "Went from 10 accounts to 200 in two weeks flat. Not a single ban. Having OGE on every account means I actually own what I paid for and that is rare in this game.",
    rating: 5,
    platform: "Instagram",
  },
  {
    name: "Sofia R.",
    role: "OFM Operator, London",
    text: "The 2012 heritage assets are insane for DMs. Open rates jumped from 8% to 34% right after switching from fresh to aged.",
    rating: 5,
    platform: "Instagram",
  },
  {
    name: "Jake T.",
    role: "Growth Marketer, Austin",
    text: "We order Gmail in bulk for registration infrastructure. Every batch has been clean and support remains fast.",
    rating: 5,
    platform: "Gmail",
  },
  {
    name: "Christoph R.",
    role: "AI Model Manager, Berlin",
    text: "Got 250 custom Threads linked to IG with model details and scaled our operation rapidly. This setup would not be possible on fresh assets.",
    rating: 5,
    platform: "Threads",
  },
  {
    name: "Ricardo M.",
    role: "Performance Marketer, Sao Paulo",
    text: "Tried three vendors before this one. OGE plus 2FA on every unit and no pullbacks over six months of daily usage.",
    rating: 5,
    platform: "Facebook",
  },
  {
    name: "Alex W.",
    role: "Reddit Marketer, Toronto",
    text: "High-karma Reddit accounts that hold up under daily posting. Legit aged inventory, not spun throwaways.",
    rating: 5,
    platform: "Reddit",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">
            TRUSTED BY <span className="text-[#4F46E5]">347+ OPERATORS</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Agencies, OFM operators, and growth marketers across 40+ countries trust The Armory for aged social media infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <article
              key={i}
              className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 hover:border-[#4F46E5]/30 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <span className="text-[9px] font-black text-[#4F46E5] uppercase tracking-widest bg-[#4F46E5]/10 px-2 py-0.5 rounded border border-[#4F46E5]/20">
                  {review.platform}
                </span>
              </div>

              <div className="relative mb-4">
                <Quote className="w-5 h-5 text-[#4F46E5]/20 absolute -top-1 -left-1" />
                <p className="text-gray-300 text-sm leading-relaxed pl-4">{review.text}</p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <p className="text-white font-bold text-sm">{review.name}</p>
                <p className="text-gray-500 text-xs">{review.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
