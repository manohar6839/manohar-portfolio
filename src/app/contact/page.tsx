import { Metadata } from "next"
import { ContactForm } from "./ContactForm"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Manohar Gupta.",
}

export default function ContactPage() {
  return <ContactForm />
}
