import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpDown, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function ClinicalVariantsTable({ mutations, onSelectMutation, selectedMutation }) {
  const [sortConfig, setSortConfig] = useState({ key: 'pathogenicity', direction: 'desc' });
  const [filterSignificance, setFilterSignificance] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  const filteredAndSortedMutations = useMemo(() => {
    let filtered = [...mutations];

    // Filter by significance
    if (filterSignificance !== 'all') {
      filtered = filtered.filter((m) =>
        filterSignificance === 'pathogenic'
          ? m.pathogenicity >= 0.5
          : m.pathogenicity < 0.5
      );
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((m) =>
        m.disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.wtAA.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.mutAA.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.position.toString().includes(searchTerm)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [mutations, sortConfig, filterSignificance, searchTerm]);

  const paginatedMutations = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedMutations.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedMutations, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedMutations.length / itemsPerPage);

  const getRowColor = (pathogenicity) => {
    if (pathogenicity >= 0.8) return 'bg-red-50 hover:bg-red-100';
    if (pathogenicity >= 0.5) return 'bg-orange-50 hover:bg-orange-100';
    if (pathogenicity >= 0.3) return 'bg-yellow-50 hover:bg-yellow-100';
    return 'bg-green-50 hover:bg-green-100';
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle className="text-lg">Clinical Variants</CardTitle>
        <div className="flex gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search mutations..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>
          <Select value={filterSignificance} onValueChange={(value) => {
            setFilterSignificance(value);
            setCurrentPage(1);
          }}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by significance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Variants</SelectItem>
              <SelectItem value="pathogenic">Pathogenic (≥0.5)</SelectItem>
              <SelectItem value="benign">Benign (&lt;0.5)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="cursor-pointer" onClick={() => handleSort('position')}>
                  <div className="flex items-center gap-1">
                    Position <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Mutation</TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('pathogenicity')}>
                  <div className="flex items-center gap-1">
                    Score <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Disease</TableHead>
                <TableHead>Significance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedMutations.map((mutation) => (
                <TableRow
                  key={`${mutation.position}-${mutation.mutAA}`}
                  className={`cursor-pointer transition-colors ${getRowColor(mutation.pathogenicity)} ${
                    selectedMutation?.position === mutation.position ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => onSelectMutation(mutation)}
                >
                  <TableCell className="font-medium">{mutation.position}</TableCell>
                  <TableCell>
                    <span className="font-mono text-sm">
                      {mutation.wtAA}→{mutation.mutAA}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{mutation.pathogenicity.toFixed(3)}</span>
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            mutation.pathogenicity >= 0.8
                              ? 'bg-red-500'
                              : mutation.pathogenicity >= 0.5
                              ? 'bg-orange-500'
                              : mutation.pathogenicity >= 0.3
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                          }`}
                          style={{ width: `${mutation.pathogenicity * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-sm">{mutation.disease}</TableCell>
                  <TableCell>
                    <Badge variant={mutation.pathogenicity >= 0.5 ? 'danger' : 'success'}>
                      {mutation.clinicalSignificance}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, filteredAndSortedMutations.length)} of{' '}
              {filteredAndSortedMutations.length} variants
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Previous
              </button>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ClinicalVariantsTable;