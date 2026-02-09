import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { geneList } from '@/data/proteinSampleData';
import { useDebounce } from '@/hooks/useDebounce';
import { motion, AnimatePresence } from 'framer-motion';

function ProteinSearchBar({ onSelectProtein }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 200);

  const filteredGenes = debouncedSearch
    ? geneList.filter(
        (gene) =>
          gene.symbol.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          gene.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          gene.disease.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    : [];

  const handleSelect = (geneSymbol) => {
    setSearchTerm(geneSymbol);
    setIsOpen(false);
    onSelectProtein(geneSymbol);
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search for genes (TP53, BRCA1, ALS2, CFTR, HTT...)"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="pl-10 bg-white/90 backdrop-blur-sm border-white/20 text-gray-900 placeholder:text-gray-400"
        />
      </div>

      <AnimatePresence>
        {isOpen && filteredGenes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-2xl border border-gray-200 max-h-96 overflow-y-auto"
          >
            {filteredGenes.map((gene) => (
              <button
                key={gene.symbol}
                onClick={() => handleSelect(gene.symbol)}
                className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-blue-600 text-lg">
                        {gene.symbol}
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full">
                        {gene.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{gene.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Associated with: {gene.disease}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProteinSearchBar;