"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface BackgroundImageProps {
  children: React.ReactNode
}

export function BackgroundImage({ children }: BackgroundImageProps) {
  const [backgroundUrl, setBackgroundUrl] = useState<string>("")

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      const UNSPLASH_API_KEY = "KDzBDB93q0BzpmTU4yW2OzGGdcjvIGViPEu_zFTzj8Q"
      const queryKeywords = ["Coding", "Programming", "Books", "Learning", "Tech"]
      const randomQuery = queryKeywords[Math.floor(Math.random() * queryKeywords.length)]

      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/random?query=${randomQuery}&client_id=${UNSPLASH_API_KEY}&orientation=portrait`,
        )

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        if (data && data.urls && data.urls.full) {
          setBackgroundUrl(data.urls.full)
        } else {
          throw new Error("Invalid response format from Unsplash API")
        }
      } catch (error) {
        console.error("Error fetching Unsplash background image:", error)
        setBackgroundUrl(
          "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        )
      }
    }

    fetchBackgroundImage()
  }, [])

  const backgroundStyle = {
    backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : undefined,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  }

  return (
    <div className="background" style={backgroundStyle}>
      {children}
    </div>
  )
}
