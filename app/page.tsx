import { WeatherWidget } from "@/components/weather-widget"
import { DownloadButton } from "@/components/download-button"
import { Navigation } from "@/components/navigation"
import { CVContent } from "@/components/cv-content"
import { BackgroundImage } from "@/components/background-image"

export default function Home() {
  return (
    <BackgroundImage>
      <div className="weather-widget-container">
        <WeatherWidget />
      </div>

      <div className="download-container">
        <DownloadButton />
      </div>

      <div className="portfolio-container">
        <Navigation />
        <main className="cv-paper">
          <div className="paper-content">
            <CVContent />
          </div>
        </main>
      </div>
    </BackgroundImage>
  )
}
