"use client"

import { useEffect } from "react"

export function usePaperTiltEffect() {
  useEffect(() => {
    const cvPaper = document.querySelector(".cv-paper") as HTMLElement
    const maxTilt = 1.5

    // Check if it's a mobile device
    const isMobileDevice = () => {
      return (
        window.innerWidth <= 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      )
    }

    // Only apply tilt effect on desktop devices
    if (!isMobileDevice() && cvPaper) {
      const handleMouseMove = (e: MouseEvent) => {
        const paperRect = cvPaper.getBoundingClientRect()
        const paperCenterX = paperRect.left + paperRect.width / 2
        const paperCenterY = paperRect.top + paperRect.height / 2

        const mouseX = e.clientX
        const mouseY = e.clientY

        const distanceX = (mouseX - paperCenterX) / (paperRect.width / 2)
        const distanceY = (mouseY - paperCenterY) / (paperRect.height / 2)

        const tiltX = -distanceY * maxTilt
        const tiltY = distanceX * maxTilt

        cvPaper.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
      }

      const handleMouseLeave = () => {
        cvPaper.style.transform = "perspective(1000px) rotateX(2deg) rotateY(0deg)"
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])
}
