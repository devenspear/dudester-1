"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="hero-wrap">
      <div className="container-max pt-10 pb-6">
        <motion.h1
          className="h1"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Wisdom-coded. <span className="text-base-accent">AI-fueled.</span>
        </motion.h1>
        <motion.p
          className="p-lead max-w-2xl mt-3"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Four RTP founders vibecoding useful software—playful, insightful, relentlessly shipping.
        </motion.p>
        <motion.div
          className="mt-6 flex gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Link href="/agenda" className="btn btn-accent">View Agenda</Link>
          <Link href="/about" className="btn">Meet the Founders</Link>
          <Link href="/discuss" className="btn btn-ghost">Open Discussion</Link>
        </motion.div>
        <div className="mt-8 overflow-hidden rounded-3xl border border-base-border">
          <img src="/images/hero-glow.svg" alt="Dudester hex fusion visual" className="w-full" />
        </div>
      </div>
    </div>
  );
}


