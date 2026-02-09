import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, BookOpen, Database, Dna } from 'lucide-react';

function ResearchContext({ proteinData }) {
  if (!proteinData || !proteinData.metadata) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border-white/20 shadow-xl">
        <CardContent className="p-8">
          <p className="text-sm text-gray-500">No protein data available</p>
        </CardContent>
      </Card>
    );
  }

  const { metadata } = proteinData;

  const databases = [
    {
      name: 'UniProt',
      url: `https://www.uniprot.org/uniprotkb/${metadata.uniprotId}`,
      icon: Database,
      description: 'Protein sequence and functional information',
    },
    {
      name: 'PubMed',
      url: `https://pubmed.ncbi.nlm.nih.gov/?term=${metadata.geneSymbol}`,
      icon: BookOpen,
      description: 'Research articles and publications',
    },
    {
      name: 'ClinVar',
      url: `https://www.ncbi.nlm.nih.gov/clinvar/?term=${metadata.geneSymbol}`,
      icon: Dna,
      description: 'Clinical variant database',
    },
    {
      name: 'OMIM',
      url: `https://www.omim.org/search/?search=${metadata.geneSymbol}`,
      icon: BookOpen,
      description: 'Online Mendelian Inheritance in Man',
    },
  ];

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-500" />
          Research Context
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Protein Information */}
        <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <h3 className="font-bold text-lg text-gray-900 mb-2">{metadata.name}</h3>
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="default">{metadata.geneSymbol}</Badge>
            <Badge variant="outline">{metadata.uniprotId}</Badge>
            <Badge variant="secondary">{metadata.length} aa</Badge>
          </div>
          <p className="text-sm text-gray-700">{metadata.function}</p>
        </div>

        {/* Disease Information */}
        <div>
          <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-500" />
            Associated Disease
          </h4>
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-900 font-medium">{metadata.disease}</p>
            {metadata.chromosome && (
              <p className="text-xs text-red-700 mt-2">
                Chromosomal Location: {metadata.chromosome}
              </p>
            )}
          </div>
        </div>

        {/* Database Links */}
        <div>
          <h4 className="font-bold text-sm mb-3">External Resources</h4>
          <div className="space-y-2">
            {databases.map((db) => (
              <a
                key={db.name}
                href={db.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                    <db.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm text-gray-900">{db.name}</div>
                    <div className="text-xs text-gray-500">{db.description}</div>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Clinical Notes */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-bold text-sm mb-2 text-yellow-900">Clinical Significance</h4>
          <p className="text-xs text-yellow-800">
            Mutations in {metadata.geneSymbol} are associated with {metadata.disease}. Genetic
            counseling and clinical genetic testing are recommended for individuals with family
            history or suspected cases.
          </p>
        </div>

        {/* Treatment Information */}
        {metadata.geneSymbol === 'TP53' && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-bold text-sm mb-2 text-green-900">Treatment Considerations</h4>
            <p className="text-xs text-green-800">
              Patients with TP53 mutations may benefit from enhanced surveillance protocols,
              including regular cancer screenings and risk-reducing strategies. Targeted therapies
              and clinical trials may be available.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Missing import added
import { AlertCircle } from 'lucide-react';

export default ResearchContext;