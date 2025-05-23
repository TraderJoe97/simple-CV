"use client"

import { useState } from "react"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

export function DownloadButton() {
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePDF = async () => {
    setIsGenerating(true)

    try {
      const cvElement = document.querySelector(".cv-paper") as HTMLElement

      if (!cvElement) {
        throw new Error("CV element not found")
      }

      // Add a temporary class for PDF generation
      cvElement.classList.add("pdf-mode")

      // A4 dimensions in mm
      const a4Width = 210
      const a4Height = 297

      // Create PDF with A4 dimensions
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const canvas = await html2canvas(cvElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Allow loading cross-origin images
        logging: false,
        windowWidth: 1000, // Fixed width for consistent rendering
        onclone: (document) => {
          // Additional modifications to the cloned document before rendering
          const clonedElement = document.querySelector(".cv-paper") as HTMLElement
          if (clonedElement) {
            // Ensure skills don't wrap in the PDF
            const skillsGrid = clonedElement.querySelector(".skills-grid") as HTMLElement
            if (skillsGrid) {
              skillsGrid.style.display = "grid"
              skillsGrid.style.gridTemplateColumns = "repeat(4, 1fr)"
            }

            // Add link annotations for PDF
            const links = clonedElement.querySelectorAll("a")
            links.forEach((link) => {
              // Add a special class to identify links in the PDF
              link.classList.add("pdf-link")
              // Store the href as a data attribute
              link.setAttribute("data-href", link.getAttribute("href") || "")
              // Add a visual indicator for links
              if (!link.querySelector(".link-indicator")) {
                const indicator = document.createElement("span")
                indicator.className = "link-indicator"
                indicator.textContent = " 🔗"
                link.appendChild(indicator)
              }
            })
          }
        },
      })

      // Remove the temporary class
      cvElement.classList.remove("pdf-mode")

      const imgData = canvas.toDataURL("image/jpeg", 1.0)

      // Calculate scaling to fit on A4
      const imgWidth = a4Width
      const imgHeight = (canvas.height * a4Width) / canvas.width

      // Add image to PDF, scaling to fit on A4
      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, Math.min(imgHeight, a4Height))

      // Add clickable links to the PDF
      // This requires finding all links in the document and adding them to the PDF
      const links = cvElement.querySelectorAll("a")
      links.forEach((link) => {
        const href = link.getAttribute("href")
        if (!href) return

        // Get the position of the link in the document
        const rect = link.getBoundingClientRect()
        const cvRect = cvElement.getBoundingClientRect()

        // Calculate the position in the PDF
        const x = (rect.left - cvRect.left) * (imgWidth / cvRect.width)
        const y = (rect.top - cvRect.top) * (imgHeight / cvRect.height)
        const width = rect.width * (imgWidth / cvRect.width)
        const height = rect.height * (imgHeight / cvRect.height)

        // Add a clickable link annotation to the PDF
        pdf.link(x, y, width, height, { url: href })
      })

      // Save the PDF
      pdf.save("joseph-monakedi-cv.pdf")
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("There was an error generating the PDF. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <button className="download-button" onClick={generatePDF} disabled={isGenerating}>
      <i className="fas fa-download"></i>
      {isGenerating ? "Generating PDF..." : "Download CV"}
    </button>
  )
}
