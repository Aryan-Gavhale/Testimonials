import React from 'react';
import { Star, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: "John Doe",
    profession: "Web Developer",
    stars: 5,
    description: "This is an amazing service! It has transformed the way I showcase my work."
  },
  {
    name: "Jane Smith",
    profession: "Graphic Designer",
    stars: 4,
    description: "I love the ease of use and the design options available. Highly recommended!"
  },
  {
    name: "Emily Johnson",
    profession: "Content Writer",
    stars: 5,
    description: "A game-changer for my website. The testimonials have boosted my credibility."
  },
  {
    name: "Michael Brown",
    profession: "SEO Specialist",
    stars: 5,
    description: "TrustWords made adding testimonials effortless and beautiful!"
  },
  {
    name: "Sarah Wilson",
    profession: "Marketing Manager",
    stars: 4,
    description: "Our customer feedback has never looked better on our site."
  },
  {
    name: "David Miller",
    profession: "Business Analyst",
    stars: 5,
    description: "An intuitive tool that saved us hours of work. Highly recommended!"
  },
  {
    name: "Laura Davis",
    profession: "Social Media Manager",
    stars: 4,
    description: "Visually stunning testimonials that match our brand perfectly."
  },
  {
    name: "Daniel Garcia",
    profession: "Entrepreneur",
    stars: 5,
    description: "Easy to use and effective. My clients love the new look!"
  },
  {
    name: "Sophia Martinez",
    profession: "Product Designer",
    stars: 5,
    description: "This tool has elevated our website's credibility. Love it!"
  },
];

export default function MidSection() {
  return (
    <section className="bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Elevate Your Website with TrustWords!
        </h2>
        <p className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed">
          Enhance your online presence effortlessly. With TrustWords, you can add captivating testimonials to your website without any coding skills! 
          Simply copy and paste our HTML code to integrate the Wall Of Love seamlessly into your site. 
          Whether you're using Webflow, WordPress, or any no-code platform, we've got you covered!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 border border-gray-700 hover:border-gray-600"
            >
              <div className="flex items-center mb-4">
                <div className="mr-3">
                  <div 
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold"
                  >
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                  <p className="text-sm text-gray-400">{testimonial.profession}</p>
                </div>
              </div>
              <div className="mb-4 flex justify-center">
                {[...Array(5)].map((_, starIndex) => (
                  <Star 
                    key={starIndex} 
                    className={`w-5 h-5 ${starIndex < testimonial.stars ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                  />
                ))}
              </div>
              <p className="text-gray-300 italic">&ldquo;{testimonial.description}&rdquo;</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <a 
            href="#" 
            className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-300 ease-in-out"
          >
            Try TrustWords Now
            <ChevronRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}