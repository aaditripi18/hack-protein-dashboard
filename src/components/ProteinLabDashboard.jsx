import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import ProteinSearchBar from '@/components/ProteinSearchBar';
import ProteinViewer3D from '@/components/ProteinViewer3D';
import MutationPathogenicityCard from '@/components/MutationPathogenicityCard';
import ClinicalVariantsTable from '@/components/ClinicalVariantsTable';
import SpatialHotspotDetector from '@/components/SpatialHotspotDetector';
import AnomalyVisualization from '@/components/AnomalyVisualization';
import ResearchContext from '@/components/ResearchContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { proteinDatabase } from '@/data/proteinSampleData';
import { Dna, AlertCircle, Flame, Activity } from 'lucide-react';

function ProteinLabDashboard() {
  const [selectedProtein, setSelectedProtein] = useState('TP53');
  const [selectedMutation, setSelectedMutation] = useState(null);
  const [highlightedRegions, setHighlightedRegions] = useState([]);
  const [activeTab, setActiveTab] = useState('mutations');

  const proteinData = proteinDatabase[selectedProtein];

  useEffect(() => {
    // Reset selections when protein changes
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

  return (
    <>
      <Helmet>
        <title>ProteinLab Dashboard - Advanced Protein Structure Analysis</title>
        <meta
          name="description"
          content="Interactive 3D protein structure visualization and mutation analysis platform for rare disease research. Analyze pathogenicity scores, spatial hotspots, and clinical variants."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/20 backdrop-blur-md">
          <div className="max-w-[1800px] mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                  <Dna className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">ProteinLab</h1>
                  <p className="text-xs text-gray-400">Advanced Protein Structure Analysis</p>
                </div>
              </div>
              {proteinData && (
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  <div className="text-right">
                    <div className="text-sm text-gray-300">Currently Viewing</div>
                    <div className="text-lg font-bold text-white">{proteinData.metadata.geneSymbol}</div>
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

        {/* Main Content */}
        <main className="max-w-[1800px] mx-auto px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left Panel - 3D Viewer */}
            <div className="lg:col-span-3 space-y-6">
              <div className="h-[600px] rounded-xl overflow-hidden shadow-2xl">
                <ProteinViewer3D
                  proteinData={proteinData}
                  selectedMutation={selectedMutation}
                  highlightedRegions={highlightedRegions}
                />
              </div>

              {/* Mutation Card below viewer on desktop */}
              <div className="hidden lg:block">
                <MutationPathogenicityCard mutation={selectedMutation} />
              </div>
            </div>

            {/* Right Panel - Tabbed Interface */}
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full grid grid-cols-4 bg-black/40 backdrop-blur-sm border-b border-white/10">
                    <TabsTrigger value="mutations" className="data-[state=active]:bg-white/20">
                      <div className="flex items-center gap-1">
                        <Dna className="h-4 w-4" />
                        <span className="hidden sm:inline">Mutations</span>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="hotspots" className="data-[state=active]:bg-white/20">
                      <div className="flex items-center gap-1">
                        <Flame className="h-4 w-4" />
                        <span className="hidden sm:inline">Hotspots</span>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="anomalies" className="data-[state=active]:bg-white/20">
                      <div className="flex items-center gap-1">
                        <Activity className="h-4 w-4" />
                        <span className="hidden sm:inline">Anomalies</span>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="research" className="data-[state=active]:bg-white/20">
                      <div className="flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        <span className="hidden sm:inline">Research</span>
                      </div>
                    </TabsTrigger>
                  </TabsList>

                  <div className="p-4 max-h-[700px] overflow-y-auto">
                    <TabsContent value="mutations" className="mt-0 space-y-4">
                      {/* Mobile mutation card */}
                      <div className="lg:hidden">
                        <MutationPathogenicityCard mutation={selectedMutation} />
                      </div>
                      <ClinicalVariantsTable
                        mutations={proteinData?.mutations || []}
                        onSelectMutation={handleSelectMutation}
                        selectedMutation={selectedMutation}
                      />
                    </TabsContent>

                    <TabsContent value="hotspots" className="mt-0">
                      <SpatialHotspotDetector
                        hotspots={proteinData?.hotspots || []}
                        onHighlightRegion={handleHighlightRegion}
                      />
                    </TabsContent>

                    <TabsContent value="anomalies" className="mt-0">
                      <AnomalyVisualization
                        proteinData={proteinData}
                        onHighlightRegion={handleHighlightRegion}
                      />
                    </TabsContent>

                    <TabsContent value="research" className="mt-0">
                      <ResearchContext proteinData={proteinData} />
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