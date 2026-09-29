"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { contact, site } from "@/data/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { MilkSplash } from "@/components/ui/MilkSplash";
import { cn } from "@/lib/cn";

type Fields = {
  name: string;
  phone: string;
  address: string;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

export function Contact() {
  const [fields, setFields] = useState<Fields>({
    name: "",
    phone: "",
    address: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [shake, setShake] = useState(false);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!fields.name.trim()) e.name = "Please enter your name.";
    if (!fields.phone.trim() || fields.phone.replace(/\D/g, "").length < 10)
      e.phone = "Enter a valid phone number.";
    if (!fields.address.trim()) e.address = "We need your delivery area.";
    return e;
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      setShake(true);
      setStatus("error");
      window.setTimeout(() => setShake(false), 500);
      return;
    }
    // Front-end only success — wire to form backend later
    setStatus("success");
  };

  const wa = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}`;

  const rows = [
    { icon: MessageCircle, label: "WhatsApp", value: site.whatsapp, href: wa },
    { icon: Phone, label: "Phone", value: site.phone, href: `tel:${site.phone}` },
    { icon: MapPin, label: "Address", value: site.address },
    { icon: Clock, label: "Hours", value: site.hours },
  ];

  return (
    <section id="contact" className="section-pad bg-cream">
      <div className="container-site">
        <div className="overflow-hidden rounded-[40px] border border-gold/20 shadow-[0_24px_80px_rgba(27,23,18,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left dark panel */}
            <div className="relative overflow-hidden bg-ink px-8 py-12 sm:px-12 sm:py-14">
              <MilkSplash
                className="pointer-events-none absolute -bottom-16 -right-10 w-72 text-gold opacity-10"
                fill="currentColor"
              />
              <div className="relative z-[1]">
                <Eyebrow>{contact.eyebrow}</Eyebrow>
                <h2 className="display-h2 text-milk">{contact.heading}</h2>
                <p className="mt-4 max-w-sm text-silver">{contact.copy}</p>

                <ul className="mt-10 space-y-5">
                  {rows.map((row) => (
                    <li key={row.label} className="flex items-start gap-4">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                        <row.icon className="size-4" strokeWidth={1.75} />
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-gold">
                          {row.label}
                        </p>
                        {row.href ? (
                          <a
                            href={row.href}
                            className="text-milk transition hover:text-gold"
                          >
                            {row.value}
                          </a>
                        ) : (
                          <p className="text-milk">{row.value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                <Button href={wa} className="mt-10" showArrow={false}>
                  <MessageCircle className="size-4" />
                  Chat on WhatsApp
                </Button>
              </div>
            </div>

            {/* Right form panel */}
            <div className="bg-milk px-8 py-12 sm:px-12 sm:py-14">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    data-testid="contact-success"
                    className="flex min-h-[360px] flex-col items-center justify-center text-center"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.span
                      className="mb-6 flex size-20 items-center justify-center rounded-full bg-[linear-gradient(135deg,#9A7B2F,#E8C877_45%,#C9A24B_70%,#F3DC9B)] text-ink"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 18,
                      }}
                    >
                      <Check className="size-9" strokeWidth={2.5} />
                    </motion.span>
                    <p className="font-display text-3xl text-text-dark">
                      {contact.formSuccess}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    className={cn("space-y-5", shake && "animate-shake")}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {(
                      [
                        ["name", "Name", "text"],
                        ["phone", "Phone", "tel"],
                        ["address", "Address / Area", "text"],
                      ] as const
                    ).map(([key, label, type]) => (
                      <label key={key} className="group relative block">
                        <input
                          type={type}
                          name={key}
                          value={fields[key]}
                          onChange={(e) =>
                            setFields((f) => ({ ...f, [key]: e.target.value }))
                          }
                          placeholder=" "
                          className={cn(
                            "peer h-14 w-full rounded-2xl border bg-cream/40 px-5 pt-4 text-text-dark outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30",
                            errors[key] ? "border-red-400" : "border-[#d9d0bf]",
                          )}
                        />
                        <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-sm text-text-dark/45 transition-all peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:text-gold peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[11px]">
                          {label}
                        </span>
                        {errors[key] && (
                          <span
                            data-testid={`error-${key}`}
                            className="mt-1 block text-xs text-red-600"
                          >
                            {errors[key]}
                          </span>
                        )}
                      </label>
                    ))}

                    <label className="relative block">
                      <textarea
                        value={fields.message}
                        onChange={(e) =>
                          setFields((f) => ({ ...f, message: e.target.value }))
                        }
                        placeholder=" "
                        rows={3}
                        className="peer w-full resize-none rounded-2xl border border-[#d9d0bf] bg-cream/40 px-5 pb-3 pt-6 text-text-dark outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
                      />
                      <span className="pointer-events-none absolute left-5 top-4 text-sm text-text-dark/45 transition-all peer-focus:top-2.5 peer-focus:text-[11px] peer-focus:text-gold peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[11px]">
                        Message (optional)
                      </span>
                    </label>

                    <Button type="submit" className="w-full" showArrow={false}>
                      Request Free Sample
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
