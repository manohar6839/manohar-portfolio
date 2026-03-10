import { Metadata } from "next"
import Link from "next/link"
import { GraduationCap, Award, Briefcase, Building2, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume of Manohar Gupta — Renewable Energy Project Finance professional.",
}

const experience = [
  {
    company: "ReNew",
    role: "Manager",
    period: "Aug 2023 – Present",
    location: "Gurugram, India",
    description: [
      "Leading project finance for utility-scale solar projects (50MW-300MW)",
      "Conducting technical due diligence and financial modeling",
      "Managing relationships with lenders and equity investors",
      "Developing financial models for project finance transactions",
    ],
  },
  {
    company: "PwC",
    role: "Associate",
    period: "Dec 2021 – Jul 2023",
    location: "Gurugram, India",
    description: [
      "Due diligence for renewable energy project finance",
      "Financial analysis and modeling for solar and wind projects",
      "Preparation of information memorandums for lenders",
      "Risk assessment and mitigation strategy development",
    ],
  },
  {
    company: "Thomson Reuters",
    role: "Senior Finance Analyst",
    period: "Nov 2020 – Dec 2021",
    location: "Gurugram, India",
    description: [
      "Financial analysis and reporting",
      "Budget forecasting and variance analysis",
      "Process improvement and automation",
    ],
  },
  {
    company: "Reserve Bank of India",
    role: "Summer Intern",
    period: "Apr 2019 – May 2019",
    location: "Mumbai, India",
    description: [
      "Banking sector research and analysis",
      "Policy impact assessment",
    ],
  },
]

const education = [
  {
    institution: "IIM Rohtak",
    degree: "MBA, Finance & Analytics",
    period: "2018-2020",
    details: ["Grade: 8.26/10", "Rank #3", "Gold Medal: Best All Round Performance", "OPJEM Scholarship"],
  },
  {
    institution: "IIT Roorkee",
    degree: "B.Tech, Mechanical Engineering",
    period: "2010-2014",
    details: [],
  },
]

const skillGroups = [
  {
    category: "Solar & Energy",
    skills: ["PVsyst", "AutoCAD", "Helioscope", "Solar Resource Assessment", "Energy Yield Prediction"],
  },
  {
    category: "Finance",
    skills: ["Financial Modeling", "Project Finance", "Due Diligence", "FP&A", "Valuation"],
  },
  {
    category: "Technical",
    skills: ["Python", "SQL", "TypeScript", "React", "Arduino/ESP32"],
  },
  {
    category: "Data",
    skills: ["Pandas", "Excel", "Power BI", "SAS", "Data Analysis"],
  },
]

export default function ResumePage() {
  return (
    <div className="container py-12 max-w-4xl">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-heading font-bold mb-2">Manohar Gupta</h1>
        <p className="text-xl text-muted-foreground mb-4">
          Renewable Energy Project Finance Professional
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span>Gurugram, India</span>
          <span>•</span>
          <a href="mailto:manohar@example.com" className="hover:text-primary">manohar@example.com</a>
          <span>•</span>
          <a href="https://linkedin.com/in/manohar-gupta" target="_blank" rel="noopener noreferrer" className="hover:text-primary">LinkedIn</a>
        </div>
      </div>

      {/* About */}
      <section className="mb-12">
        <h2 className="text-2xl font-heading font-bold mb-4">About</h2>
        <p className="text-muted-foreground leading-relaxed">
          A Manager at ReNew specializing in project finance for utility-scale renewable energy projects.
          I bring together technical knowledge (IIT Roorkee engineering background) and financial expertise
          (IIM Rohtak gold medalist) to structure deals that make clean energy projects economically viable.
          Beyond finance, I&apos;m a builder at heart — creating IoT projects, web applications, and tools
          that bridge the gap between technology and sustainability.
        </p>
      </section>

      {/* Experience */}
      <section className="mb-12">
        <h2 className="text-2xl font-heading font-bold mb-6">Experience</h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border md:left-4" />

          <div className="space-y-8">
            {experience.map((job, index) => (
              <div key={index} className="relative pl-8 md:pl-12">
                {/* Timeline dot */}
                <div className="absolute left-[-4px] md:left-2 top-1 w-2 h-2 rounded-full bg-primary" />
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-2">
                  <div>
                    <h3 className="font-heading font-semibold text-lg">{job.role}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                      <span>{job.company}</span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      <span>{job.period}</span>
                    </div>
                    <span className="ml-6">{job.location}</span>
                  </div>
                </div>
                <ul className="space-y-1 text-muted-foreground">
                  {job.description.map((item, i) => (
                    <li key={i} className="list-disc list-inside">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mb-12">
        <h2 className="text-2xl font-heading font-bold mb-6">Education</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu, index) => (
            <div key={index} className="border rounded-xl p-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold">{edu.degree}</h3>
                  <p className="text-muted-foreground">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">{edu.period}</p>
                </div>
              </div>
              {edu.details.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {edu.details.map((detail, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {detail}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-12">
        <h2 className="text-2xl font-heading font-bold mb-6">Skills & Tools</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {skillGroups.map((group, index) => (
            <div key={index} className="border rounded-xl p-6">
              <h3 className="font-heading font-semibold mb-3">{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, i) => (
                  <Badge key={i} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Download */}
      <section>
        <Link
          href="/manohar-gupta-resume.pdf"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <Download className="h-4 w-4" />
          Download PDF Resume
        </Link>
        <p className="text-sm text-muted-foreground mt-2">
          (PDF coming soon)
        </p>
      </section>
    </div>
  )
}
