import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Dna,
  Microscope,
  TrendingUp,
  Users,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

function HomePage() {
  return (
    <>
      <Helmet>
        <title>
          ProteinLab - Advanced Protein Structure Analysis for Rare Disease Research
        </title>
        <meta
          name="description"
          content="ProteinLab provides cutting-edge protein structure visualization and mutation analysis tools for rare disease research."
        />
      </Helmet>

      {/* ================= HERO ================= */}
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1638258581353-0ab658542e73"
              alt="Protein molecular visualization"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/80 to-slate-900/80" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex justify-center mb-8">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl">
                  <Dna className="h-16 w-16 text-white" />
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white">
                ProteinLab
              </h1>

              <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto">
                Advanced Protein Structure Analysis for Rare Disease Research
              </p>

              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Explore predicted protein structures, analyze mutations,
                interpret confidence scores, and understand biological impact —
                all in one research-focused platform.
              </p>

              <div className="flex justify-center pt-8">
                <Link to="/dashboard">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-6 text-lg shadow-xl"
                  >
                    Launch Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-white text-center mb-16">
              Platform Capabilities
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Microscope,
                  title: 'Protein Structures',
                  description: 'Predicted 3D protein conformations',
                },
                {
                  icon: TrendingUp,
                  title: 'Pathogenicity',
                  description: 'Mutation impact interpretation',
                },
                {
                  icon: Dna,
                  title: 'Hotspot Analysis',
                  description: 'Spatial clustering of variants',
                },
                {
                  icon: Users,
                  title: 'Clinical Context',
                  description: 'Disease and gene associations',
                },
              ].map((f, i) => (
                <div
                  key={i}
                  className="bg-white/10 border border-white/20 rounded-xl p-6 text-white backdrop-blur-md"
                >
                  <f.icon className="h-8 w-8 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-300">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ================= BACKGROUND (STATIC) ================= */}
      <section className="bg-blue-50 border-t border-blue-100">
        <div className="max-w-6xl mx-auto px-6 py-24 space-y-24">

          <h2 className="text-3xl font-semibold text-gray-900 border-l-4 border-blue-600 pl-4">
            Background
          </h2>

          {/* BLOCK 1 */}
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
              <p>
                ProteinLab is inspired by large-scale protein structure databases
                such as AlphaFold, which use artificial intelligence to predict
                three-dimensional protein structures from amino acid sequences.
              </p>

              <p>
                These predictions allow researchers to explore protein folding,
                stability, and function at unprecedented scale, accelerating
                biological and medical research.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <img
                src="https://alphafold.ebi.ac.uk/assets/img/Q8I3H7_1.webp"
                alt="Predicted protein structure example"
                className="w-full rounded-md border"
              />
              <p className="text-xs text-gray-500 mt-3">
                Example predicted protein structure (AlphaFold-style visualization)
              </p>
            </div>
          </div>

          {/* BLOCK 2 */}
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="bg-white rounded-xl shadow-md p-6 order-2 md:order-1">
              <img
                src="https://alphafold.ebi.ac.uk/assets/img/Q8W3K0.webp"
                alt="Residue confidence visualization"
                className="w-full rounded-md border"
              />
              <p className="text-xs text-gray-500 mt-3">
                Residue-level confidence visualization (pLDDT coloring)
              </p>
            </div>

            <div className="space-y-6 text-gray-700 leading-relaxed text-lg order-1 md:order-2">
              <p>
                Confidence scores help distinguish reliable structural regions
                from flexible or uncertain segments of the protein.
              </p>

              <p>
                ProteinLab builds upon these ideas by integrating mutation data,
                spatial analysis, and AI-assisted interpretation for rare disease
                research.
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default HomePage;
