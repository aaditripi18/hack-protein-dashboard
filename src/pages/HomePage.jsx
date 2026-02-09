import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight, Dna, Microscope, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

function HomePage() {
  return (
    <>
      <Helmet>
        <title>ProteinLab - Advanced Protein Structure Analysis for Rare Disease Research</title>
        <meta
          name="description"
          content="ProteinLab provides cutting-edge 3D protein structure visualization and mutation analysis tools for rare disease research. Analyze pathogenicity scores, identify spatial hotspots, and explore clinical variants."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1638258581353-0ab658542e73"
              alt="Protein molecular structure visualization showing interconnected atoms and molecules"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/80 to-slate-900/80"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Logo */}
              <div className="flex justify-center mb-8">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl">
                  <Dna className="h-16 w-16 text-white" />
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                ProteinLab
              </h1>

              <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto">
                Advanced Protein Structure Analysis for Rare Disease Research
              </p>

              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Visualize 3D protein structures, analyze mutations with AlphaMissense pathogenicity
                scores, identify spatial hotspots, and explore clinical significance—all in one
                powerful platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Link to="/dashboard">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg shadow-2xl hover:shadow-blue-500/50 transition-all"
                  >
                    Launch Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg backdrop-blur-sm"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2 text-white/60">
              <span className="text-sm">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ArrowRight className="h-5 w-5 rotate-90" />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">Powerful Features</h2>
              <p className="text-xl text-gray-300">
                Everything you need for comprehensive protein mutation analysis
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Microscope,
                  title: '3D Visualization',
                  description:
                    'Interactive Three.js-powered 3D protein structures with pLDDT confidence coloring',
                  color: 'from-blue-500 to-cyan-500',
                },
                {
                  icon: TrendingUp,
                  title: 'Pathogenicity Scores',
                  description:
                    'AlphaMissense pathogenicity predictions for clinical variant interpretation',
                  color: 'from-purple-500 to-pink-500',
                },
                {
                  icon: Dna,
                  title: 'Spatial Hotspots',
                  description:
                    'Identify mutation clusters and functional pocket synergy effects',
                  color: 'from-orange-500 to-red-500',
                },
                {
                  icon: Users,
                  title: 'Clinical Context',
                  description:
                    'Integrated disease associations and research database links',
                  color: 'from-green-500 to-emerald-500',
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all shadow-xl hover:shadow-2xl"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-900 to-slate-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold text-white">Ready to Start Analyzing?</h2>
              <p className="text-xl text-gray-300">
                Explore protein structures for TP53, BRCA1, ALS2, and other rare disease genes
              </p>
              <Link to="/dashboard">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-lg shadow-2xl hover:shadow-blue-500/50 transition-all"
                >
                  Open Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePage;