// Sample protein structure data for TP53, BRCA1, and ALS2

export const proteinDatabase = {
  TP53: {
    metadata: {
      name: "Tumor Protein p53",
      geneSymbol: "TP53",
      uniprotId: "P04637",
      length: 393,
      function: "Tumor suppressor protein that regulates cell cycle and prevents cancer formation",
      chromosome: "17p13.1",
      disease: "Li-Fraumeni Syndrome, Various Cancers"
    },
    structure: [
      // DNA-binding domain (structured, high confidence)
      { residueIndex: 94, residueName: "LEU", x: -2.5, y: 1.2, z: 0.5, pLDDT: 92 },
      { residueIndex: 95, residueName: "THR", x: -2.1, y: 1.5, z: 1.2, pLDDT: 94 },
      { residueIndex: 96, residueName: "ILE", x: -1.8, y: 2.1, z: 0.8, pLDDT: 93 },
      { residueIndex: 120, residueName: "ARG", x: 0.5, y: 2.5, z: -1.2, pLDDT: 91 },
      { residueIndex: 175, residueName: "ARG", x: 2.1, y: 1.8, z: -0.5, pLDDT: 90 },
      { residueIndex: 245, residueName: "GLY", x: 3.2, y: 0.5, z: 1.1, pLDDT: 89 },
      { residueIndex: 248, residueName: "ARG", x: 3.5, y: -0.2, z: 0.8, pLDDT: 91 },
      { residueIndex: 249, residueName: "PRO", x: 3.8, y: -0.8, z: 1.5, pLDDT: 88 },
      { residueIndex: 273, residueName: "ARG", x: 2.8, y: -1.5, z: -1.2, pLDDT: 90 },
      { residueIndex: 282, residueName: "ARG", x: 1.5, y: -2.1, z: -0.8, pLDDT: 89 },
      
      // Loop regions (lower confidence)
      { residueIndex: 163, residueName: "VAL", x: 1.2, y: 3.5, z: 0.2, pLDDT: 58 },
      { residueIndex: 164, residueName: "PRO", x: 0.8, y: 4.1, z: -0.5, pLDDT: 52 },
      { residueIndex: 165, residueName: "TYR", x: 0.3, y: 4.8, z: -0.2, pLDDT: 48 },
      
      // Additional structured regions
      { residueIndex: 130, residueName: "MET", x: 1.1, y: 2.8, z: -2.1, pLDDT: 85 },
      { residueIndex: 133, residueName: "CYS", x: 0.8, y: 2.2, z: -2.8, pLDDT: 87 },
      { residueIndex: 141, residueName: "CYS", x: -0.5, y: 1.5, z: -2.5, pLDDT: 86 },
      { residueIndex: 176, residueName: "HIS", x: 2.5, y: 1.2, z: -0.8, pLDDT: 92 },
      { residueIndex: 179, residueName: "CYS", x: 2.8, y: 0.5, z: -1.5, pLDDT: 88 },
      
      // Tetramerization domain
      { residueIndex: 325, residueName: "LEU", x: -3.2, y: -2.5, z: 2.1, pLDDT: 78 },
      { residueIndex: 330, residueName: "PHE", x: -3.8, y: -3.1, z: 1.5, pLDDT: 75 },
      { residueIndex: 338, residueName: "LEU", x: -4.2, y: -3.8, z: 0.8, pLDDT: 72 },
      
      // N-terminal domain (less structured)
      { residueIndex: 20, residueName: "SER", x: -5.1, y: 3.2, z: 2.5, pLDDT: 45 },
      { residueIndex: 37, residueName: "PRO", x: -4.8, y: 2.5, z: 3.1, pLDDT: 38 },
      { residueIndex: 61, residueName: "GLU", x: -4.2, y: 1.8, z: 2.8, pLDDT: 42 }
    ],
    mutations: [
      {
        position: 175,
        wtAA: "ARG",
        mutAA: "HIS",
        pathogenicity: 0.89,
        disease: "Li-Fraumeni Syndrome, Colorectal Cancer",
        clinicalSignificance: "Pathogenic",
        population: "Common hotspot mutation",
        functionalImpact: "Disrupts DNA binding"
      },
      {
        position: 248,
        wtAA: "ARG",
        mutAA: "GLN",
        pathogenicity: 0.92,
        disease: "Breast Cancer, Ovarian Cancer",
        clinicalSignificance: "Pathogenic",
        population: "Highly recurrent",
        functionalImpact: "Loss of DNA contact"
      },
      {
        position: 273,
        wtAA: "ARG",
        mutAA: "HIS",
        pathogenicity: 0.87,
        disease: "Lung Cancer, Glioblastoma",
        clinicalSignificance: "Pathogenic",
        population: "Hotspot in multiple cancers",
        functionalImpact: "Impaired DNA binding"
      },
      {
        position: 245,
        wtAA: "GLY",
        mutAA: "SER",
        pathogenicity: 0.85,
        disease: "Adrenocortical Carcinoma",
        clinicalSignificance: "Pathogenic",
        population: "Found in pediatric cancers",
        functionalImpact: "Structural disruption"
      },
      {
        position: 282,
        wtAA: "ARG",
        mutAA: "TRP",
        pathogenicity: 0.91,
        disease: "Colorectal Cancer",
        clinicalSignificance: "Pathogenic",
        population: "Common in CRC",
        functionalImpact: "DNA binding loss"
      },
      {
        position: 133,
        wtAA: "CYS",
        mutAA: "TYR",
        pathogenicity: 0.18,
        disease: "Uncertain significance",
        clinicalSignificance: "Likely Benign",
        population: "Rare variant",
        functionalImpact: "Minimal effect"
      },
      {
        position: 96,
        wtAA: "ILE",
        mutAA: "VAL",
        pathogenicity: 0.22,
        disease: "Not associated",
        clinicalSignificance: "Benign",
        population: "Population polymorphism",
        functionalImpact: "Conservative substitution"
      }
    ],
    hotspots: [
      {
        name: "DNA-binding Surface",
        residues: [175, 245, 248, 273, 282],
        mutationCount: 5,
        avgPathogenicity: 0.89,
        description: "Critical region for DNA contact",
        functionalPocket: "DNA recognition helix"
      },
      {
        name: "L2-L3 Loop",
        residues: [163, 164, 165],
        mutationCount: 0,
        avgPathogenicity: 0,
        description: "Flexible loop with low confidence",
        functionalPocket: "Structural flexibility region"
      }
    ],
    anomalies: [
      {
        name: "N-terminal Transactivation Domain",
        startResidue: 1,
        endResidue: 61,
        avgConfidence: 41,
        anomalyCount: 3,
        description: "Intrinsically disordered region with low pLDDT scores"
      },
      {
        name: "L2-L3 Loop Region",
        startResidue: 163,
        endResidue: 165,
        avgConfidence: 52,
        anomalyCount: 3,
        description: "Flexible loop connecting DNA-binding domains"
      }
    ]
  },

  BRCA1: {
    metadata: {
      name: "Breast Cancer Type 1 Susceptibility Protein",
      geneSymbol: "BRCA1",
      uniprotId: "P38398",
      length: 1863,
      function: "DNA repair protein involved in homologous recombination and maintenance of genomic stability",
      chromosome: "17q21.31",
      disease: "Hereditary Breast and Ovarian Cancer Syndrome"
    },
    structure: [
      // RING domain (structured)
      { residueIndex: 24, residueName: "CYS", x: -3.5, y: 2.8, z: 1.5, pLDDT: 88 },
      { residueIndex: 27, residueName: "CYS", x: -3.2, y: 3.2, z: 2.1, pLDDT: 89 },
      { residueIndex: 44, residueName: "CYS", x: -2.5, y: 3.8, z: 1.8, pLDDT: 87 },
      { residueIndex: 47, residueName: "CYS", x: -2.1, y: 4.2, z: 2.5, pLDDT: 86 },
      { residueIndex: 61, residueName: "CYS", x: -1.5, y: 4.5, z: 2.8, pLDDT: 85 },
      
      // BRCT domains (high confidence)
      { residueIndex: 1650, residueName: "MET", x: 2.5, y: -2.1, z: -1.5, pLDDT: 92 },
      { residueIndex: 1689, residueName: "ARG", x: 3.1, y: -2.8, z: -2.1, pLDDT: 91 },
      { residueIndex: 1699, residueName: "SER", x: 3.5, y: -3.2, z: -2.5, pLDDT: 90 },
      { residueIndex: 1700, residueName: "GLY", x: 3.8, y: -3.5, z: -2.8, pLDDT: 89 },
      { residueIndex: 1775, residueName: "PRO", x: 4.2, y: -4.1, z: -3.2, pLDDT: 88 },
      
      // Linker regions (lower confidence)
      { residueIndex: 500, residueName: "GLY", x: 0.2, y: 0.5, z: 0.1, pLDDT: 45 },
      { residueIndex: 750, residueName: "SER", x: 1.1, y: -0.5, z: 0.5, pLDDT: 38 },
      { residueIndex: 1000, residueName: "PRO", x: 1.8, y: -1.2, z: -0.2, pLDDT: 42 },
      
      // Additional structured regions
      { residueIndex: 1396, residueName: "LEU", x: 2.1, y: -1.5, z: -0.8, pLDDT: 82 },
      { residueIndex: 1756, residueName: "GLU", x: 4.0, y: -3.8, z: -3.0, pLDDT: 87 }
    ],
    mutations: [
      {
        position: 1699,
        wtAA: "SER",
        mutAA: "LEU",
        pathogenicity: 0.94,
        disease: "Hereditary Breast and Ovarian Cancer",
        clinicalSignificance: "Pathogenic",
        population: "Founder mutation in multiple populations",
        functionalImpact: "Disrupts BRCT phosphopeptide binding"
      },
      {
        position: 24,
        wtAA: "CYS",
        mutAA: "ARG",
        pathogenicity: 0.88,
        disease: "Early-onset Breast Cancer",
        clinicalSignificance: "Pathogenic",
        population: "Affects RING domain zinc binding",
        functionalImpact: "Loss of E3 ubiquitin ligase activity"
      },
      {
        position: 61,
        wtAA: "CYS",
        mutAA: "GLY",
        pathogenicity: 0.90,
        disease: "Breast and Ovarian Cancer",
        clinicalSignificance: "Pathogenic",
        population: "Common in Ashkenazi Jewish population",
        functionalImpact: "RING domain destabilization"
      },
      {
        position: 1775,
        wtAA: "PRO",
        mutAA: "LEU",
        pathogenicity: 0.15,
        disease: "Uncertain significance",
        clinicalSignificance: "Likely Benign",
        population: "Rare variant",
        functionalImpact: "Minimal structural impact"
      }
    ],
    hotspots: [
      {
        name: "RING Domain",
        residues: [24, 27, 44, 47, 61],
        mutationCount: 2,
        avgPathogenicity: 0.89,
        description: "Zinc-binding E3 ubiquitin ligase domain",
        functionalPocket: "Zinc coordination site"
      },
      {
        name: "BRCT Phosphopeptide Binding",
        residues: [1650, 1689, 1699, 1700, 1775],
        mutationCount: 2,
        avgPathogenicity: 0.54,
        description: "Critical for protein-protein interactions",
        functionalPocket: "Phosphoserine recognition"
      }
    ],
    anomalies: [
      {
        name: "Central Linker Region",
        startResidue: 400,
        endResidue: 1000,
        avgConfidence: 41,
        anomalyCount: 3,
        description: "Large intrinsically disordered region connecting domains"
      }
    ]
  },

  ALS2: {
    metadata: {
      name: "Alsin Rho Guanine Nucleotide Exchange Factor",
      geneSymbol: "ALS2",
      uniprotId: "Q96Q42",
      length: 1657,
      function: "Guanine nucleotide exchange factor involved in endosomal trafficking and neuroprotection",
      chromosome: "2q33.1",
      disease: "Juvenile Amyotrophic Lateral Sclerosis, Hereditary Spastic Paraplegia"
    },
    structure: [
      // RLD domain
      { residueIndex: 687, residueName: "LEU", x: -2.8, y: 1.5, z: 0.8, pLDDT: 85 },
      { residueIndex: 702, residueName: "ARG", x: -2.5, y: 1.8, z: 1.2, pLDDT: 87 },
      { residueIndex: 755, residueName: "ILE", x: -1.8, y: 2.5, z: 1.5, pLDDT: 84 },
      
      // DH domain (GEF catalytic domain)
      { residueIndex: 991, residueName: "LEU", x: 0.5, y: -1.2, z: -0.5, pLDDT: 90 },
      { residueIndex: 1043, residueName: "ARG", x: 1.2, y: -1.8, z: -1.1, pLDDT: 91 },
      { residueIndex: 1087, residueName: "GLU", x: 1.8, y: -2.5, z: -1.5, pLDDT: 89 },
      
      // PH domain
      { residueIndex: 1200, residueName: "LYS", x: 2.5, y: -3.1, z: -2.1, pLDDT: 86 },
      { residueIndex: 1245, residueName: "ARG", x: 3.1, y: -3.8, z: -2.5, pLDDT: 85 },
      
      // MORN motifs (lower confidence)
      { residueIndex: 150, residueName: "GLY", x: -4.5, y: 3.5, z: 2.1, pLDDT: 52 },
      { residueIndex: 250, residueName: "SER", x: -4.1, y: 3.1, z: 2.5, pLDDT: 48 },
      { residueIndex: 350, residueName: "PRO", x: -3.8, y: 2.8, z: 2.8, pLDDT: 45 }
    ],
    mutations: [
      {
        position: 1043,
        wtAA: "ARG",
        mutAA: "GLN",
        pathogenicity: 0.86,
        disease: "Juvenile ALS (ALS2)",
        clinicalSignificance: "Pathogenic",
        population: "Found in consanguineous families",
        functionalImpact: "Impaired GEF activity"
      },
      {
        position: 702,
        wtAA: "ARG",
        mutAA: "TRP",
        pathogenicity: 0.82,
        disease: "Infantile-onset Ascending Spastic Paralysis",
        clinicalSignificance: "Pathogenic",
        population: "Rare recessive mutation",
        functionalImpact: "Protein destabilization"
      },
      {
        position: 1245,
        wtAA: "ARG",
        mutAA: "HIS",
        pathogenicity: 0.19,
        disease: "Not associated",
        clinicalSignificance: "Likely Benign",
        population: "Rare population variant",
        functionalImpact: "Conservative substitution"
      }
    ],
    hotspots: [
      {
        name: "DH Domain Active Site",
        residues: [991, 1043, 1087],
        mutationCount: 1,
        avgPathogenicity: 0.86,
        description: "Catalytic region for Rac1 activation",
        functionalPocket: "GEF catalytic center"
      },
      {
        name: "RLD-DH Interface",
        residues: [687, 702, 755],
        mutationCount: 1,
        avgPathogenicity: 0.82,
        description: "Domain-domain interaction surface",
        functionalPocket: "Regulatory interface"
      }
    ],
    anomalies: [
      {
        name: "MORN Repeat Region",
        startResidue: 100,
        endResidue: 400,
        avgConfidence: 48,
        anomalyCount: 3,
        description: "Membrane occupation recognition nexus repeats with low confidence"
      }
    ]
  }
};

