"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AlertCircle, ArrowUpRight, CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { type FormEvent, useState } from "react";

import { HeroParticles } from "@/components/effects/HeroParticles";
import { Button } from "@/components/ui/Button";
import { CursorTiltCard } from "@/components/ui/CursorTiltCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { budgetRanges, footerDetails, projectTypes } from "@/lib/constants";

type ContactFields = {
  budget: string;
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
  budget: "",
  message: "",
};

function validate(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};

  if (fields.name.trim().length < 2) {
    errors.name = "Please enter your name (at least 2 characters).";
  }

  if (!/^\S+@\S+\.\S+$/.test(fields.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!fields.projectType) {
    errors.projectType = "Please select a project category.";
  }

  if (!fields.budget) {
    errors.budget = "Please select an estimated budget.";
  }

  if (fields.message.trim().length < 15) {
    errors.message = "Please share a bit more detail (at least 15 characters).";
  }

  return errors;
}

export function Contact() {
  const reduceMotion = useReducedMotion();
  const [fields, setFields] = useState<ContactFields>(initialFields);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [focused, setFocused] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<ContactErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleBlur = (field: keyof ContactFields) => {
    setFocused((prev) => ({ ...prev, [field]: false }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    const currentErrors = validate(fields);
    setErrors((prev) => ({ ...prev, [field]: currentErrors[field] }));
  };

  const handleFocus = (field: keyof ContactFields) => {
    setFocused((prev) => ({ ...prev, [field]: true }));
  };

  const updateField = (field: keyof ContactFields, value: string) => {
    const updated = { ...fields, [field]: value };
    setFields(updated);
    if (touched[field]) {
      const currentErrors = validate(updated);
      setErrors((prev) => ({ ...prev, [field]: currentErrors[field] }));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const allTouched = { name: true, email: true, projectType: true, budget: true, message: true };
    setTouched(allTouched);
    const nextErrors = validate(fields);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setFields(initialFields);
    setTouched({});
    setFocused({});
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="contact-section-bg relative py-16 md:py-24 xl:py-32 overflow-hidden">
      {/* Animated Hero Canvas Particles Background Bookend */}
      <HeroParticles />

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
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-dd-navy">
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

              {/* Right Frosted Form Panel or Animated Success View */}
              <div className="flex flex-col justify-center p-3 sm:p-6 lg:p-8">
                {isSubmitted ? (
                  /* Animated SVG Checkmark Success State */
                  <motion.div
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center justify-center p-6 text-center"
                  >
                    <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 shadow-md">
                      <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                        <motion.path
                          d="M5 13l4 4L19 7"
                          initial={reduceMotion ? false : { pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                        />
                      </svg>
                    </div>

                    <h3 className="text-3xl font-extrabold tracking-[-0.04em] text-dd-ink">
                      Message Received!
                    </h3>
                    <p className="mt-3 max-w-[400px] text-base font-medium leading-relaxed text-dd-gray-600">
                      Thank you, <span className="font-bold text-dd-ink">{fields.name}</span>. We have received your enquiry for <span className="font-bold text-dd-navy">{fields.projectType}</span> ({fields.budget}) and will be in touch within 24 hours.
                    </p>

                    <Button variant="outline" className="mt-8" onClick={handleReset} magnetic={true}>
                      Send Another Enquiry
                    </Button>
                  </motion.div>
                ) : (
                  /* Clean Non-Overlapping Interactive Form */
                  <form noValidate onSubmit={handleSubmit} className="space-y-5">
                    {/* Row 1: Name & Email */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      {/* Name Field */}
                      <div>
                        <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-dd-gray-600 mb-1.5">
                          Your Name
                        </label>
                        <div className="relative overflow-hidden rounded-xl border border-dd-gray-300/80 bg-white/40 focus-within:border-dd-navy">
                          <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            value={fields.name}
                            onFocus={() => handleFocus("name")}
                            onBlur={() => handleBlur("name")}
                            onChange={(e) => updateField("name", e.target.value)}
                            placeholder="e.g. Sarah Jenkins"
                            className="w-full bg-transparent px-4 py-3 text-sm font-bold text-dd-ink outline-none"
                          />
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-dd-navy"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: focused.name ? 1 : 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                          />
                        </div>
                        {touched.name && (
                          <div className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold">
                            {errors.name ? (
                              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 text-amber-600">
                                <AlertCircle size={13} /> {errors.name}
                              </motion.span>
                            ) : (
                              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 text-emerald-600">
                                <CheckCircle2 size={13} /> Looks good
                              </motion.span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Email Field */}
                      <div>
                        <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-dd-gray-600 mb-1.5">
                          Email Address
                        </label>
                        <div className="relative overflow-hidden rounded-xl border border-dd-gray-300/80 bg-white/40 focus-within:border-dd-navy">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={fields.email}
                            onFocus={() => handleFocus("email")}
                            onBlur={() => handleBlur("email")}
                            onChange={(e) => updateField("email", e.target.value)}
                            placeholder="you@company.com"
                            className="w-full bg-transparent px-4 py-3 text-sm font-bold text-dd-ink outline-none"
                          />
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-dd-navy"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: focused.email ? 1 : 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                          />
                        </div>
                        {touched.email && (
                          <div className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold">
                            {errors.email ? (
                              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 text-amber-600">
                                <AlertCircle size={13} /> {errors.email}
                              </motion.span>
                            ) : (
                              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 text-emerald-600">
                                <CheckCircle2 size={13} /> Valid email format
                              </motion.span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Project Category & Estimated Budget */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      {/* Project Category */}
                      <div>
                        <label htmlFor="projectType" className="block text-xs font-bold uppercase tracking-wider text-dd-gray-600 mb-1.5">
                          Project Category
                        </label>
                        <div className="relative overflow-hidden rounded-xl border border-dd-gray-300/80 bg-white/40 focus-within:border-dd-navy">
                          <select
                            id="projectType"
                            name="projectType"
                            value={fields.projectType}
                            onFocus={() => handleFocus("projectType")}
                            onBlur={() => handleBlur("projectType")}
                            onChange={(e) => updateField("projectType", e.target.value)}
                            className="w-full bg-transparent px-4 py-3 text-sm font-bold text-dd-ink outline-none cursor-pointer"
                          >
                            <option value="" disabled hidden>
                              Select category...
                            </option>
                            {projectTypes.map((type) => (
                              <option key={type} value={type} className="bg-white text-dd-ink">
                                {type}
                              </option>
                            ))}
                          </select>
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-dd-navy"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: focused.projectType ? 1 : 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                          />
                        </div>
                        {touched.projectType && (
                          <div className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold">
                            {errors.projectType ? (
                              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 text-amber-600">
                                <AlertCircle size={13} /> {errors.projectType}
                              </motion.span>
                            ) : (
                              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 text-emerald-600">
                                <CheckCircle2 size={13} /> Category selected
                              </motion.span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Estimated Budget */}
                      <div>
                        <label htmlFor="budget" className="block text-xs font-bold uppercase tracking-wider text-dd-gray-600 mb-1.5">
                          Estimated Budget
                        </label>
                        <div className="relative overflow-hidden rounded-xl border border-dd-gray-300/80 bg-white/40 focus-within:border-dd-navy">
                          <select
                            id="budget"
                            name="budget"
                            value={fields.budget}
                            onFocus={() => handleFocus("budget")}
                            onBlur={() => handleBlur("budget")}
                            onChange={(e) => updateField("budget", e.target.value)}
                            className="w-full bg-transparent px-4 py-3 text-sm font-bold text-dd-ink outline-none cursor-pointer"
                          >
                            <option value="" disabled hidden>
                              Select budget range...
                            </option>
                            {budgetRanges.map((range) => (
                              <option key={range} value={range} className="bg-white text-dd-ink">
                                {range}
                              </option>
                            ))}
                          </select>
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-dd-navy"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: focused.budget ? 1 : 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                          />
                        </div>
                        {touched.budget && (
                          <div className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold">
                            {errors.budget ? (
                              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 text-amber-600">
                                <AlertCircle size={13} /> {errors.budget}
                              </motion.span>
                            ) : (
                              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 text-emerald-600">
                                <CheckCircle2 size={13} /> Budget selected
                              </motion.span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Message Field */}
                    <div>
                      <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-dd-gray-600 mb-1.5">
                        Project Details & Goals
                      </label>
                      <div className="relative overflow-hidden rounded-xl border border-dd-gray-300/80 bg-white/40 focus-within:border-dd-navy">
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={fields.message}
                          onFocus={() => handleFocus("message")}
                          onBlur={() => handleBlur("message")}
                          onChange={(e) => updateField("message", e.target.value)}
                          placeholder="What are you building, and what does success look like?"
                          className="w-full min-h-[110px] resize-y bg-transparent px-4 py-3 text-sm font-bold text-dd-ink outline-none"
                        />
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-dd-navy"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: focused.message ? 1 : 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                        />
                      </div>
                      {touched.message && (
                        <div className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold">
                          {errors.message ? (
                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 text-amber-600">
                              <AlertCircle size={13} /> {errors.message}
                            </motion.span>
                          ) : (
                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 text-emerald-600">
                              <CheckCircle2 size={13} /> Detailed message
                            </motion.span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="max-w-[34ch] text-xs font-medium leading-relaxed text-dd-gray-600">
                        We respect your privacy and only use details to respond to this enquiry.
                      </p>
                      <Button type="submit" vhsEffect magnetic={true} className="w-full sm:w-auto">
                        Send Enquiry <ArrowUpRight className="ml-2" size={17} aria-hidden="true" />
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
