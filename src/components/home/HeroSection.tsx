import Link from 'next/link'
import React from 'react'

export default function HeroSection() {
  return (
    <div className="bg-gray-900 py-24">
      <div className=" mx-auto px-6 text-center text-white">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 max-w-4xl mx-auto leading-tight tracking-tight text-white">
          Collect Customer Testimonials <span className="text-indigo-500">Effortlessly</span>
        </h1>

        <p className="text-white text-lg md:text-xl mb-12 max-w-2xl mx-auto">
          No need for complex tools. Easily collect both text and video testimonials from your customers, 
          all in one place, without requiring any developer skills.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
          <Link
            href="/dashboard"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-10 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg"
          >
            Try FREE now
          </Link>
          <Link
            href="/talk-to-us"
            className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-10 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg flex items-center"
          >
            Talk to us
          </Link>
        </div>

        <p className="text-gray-400 text-base md:text-lg mb-12">
          Start with free credits on us.{' '}
          <Link href="/pricing" className="text-indigo-400 hover:text-indigo-300 underline transition-colors">
            See our pricing →
          </Link>
        </p>

        <div className="relative mt-12">
          <p className="text-gray-300 text-sm">
            Trusted by <span className="font-semibold text-indigo-400">Chris Lema</span>
          </p>
         
        </div>
      </div>
    </div>
  )
}
