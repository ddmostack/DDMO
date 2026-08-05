"use client";

import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/Button";
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

  const inputClasses =
    "min-h-12 w-full rounded-md border border-dd-gray-300 bg-dd-offwhite px-4 py-3 text-sm font-medium text-dd-ink outline-none transition-[border-color,box-shadow] placeholder:text-dd-gray-600/80 focus:border-dd-navy focus:ring-4 focus:ring-dd-navy/10";

  return (
    <section id="contact" className="bg-dd-offwhite">
      <div className="page-container section-space">
        <div className="grid overflow-hidden rounded-md border border-dd-gray-300 lg:grid-cols-[0.8fr_1.2fr]">
          <ScrollReveal>
            <div className="h-full bg-dd-navy p-7 text-white md:p-10 lg:p-12">
              <p className="text-sm font-bold text-white/70">Start a project</p>
              <h2 className="mt-7 text-balance text-5xl font-extrabold leading-[0.94] tracking-[-0.06em] text-white md:text-6xl">
                Make the next move count.
              </h2>
              <p className="mt-6 max-w-[510px] text-base font-medium leading-relaxed text-white/75 md:text-lg">
                Tell us what you are working toward. We will help turn it into a clear next move.
              </p>

            <address className="mt-12 space-y-5 not-italic">
              <a
                href={`mailto:${footerDetails.email}`}
                className="flex items-center gap-3 text-sm font-bold text-white transition-colors hover:text-white/70"
              >
                <span className="grid h-10 w-10 place-items-center rounded-md border border-white/25 text-white">
                  <Mail size={18} aria-hidden="true" />
                </span>
                {footerDetails.email}
              </a>
              <a
                href={`tel:${footerDetails.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-sm font-bold text-white transition-colors hover:text-white/70"
              >
                <span className="grid h-10 w-10 place-items-center rounded-md border border-white/25 text-white">
                  <Phone size={18} aria-hidden="true" />
                </span>
                {footerDetails.phone}
              </a>
              <p className="flex items-center gap-3 text-sm font-bold text-white">
                <span className="grid h-10 w-10 place-items-center rounded-md border border-white/25 text-white">
                  <MapPin size={18} aria-hidden="true" />
                </span>
                {footerDetails.city}
              </p>
            </address>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <form
              className="h-full bg-dd-offwhite p-7 sm:p-10 lg:p-12"
              noValidate
              onSubmit={handleSubmit}
            >
              <div className="grid gap-6 sm:grid-cols-2">
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
                    className={`${inputClasses} ${errors.name ? "border-dd-orange focus:border-dd-orange focus:ring-dd-orange/10" : ""}`}
                    placeholder="Your name"
                  />
                  {errors.name ? (
                    <p id="name-error" className="text-sm font-medium text-[#B52E00]">
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
                    className={`${inputClasses} ${errors.email ? "border-dd-orange focus:border-dd-orange focus:ring-dd-orange/10" : ""}`}
                    placeholder="you@company.com"
                  />
                  {errors.email ? (
                    <p id="email-error" className="text-sm font-medium text-[#B52E00]">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-6 space-y-2">
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
                  className={`${inputClasses} ${errors.projectType ? "border-dd-orange focus:border-dd-orange focus:ring-dd-orange/10" : ""}`}
                >
                  <option value="">Choose a project type</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.projectType ? (
                  <p id="project-type-error" className="text-sm font-medium text-[#B52E00]">
                    {errors.projectType}
                  </p>
                ) : null}
              </div>

              <div className="mt-6 space-y-2">
                <label className="block text-sm font-bold text-dd-ink" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={fields.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : "message-helper"}
                  className={`${inputClasses} resize-y ${errors.message ? "border-dd-orange focus:border-dd-orange focus:ring-dd-orange/10" : ""}`}
                  placeholder="What are you building, and what does success look like?"
                />
                <p id="message-helper" className="text-sm font-medium text-dd-gray-600">
                  Include your goal, timeline, and any useful context.
                </p>
                {errors.message ? (
                  <p id="message-error" className="text-sm font-medium text-[#B52E00]">
                    {errors.message}
                  </p>
                ) : null}
              </div>

              <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-[38ch] text-xs font-medium leading-relaxed text-dd-gray-600">
                  We only use your details to respond to this enquiry.
                </p>
                <Button type="submit" className="w-full sm:w-auto">
                  Send Enquiry <ArrowUpRight className="ml-2" size={17} aria-hidden="true" />
                </Button>
              </div>

              <div aria-live="polite">
                {status === "ready" ? (
                    <p className="mt-5 rounded-md border border-dd-navy/20 bg-dd-navy/[0.05] px-4 py-3 text-sm font-bold text-dd-navy">
                    Your message is ready. Delivery will be enabled when the contact endpoint is connected.
                  </p>
                ) : null}
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
