import cvData from "@/data/cv-data.json"

export function CVContent() {
  return (
    <div>
      <section id="about" className="cv-section">
        <div className="profile-header">
          <div className="profile-image">
            <img
              src={cvData.profile.image || "/placeholder.svg"}
              alt={cvData.profile.name}
              width={100}
              height={100}
            />
          </div>
          <div className="profile-info">
            <h1>{cvData.profile.name}</h1>
            <h2>{cvData.profile.title}</h2>
            <p className="location">
              <i className="fas fa-map-marker-alt"></i> {cvData.profile.location}
            </p>
          </div>
        </div>
        <div className="about-text">
          <p>{cvData.profile.about}</p>
        </div>
      </section>

      <section id="contact" className="cv-section">
        <h3>
          <i className="fas fa-envelope"></i> Contact
        </h3>
        <div className="contact-grid">
          {cvData.contact.map((item, index) => (
            <div key={index} className="contact-item">
              <i className={item.icon}></i>
              {item.link ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.value}
                </a>
              ) : (
                <p>{item.value}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="skills" className="cv-section">
        <h3>
          <i className="fas fa-code"></i> Skills
        </h3>
        <div className="skills-grid">
          {cvData.skills.map((category, index) => (
            <div key={index} className="skill-category">
              <h4>{category.category}</h4>
              <ul className="skill-list">
                {category.items.map((skill, skillIndex) => (
                  <li key={skillIndex}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="cv-section">
        <h3>
          <i className="fas fa-laptop-code"></i> Projects
        </h3>
        <div className="projects-container">
          {cvData.projects.map((project, index) => (
            <div key={index} className="project-card">
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              <div className="project-links">
                {project.links.map((link, linkIndex) => (
                  <a key={linkIndex} href={link.url} target="_blank" rel="noopener noreferrer" className="project-link">
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="education" className="cv-section">
        <h3>
          <i className="fas fa-graduation-cap"></i> Education
        </h3>
        <div className="education-container">
          {cvData.education.map((edu, index) => (
            <div key={index} className="education-item">
              <div className="education-date">{edu.period}</div>
              <div className="education-details">
                <h4>{edu.degree}</h4>
                <p>{edu.institution}</p>
                {edu.status && (
                  <p className="education-status">{String(edu.status)}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="certifications" className="cv-section">
        <h3>
          <i className="fas fa-award"></i> Certifications
        </h3>
        <div className="certifications-container">
          {cvData.certifications.map((cert, index) => (
            <div key={index} className="certification-item">
              <div className="certification-details">
                <h4>{cert.title}</h4>
                <p>
                  <a href={cert.link} target="_blank" rel="noopener noreferrer">
                    View Certification
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="interests" className="cv-section">
        <h3>
          <i className="fas fa-heart"></i> Interests
        </h3>
        <p>{cvData.interests.join(", ")}</p>
      </section>
    </div>
  )
}
