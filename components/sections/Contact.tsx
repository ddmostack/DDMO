"use client";

import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { type FormEvent, useState } from "react";

import { CursorTiltCard } from "@/components/ui/CursorTiltCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { footerDetails, projectTypes } from "@/lib/constants";

type ContactFields = {
  email: string;
  message: string;
  name: string;
  projectType: string;
};

type ContactErrors = Partial<Record<keyof ContactFields, string>>;

const initialFields: ContactFields = {
  name: "",
  email: "",
  projectType: "",
  message: "",
};

function validate(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};

  if (fields.name.trim().length < 2) {
    errors.name = "Enter your name using at least 2 characters.";
  }

  if (!/^\S+@\S+\.\S+$/.test(fields.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!fields.projectType) {
    errors.projectType = "Choose the type of project you have in mind.";
  }

  if (fields.message.trim().length < 20) {
    errors.message = "Tell us a little more using at least 20 characters.";
  }

  return errors;
}

export function Contact() {
  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<"idle" | "ready">("idle");

  const updateField = (field: keyof ContactFields, value: string) => {
    setFields((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus("idle");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    // TODO: connect the approved email service or API endpoint before launch.
    setStatus("ready");
  };

  return (
    <section id="contact" className="contact-section-bg relative py-16 md:py-24 xl:py-32">
      {/* Decorative blurred background shapes */}
      <div className="contact-floating-blob contact-blob-1" aria-hidden="true" />
      <div className="contact-floating-blob contact-blob-2" aria-hidden="true" />
      <div className="contact-floating-blob contact-blob-3" aria-hidden="true" />

      <div className="page-container relative z-10">
        <ScrollReveal>
          <div className="contact-main-glass-card p-3 sm:p-5 lg:p-7">
            <div className="grid gap-6 lg:grid-cols-[0.4fr_0.6fr]">
              {/* Left Frosted Information Panel */}
              <CursorTiltCard maxTilt={5} magnetic={true} glare={true} className="rounded-[28px]">
                <div className="contact-left-glass-panel flex h-full flex-col justify-between p-6 sm:p-8 lg:p-10">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-dd-gray-600">
                      START A PROJECT
                    </p>
                    <h2 className="mt-4 text-balance text-2xl font-extrabold leading-[1.08] tracking-[-0.04em] text-dd-ink sm:text-3xl lg:text-[2.5rem]">
                      Make the next move count.
                    </h2>
                    <p className="mt-4 max-w-[380px] text-sm font-medium leading-relaxed text-dd-gray-600 md:text-base">
                      Tell us what you are working toward. We will help turn it into a clear next move.
                    </p>
                  </div>

                  <address className="mt-10 space-y-4 not-italic">
                    <a
                      href={`mailto:${footerDetails.email}`}
                      className="group flex items-center gap-3.5 text-sm font-bold text-dd-ink transition-colors hover:text-dd-navy"
                    >
                      <span className="contact-icon-glass-btn">
                        <Mail size={18} aria-hidden="true" />
                      </span>
                      <span className="truncate">{footerDetails.email}</span>
                    </a>
                    <a
                      href={`tel:${footerDetails.phone.replace(/\s/g, "")}`}
                      className="group flex items-center gap-3.5 text-sm font-bold text-dd-ink transition-colors hover:text-dd-navy"
                    >
                      <span className="contact-icon-glass-btn">
                        <Phone size={18} aria-hidden="true" />
                      </span>
                      <span>{footerDetails.phone}</span>
                    </a>
                    <p className="group flex items-center gap-3.5 text-sm font-bold text-dd-ink">
                      <span className="contact-icon-glass-btn">
                        <MapPin size={18} aria-hidden="true" />
                      </span>
                      <span>{footerDetails.city}</span>
                    </p>
                  </address>
                </div>
              </CursorTiltCard>

              {/* Right Frosted Form Panel */}
              <form
                className="p-3 sm:p-6 lg:p-8"
                noValidate
                onSubmit={handleSubmit}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-dd-ink" htmlFor="name">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={fields.name}
                      onChange={(event) => updateField("name", event.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className="contact-frosted-input"
                      placeholder="Your name"
                    />
                    {errors.name ? (
                      <p id="name-error" className="text-xs font-semibold text-[#FF4101]">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-dd-ink" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={fields.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className="contact-frosted-input"
                      placeholder="you@company.com"
                    />
                    {errors.email ? (
                      <p id="email-error" className="text-xs font-semibold text-[#FF4101]">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  <label className="block text-sm font-bold text-dd-ink" htmlFor="project-type">
                    Project Type
                  </label>
                  <select
                    id="project-type"
                    name="projectType"
                    value={fields.projectType}
                    onChange={(event) => updateField("projectType", event.target.value)}
                    aria-invalid={Boolean(errors.projectType)}
                    aria-describedby={errors.projectType ? "project-type-error" : undefined}
                    className="contact-frosted-input"
                  >
                    <option value="">Choose a project type</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.projectType ? (
                    <p id="project-type-error" className="text-xs font-semibold text-[#FF4101]">
                      {errors.projectType}
                    </p>
                  ) : null}
                </div>

                <div className="mt-5 space-y-2">
                  <label className="block text-sm font-bold text-dd-ink" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={fields.message}
                    onChange={(event) => updateField("message", event.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : "message-helper"}
                    className="contact-frosted-input min-h-[130px] resize-y"
                    placeholder="What are you building, and what does success look like?"
                  />
                  <p id="message-helper" className="text-xs font-medium text-dd-gray-600">
                    Include your goal, timeline, and any useful context.
                  </p>
                  {errors.message ? (
                    <p id="message-error" className="text-xs font-semibold text-[#FF4101]">
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-[34ch] text-xs font-medium leading-relaxed text-dd-gray-600">
                    We only use your details to respond to this enquiry.
                  </p>
                  <button type="submit" className="contact-frosted-submit w-full sm:w-auto">
                    Send Enquiry <ArrowUpRight className="contact-submit-arrow ml-2" size={17} aria-hidden="true" />
                  </button>
                </div>

                <div aria-live="polite">
                  {status === "ready" ? (
                    <p className="mt-5 rounded-2xl border border-[#00D9AB]/40 bg-[#00D9AB]/10 p-4 text-sm font-bold text-dd-ink backdrop-blur-sm">
                      Your message is ready. Delivery will be enabled when the contact endpoint is connected.
                    </p>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
