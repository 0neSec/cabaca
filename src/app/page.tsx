import React from 'react';
import Navbar from '@/components/navbar/navbar';
import HeroBanner from '@/components/navbar/banner';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section id="home">
        <HeroBanner />
      </section>

      {/* Services Preview */}
      <section id="services" className="py-16 scroll-mt-16">
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
      <section id="about" className="py-16 bg-gray-50 scroll-mt-16">
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
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-16 scroll-mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss how we can help transform your business.
          </p>
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
}