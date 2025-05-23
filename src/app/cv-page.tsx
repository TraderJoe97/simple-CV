"use client"
import { CVContent } from "@/components/cv-content"
import { usePaperTiltEffect } from "@/components/paper-tilt-effect"

export default function CVPage() {
  usePaperTiltEffect()

  return (
    <div className="cv-container">
      <main className="cv-paper">
        <div className="paper-content">
          <CVContent />
        </div>
      </main>
    </div>
  )
}