// Gene autocomplete suggestions
export const geneList = [
  {
    symbol: "TP53",
    name: "Tumor Protein p53",
    disease: "Li-Fraumeni Syndrome, Various Cancers",
    type: "Tumor Suppressor"
  },
  {
    symbol: "BRCA1",
    name: "Breast Cancer Type 1",
    disease: "Hereditary Breast and Ovarian Cancer",
    type: "DNA Repair"
  },
  {
    symbol: "BRCA2",
    name: "Breast Cancer Type 2",
    disease: "Hereditary Breast and Ovarian Cancer",
    type: "DNA Repair"
  },
  {
    symbol: "ALS2",
    name: "Alsin Rho GEF",
    disease: "Juvenile ALS, Spastic Paraplegia",
    type: "Neurological"
  },
  {
    symbol: "CFTR",
    name: "Cystic Fibrosis Transmembrane Regulator",
    disease: "Cystic Fibrosis",
    type: "Ion Channel"
  },
  {
    symbol: "HTT",
    name: "Huntingtin",
    disease: "Huntington's Disease",
    type: "Neurological"
  },
  {
    symbol: "DMD",
    name: "Dystrophin",
    disease: "Duchenne Muscular Dystrophy",
    type: "Structural"
  },
  {
    symbol: "SOD1",
    name: "Superoxide Dismutase 1",
    disease: "Familial ALS",
    type: "Enzyme"
  }
];