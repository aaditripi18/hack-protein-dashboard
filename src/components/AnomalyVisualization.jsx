import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts';
import { AlertCircle } from 'lucide-react';

function AnomalyVisualization({ proteinData, onHighlightRegion }) {
  if (!proteinData || !proteinData.structure) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border-white/20 shadow-xl">
        <CardContent className="p-8">
          <p className="text-sm text-gray-500">No structure data available</p>
        </CardContent>
      </Card>
    );
  }

  // Prepare data for chart
  const chartData = proteinData.structure
    .sort((a, b) => a.residueIndex - b.residueIndex)
    .map((residue) => ({
      position: residue.residueIndex,
      pLDDT: residue.pLDDT,
      residue: `${residue.residueName}${residue.residueIndex}`,
    }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-black/90 text-white p-3 rounded-lg shadow-xl">
          <p className="font-bold">{data.residue}</p>
          <p className="text-sm">pLDDT: {data.pLDDT}</p>
        </div>
      );
    }
    return null;
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return '#3b82f6'; // blue
    if (confidence >= 70) return '#06b6d4'; // cyan
    if (confidence >= 50) return '#eab308'; // yellow
    if (confidence >= 30) return '#f97316'; // orange
    return '#ef4444'; // red
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-yellow-500" />
          Confidence Score Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Line Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorPLDDT" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="position"
                label={{ value: 'Residue Position', position: 'insideBottom', offset: -5 }}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                domain={[0, 100]}
                label={{ value: 'pLDDT Score', angle: -90, position: 'insideLeft' }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={90} stroke="#3b82f6" strokeDasharray="3 3" label="Very High" />
              <ReferenceLine y={70} stroke="#06b6d4" strokeDasharray="3 3" label="High" />
              <ReferenceLine y={50} stroke="#eab308" strokeDasharray="3 3" label="Medium" />
              <ReferenceLine y={30} stroke="#f97316" strokeDasharray="3 3" label="Low" />
              <Area
                type="monotone"
                dataKey="pLDDT"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#colorPLDDT)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Anomaly Regions Table */}
        <div>
          <h4 className="font-bold text-sm mb-3">Anomaly Regions</h4>
          <div className="space-y-3">
            {proteinData.anomalies?.map((anomaly, index) => (
              <div
                key={index}
                className="p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200 hover:border-red-400 transition-all cursor-pointer"
                onClick={() =>
                  onHighlightRegion({
                    start: anomaly.startResidue,
                    end: anomaly.endResidue,
                  })
                }
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h5 className="font-bold text-sm text-gray-900">{anomaly.name}</h5>
                    <p className="text-xs text-gray-600 mt-1">{anomaly.description}</p>
                  </div>
                  <Badge variant="warning" className="ml-2">
                    {anomaly.anomalyCount} anomalies
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="bg-white p-2 rounded border border-gray-200">
                    <div className="text-xs text-gray-500">Region</div>
                    <div className="text-xs font-mono font-bold">
                      {anomaly.startResidue}-{anomaly.endResidue}
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded border border-gray-200">
                    <div className="text-xs text-gray-500">Avg. Confidence</div>
                    <div className="text-xs font-bold" style={{ color: getConfidenceColor(anomaly.avgConfidence) }}>
                      {anomaly.avgConfidence}
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded border border-gray-200">
                    <div className="text-xs text-gray-500">Anomalies</div>
                    <div className="text-xs font-bold text-red-600">{anomaly.anomalyCount}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Confidence Distribution */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-4">
          <h5 className="font-bold text-sm text-gray-900 mb-3">Confidence Distribution</h5>
          <div className="space-y-2">
            {[
              { label: 'Very High (90-100)', color: 'bg-blue-500', count: chartData.filter(d => d.pLDDT >= 90).length },
              { label: 'High (70-90)', color: 'bg-cyan-500', count: chartData.filter(d => d.pLDDT >= 70 && d.pLDDT < 90).length },
              { label: 'Medium (50-70)', color: 'bg-yellow-500', count: chartData.filter(d => d.pLDDT >= 50 && d.pLDDT < 70).length },
              { label: 'Low (30-50)', color: 'bg-orange-500', count: chartData.filter(d => d.pLDDT >= 30 && d.pLDDT < 50).length },
              { label: 'Very Low (<30)', color: 'bg-red-500', count: chartData.filter(d => d.pLDDT < 30).length },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded ${item.color}`}></div>
                <span className="text-xs flex-1">{item.label}</span>
                <span className="text-xs font-bold">{item.count} residues</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default AnomalyVisualization;