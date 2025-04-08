import React from 'react';
import { Star, Users, Globe, Gift, ArrowRight, Heart } from 'lucide-react';

const features = [
  {
    icon: Star,
    title: "Recognition",
    description: "Get recognized for your outstanding contributions to the open source community"
  },
  {
    icon: Users,
    title: "Community",
    description: "Join an exclusive community of influential open source developers"
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Make a lasting impact on the global developer community"
  },
  {
    icon: Gift,
    title: "Benefits",
    description: "Receive exclusive benefits and opportunities to grow your influence"
  }
];

const stars = [
  {
    name: "Sarah Drasner",
    avatar: "https://github.com/sdras.png",
    role: "VP of Developer Experience",
    company: "Netlify",
    contributions: ["Vue.js", "SVG Animations", "JavaScript"]
  },
  {
    name: "Evan You",
    avatar: "https://github.com/yyx990803.png",
    role: "Creator",
    company: "Vue.js",
    contributions: ["Vue.js", "Vite", "JavaScript"]
  },
  {
    name: "Kent C. Dodds",
    avatar: "https://github.com/kentcdodds.png",
    role: "Educator & Developer",
    company: "Kent C. Dodds Tech LLC",
    contributions: ["React", "Testing", "JavaScript"]
  }
];

export function StarProgram() {
  return (
    <div className="bg-github-dark">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-stars opacity-30" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-github-darker/60 px-4 py-2 rounded-full border border-github-border mb-8">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-github-text-primary text-sm">GitHub Stars Program</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-github-text-primary mb-6">
              Recognizing exceptional contributors in open source
            </h1>
            <p className="text-xl text-github-text-secondary mb-10">
              Join an exclusive community of developers who have made significant impacts in open source software.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-github-accent hover:bg-github-accent/90 text-white rounded-lg transition-colors">
                <Star className="w-5 h-5" />
                <span>Nominate a Star</span>
              </button>
              <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-github-darker hover:bg-github-darker/90 text-github-text-primary border border-github-border rounded-lg transition-colors">
                Learn More
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-github-darker">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-github-dark border border-github-border rounded-lg">
                <feature.icon className="w-10 h-10 text-github-accent mb-4" />
                <h3 className="text-xl font-semibold text-github-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-github-text-secondary">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stars */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-github-text-primary mb-4">
              Meet Our Stars
            </h2>
            <p className="text-xl text-github-text-secondary">
              Exceptional developers making a difference in open source
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stars.map((star, index) => (
              <div key={index} className="bg-github-darker border border-github-border rounded-lg p-6 hover:border-github-accent transition-colors">
                <div className="flex items-start gap-4">
                  <img
                    src={star.avatar}
                    alt={star.name}
                    className="w-16 h-16 rounded-full border-2 border-github-border"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-github-text-primary mb-1">
                      {star.name}
                    </h3>
                    <p className="text-github-text-secondary text-sm mb-2">
                      {star.role} at {star.company}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {star.contributions.map((contribution, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-github-dark text-github-text-secondary text-xs rounded-full"
                        >
                          {contribution}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-github-darker">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Heart className="w-16 h-16 text-github-accent mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-github-text-primary mb-4">
              Ready to recognize excellence?
            </h2>
            <p className="text-xl text-github-text-secondary mb-8">
              Nominate an exceptional developer who's making a difference in open source
            </p>
            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-github-accent hover:bg-github-accent/90 text-white rounded-lg transition-colors text-lg">
              <Star className="w-6 h-6" />
              <span>Nominate a Star</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}