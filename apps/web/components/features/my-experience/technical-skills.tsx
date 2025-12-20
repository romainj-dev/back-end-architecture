'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GlassCard,
  GlassCardContent,
  GlassCardHeader,
  GlassCardTitle,
} from '@/components/ui/glass-card'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, Orbit } from 'lucide-react'
import { getCategorizedSkills, SkillCategory } from './utils'

export function TechnicalSkills() {
  const categories = useMemo(() => getCategorizedSkills(), [])
  const [selectedCategory, setSelectedCategory] =
    useState<SkillCategory | null>(null)

  return (
    <GlassCard
      variant="primary"
      className="h-full min-h-[450px] flex flex-col overflow-hidden bg-white/50 dark:bg-black/20"
    >
      <GlassCardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AnimatePresence mode="wait">
              {selectedCategory ? (
                <motion.button
                  key="back"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={() => setSelectedCategory(null)}
                  className="p-1 hover:bg-secondary rounded-full transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </motion.button>
              ) : (
                <motion.div
                  key="icon"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Orbit className="h-5 w-5 text-primary" />
                </motion.div>
              )}
            </AnimatePresence>
            <div>
              <GlassCardTitle className="text-base font-bold">
                {selectedCategory
                  ? selectedCategory.name
                  : 'Technical Universe'}
              </GlassCardTitle>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                {selectedCategory
                  ? 'Skill Breakdown'
                  : 'Select a domain to explore'}
              </p>
            </div>
          </div>
          {!selectedCategory && (
            <div className="flex gap-1">
              {categories.map((c) => (
                <div
                  key={c.id}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: c.color }}
                />
              ))}
            </div>
          )}
        </div>
      </GlassCardHeader>

      <GlassCardContent className="flex-1 relative p-6 overflow-hidden">
        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            <GlobalUniverse
              key="global"
              categories={categories}
              onSelect={setSelectedCategory}
            />
          ) : (
            <CategoryDetails key="details" category={selectedCategory} />
          )}
        </AnimatePresence>
      </GlassCardContent>

      <div className="p-3 border-t border-border/10 bg-white/40 dark:bg-black/20 backdrop-blur-md flex justify-between items-center">
        <span className="text-[10px] font-medium text-muted-foreground">
          Computed from achievements
        </span>
        <Badge
          variant="outline"
          className="text-[9px] h-4 px-1.5 font-bold bg-primary/5 border-primary/20 text-primary"
        >
          AI-POWERED
        </Badge>
      </div>
    </GlassCard>
  )
}

function GlobalUniverse({
  categories,
  onSelect,
}: {
  categories: SkillCategory[]
  onSelect: (c: SkillCategory) => void
}) {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Ambient Background Circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-primary/5 rounded-full animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-primary/5 rounded-full" />

      <div className="flex flex-wrap items-center justify-center gap-8 relative z-10">
        {categories.map((category, idx) => (
          <motion.div
            key={category.id}
            layoutId={`bubble-${category.id}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -10, 0],
            }}
            transition={{
              y: {
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: idx * 0.5,
              },
            }}
            whileHover={{ scale: 1.1, zIndex: 20 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onSelect(category)}
            className="cursor-pointer group relative"
          >
            {/* Bubble Style */}
            <div
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center p-4 relative overflow-hidden transition-all duration-500 shadow-xl group-hover:shadow-2xl"
              style={{
                background: `radial-gradient(circle at 30% 30%, white 0%, ${category.color} 50%, color-mix(in oklch, ${category.color}, black 20%) 100%)`,
                boxShadow: `0 10px 30px -5px color-mix(in oklch, ${category.color}, transparent 60%), inset 0 -4px 10px rgba(0,0,0,0.2)`,
              }}
            >
              {/* Inner Glow */}
              <div className="absolute inset-0 opacity-20 bg-white mix-blend-overlay rounded-full" />

              <span className="text-white font-bold text-xs sm:text-sm text-center drop-shadow-md mb-2">
                {category.name}
              </span>

              {/* Score Pill */}
              <div className="bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 shadow-lg">
                <span className="text-[10px] font-mono font-bold text-white leading-none">
                  {category.totalScore}
                </span>
              </div>

              {/* Hover Details Hint */}
              <div className="absolute bottom-1 opacity-0 group-hover:opacity-100 transition-opacity flex gap-0.5">
                <div
                  className="w-1 h-1 rounded-full bg-white animate-bounce"
                  style={{ animationDelay: '0ms' }}
                />
                <div
                  className="w-1 h-1 rounded-full bg-white animate-bounce"
                  style={{ animationDelay: '150ms' }}
                />
                <div
                  className="w-1 h-1 rounded-full bg-white animate-bounce"
                  style={{ animationDelay: '300ms' }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function CategoryDetails({ category }: { category: SkillCategory }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: category.color }}
          />
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
            {category.name} Skills
          </h3>
        </div>
        <Badge variant="secondary" className="font-mono text-[10px]">
          Total: {category.totalScore}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {category.skills.map((skill, idx) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group relative"
          >
            <div className="bg-white dark:bg-white/5 border border-border/50 rounded-2xl p-3 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-xs group-hover:text-primary transition-colors">
                  {skill.name}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {skill.score}
                </span>
              </div>

              {/* Mini Progress Bar */}
              <div className="h-1.5 w-full bg-secondary/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min(100, (skill.score / category.totalScore) * 300)}%`,
                  }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: category.color }}
                />
              </div>
            </div>

            {/* Staggered Floating Elements (Visual Decoration) */}
            {idx % 3 === 0 && (
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-2 h-2 rounded-full opacity-40"
                style={{ backgroundColor: category.color, filter: 'blur(2px)' }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Empty state or "More" hint if many skills */}
      {category.skills.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center opacity-50">
          <p className="text-xs italic">No specific skills extracted yet</p>
        </div>
      )}
    </motion.div>
  )
}
