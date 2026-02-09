import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle } from 'lucide-react';

function MutationPathogenicityCard({ mutation }) {
  if (!mutation) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-lg">Mutation Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">Select a mutation to view pathogenicity analysis</p>
        </CardContent>
      </Card>
    );
  }

  const isPathogenic = mutation.pathogenicity >= 0.5;
  const confidencePercent = (mutation.pathogenicity * 100).toFixed(1);

  const getRiskLevel = (score) => {
    if (score >= 0.8) return { level: 'High Risk', color: 'bg-red-500', textColor: 'text-red-600' };
    if (score >= 0.5) return { level: 'Moderate Risk', color: 'bg-orange-500', textColor: 'text-orange-600' };
    if (score >= 0.3) return { level: 'Low Risk', color: 'bg-yellow-500', textColor: 'text-yellow-600' };
    return { level: 'Minimal Risk', color: 'bg-green-500', textColor: 'text-green-600' };
  };

  const risk = getRiskLevel(mutation.pathogenicity);

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Mutation Pathogenicity</span>
          {isPathogenic ? (
            <AlertTriangle className="h-5 w-5 text-red-500" />
          ) : (
            <CheckCircle className="h-5 w-5 text-green-500" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Mutation Details */}
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-sm font-mono">
            <span className="text-gray-600">{mutation.wtAA}</span>
            <span className="text-blue-600 font-bold mx-1">{mutation.position}</span>
            <span className="text-red-600">{mutation.mutAA}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">{mutation.functionalImpact}</p>
        </div>

        {/* AlphaMissense Score */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">AlphaMissense Score</span>
            <span className="text-lg font-bold">{mutation.pathogenicity.toFixed(3)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full ${risk.color} transition-all duration-500`}
              style={{ width: `${confidencePercent}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Benign</span>
            <span>Pathogenic</span>
          </div>
        </div>

        {/* Classification */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Classification</span>
          <Badge variant={isPathogenic ? 'danger' : 'success'}>
            {mutation.clinicalSignificance}
          </Badge>
        </div>

        {/* Confidence */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Confidence</span>
          <span className={`font-bold ${risk.textColor}`}>{confidencePercent}%</span>
        </div>

        {/* Risk Indicator */}
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
          <span className="text-sm font-medium">Risk Level</span>
          <Badge className={`${risk.color} text-white`}>{risk.level}</Badge>
        </div>

        {/* Disease Association */}
        <div>
          <span className="text-sm font-medium block mb-2">Disease Association</span>
          <div className="text-sm text-gray-700 p-3 bg-blue-50 rounded-lg border border-blue-200">
            {mutation.disease}
          </div>
        </div>

        {/* Population Info */}
        <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded border-l-4 border-blue-500">
          <span className="font-semibold">Population: </span>
          {mutation.population}
        </div>
      </CardContent>
    </Card>
  );
}

export default MutationPathogenicityCard;