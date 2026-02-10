import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import ProteinAIAgent from './ProteinAIAgent';
import ProteinSearchBar from '@/components/ProteinSearchBar';
import ProteinViewer3D from '@/components/ProteinViewer3D';
import MutationPathogenicityCard from '@/components/MutationPathogenicityCard';
import ClinicalVariantsTable from '@/components/ClinicalVariantsTable';
import SpatialHotspotDetector from '@/components/SpatialHotspotDetector';
import AnomalyVisualization from '@/components/AnomalyVisualization';
import ResearchContext from '@/components/ResearchContext';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { proteinDatabase } from '@/data/proteinSampleData';
import { AlertCircle, Flame, Activity, Dna } from 'lucide-react';

function ProteinLabDashboard() {
  const [selectedProtein, setSelectedProtein] = useState('TP53');
  const [selectedMutation, setSelectedMutation] = useState(null);
  const [highlightedRegions, setHighlightedRegions] = useState([]);
  const [activeTab, setActiveTab] = useState('mutations');

  const proteinData = proteinDatabase[selectedProtein];

  useEffect(() => {
    setSelectedMutation(null);
    setHighlightedRegions([]);
  }, [selectedProtein]);

  const handleSelectProtein = (geneSymbol) => {
    if (proteinDatabase[geneSymbol]) {
      setSelectedProtein(geneSymbol);
    }
  };

  const handleSelectMutation = (mutation) => {
    setSelectedMutation(mutation);
    setActiveTab('mutations');
  };

  const handleHighlightRegion = (region) => {
    setHighlightedRegions([region]);
  };

  // 🧠 AI CONTEXT (RESTORED)
  const aiContext = {
    gene: proteinData?.metadata?.geneSymbol,
    description: proteinData?.metadata?.description,
    mutationCount: proteinData?.mutations?.length,
    mutations: proteinData?.mutations,
    hotspots: proteinData?.hotspots,
    selectedMutation: selectedMutation,
  };

  return (
    <>
      <Helmet>
        <title>ProteinLab Dashboard - Advanced Protein Structure Analysis</title>
        <meta
          name="description"
          content="Interactive 3D protein structure visualization and mutation analysis platform for rare disease research."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        
        {/* 🔥 HEADER (ProteinLab title REMOVED here) */}
        <header className="border-b border-white/10 bg-black/20 backdrop-blur-md">
          <div className="max-w-[1800px] mx-auto px-6 py-4">
            <div className="flex items-center justify-end mb-4">
              {proteinData && (
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  <div className="text-right">
                    <div className="text-sm text-gray-300">Currently Viewing</div>
                    <div className="text-lg font-bold text-white">
                      {proteinData.metadata.geneSymbol}
                    </div>
                  </div>
                  <div className="h-8 w-px bg-white/20"></div>
                  <div className="text-xs text-gray-400">
                    {proteinData.mutations.length} variants
                  </div>
                </div>
              )}
            </div>

            <ProteinSearchBar onSelectProtein={handleSelectProtein} />
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="max-w-[1800px] mx-auto px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

            {/* LEFT PANEL */}
            <div className="lg:col-span-3 space-y-6">
              <div className="h-[600px] rounded-xl overflow-hidden shadow-2xl">
                <ProteinViewer3D
                  proteinData={proteinData}
                  selectedMutation={selectedMutation}
                  highlightedRegions={highlightedRegions}
                />
              </div>

              <div className="hidden lg:block">
                <MutationPathogenicityCard mutation={selectedMutation} />
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full grid grid-cols-4 bg-black/40 border-b border-white/10">
                    <TabsTrigger value="mutations">
                      <Dna className="h-4 w-4 mr-1" /> Mutations
                    </TabsTrigger>
                    <TabsTrigger value="hotspots">
                      <Flame className="h-4 w-4 mr-1" /> Hotspots
                    </TabsTrigger>
                    <TabsTrigger value="anomalies">
                      <Activity className="h-4 w-4 mr-1" /> Anomalies
                    </TabsTrigger>
                    <TabsTrigger value="research">
                      <AlertCircle className="h-4 w-4 mr-1" /> Research
                    </TabsTrigger>
                  </TabsList>

                  <div className="p-4 max-h-[700px] overflow-y-auto">
                    <TabsContent value="mutations">
                      <ClinicalVariantsTable
                        mutations={proteinData?.mutations || []}
                        onSelectMutation={handleSelectMutation}
                        selectedMutation={selectedMutation}
                      />
                    </TabsContent>

                    <TabsContent value="hotspots">
                      <SpatialHotspotDetector
                        hotspots={proteinData?.hotspots || []}
                        onHighlightRegion={handleHighlightRegion}
                      />
                    </TabsContent>

                    <TabsContent value="anomalies">
                      <AnomalyVisualization
                        proteinData={proteinData}
                        onHighlightRegion={handleHighlightRegion}
                      />
                    </TabsContent>

                    {/* 🧠 AI ASSISTANT (RESTORED & WORKING) */}
                    <TabsContent value="research" className="space-y-4">
                      <ResearchContext proteinData={proteinData} />
                      <ProteinAIAgent
                        context={JSON.stringify(aiContext, null, 2)}
                      />
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}

export default ProteinLabDashboard;
