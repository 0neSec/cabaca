import React from 'react';
import Navbar from "@/components/navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Transform Your Business Digital Presence</h1>
              <p className="text-xl text-gray-600 mb-8">Innovative solutions for modern businesses. Start your journey with us today.</p>
              <Link href="/services" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Get Started
              </Link>
            </div>
            <div className="md:w-1/2">
              <img src="/api/placeholder/600/400" alt="Hero" className="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {title: "Web Development", desc: "Custom websites built for your success"},
              {title: "Digital Marketing", desc: "Reach your target audience effectively"},
              {title: "Cloud Solutions", desc: "Scalable and secure infrastructure"}
            ].map((service, i) => (
              <div key={i} className="p-6 border rounded-lg hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img src="/api/placeholder/500/300" alt="About Us" className="rounded-lg" />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">About Us</h2>
              <p className="text-gray-600 mb-6">
                We're a team of passionate professionals dedicated to delivering exceptional digital solutions. With years of experience and a commitment to innovation, we help businesses thrive in the digital age.
              </p>
              <Link href="/about" className="text-blue-600 hover:text-blue-700 font-semibold">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss how we can help transform your business.
          </p>
          <Link href="/contact" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}