import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, MapPin } from 'lucide-react';

function SpatialHotspotDetector({ hotspots, onHighlightRegion }) {
  const sortedHotspots = useMemo(() => {
    return [...hotspots].sort((a, b) => b.mutationCount - a.mutationCount);
  }, [hotspots]);

  const getRiskColor = (avgPathogenicity) => {
    if (avgPathogenicity >= 0.8) return 'bg-red-500';
    if (avgPathogenicity >= 0.5) return 'bg-orange-500';
    if (avgPathogenicity >= 0.3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          Spatial Hotspot Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedHotspots.length === 0 ? (
          <p className="text-sm text-gray-500">No hotspot regions detected</p>
        ) : (
          sortedHotspots.map((hotspot, index) => (
            <div
              key={index}
              className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200 hover:border-blue-400 transition-all cursor-pointer shadow-sm hover:shadow-md"
              onClick={() =>
                onHighlightRegion({
                  start: Math.min(...hotspot.residues),
                  end: Math.max(...hotspot.residues),
                })
              }
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <h4 className="font-bold text-gray-900">{hotspot.name}</h4>
                  </div>
                  <p className="text-xs text-gray-600">{hotspot.description}</p>
                </div>
                <Badge
                  variant={hotspot.mutationCount > 0 ? 'danger' : 'secondary'}
                  className="ml-2"
                >
                  {hotspot.mutationCount} mutations
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-white p-2 rounded border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">Residues</div>
                  <div className="font-mono text-xs text-gray-700">
                    {hotspot.residues.join(', ')}
                  </div>
                </div>
                <div className="bg-white p-2 rounded border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">Functional Pocket</div>
                  <div className="text-xs text-gray-700 font-medium">
                    {hotspot.functionalPocket}
                  </div>
                </div>
              </div>

              {hotspot.mutationCount > 0 && (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-gray-600">Avg. Pathogenicity:</span>
                    <span className="font-bold text-sm">
                      {hotspot.avgPathogenicity.toFixed(3)}
                    </span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getRiskColor(hotspot.avgPathogenicity)}`}
                        style={{ width: `${hotspot.avgPathogenicity * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded p-2 text-xs text-yellow-800">
                    <span className="font-semibold">⚠️ Variant Synergy:</span> Multiple mutations
                    in same functional pocket may have compounding effects
                  </div>
                </>
              )}
            </div>
          ))
        )}

        {/* Summary Stats */}
        <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <h5 className="font-bold text-sm text-gray-900 mb-3">Hotspot Summary</h5>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-600">Total Hotspots</div>
              <div className="text-2xl font-bold text-blue-600">{hotspots.length}</div>
            </div>
            <div>
              <div className="text-xs text-gray-600">Active Hotspots</div>
              <div className="text-2xl font-bold text-orange-600">
                {hotspots.filter((h) => h.mutationCount > 0).length}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SpatialHotspotDetector;