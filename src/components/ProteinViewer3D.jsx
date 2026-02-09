/* eslint-disable react/no-unknown-property */
import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

function Residue({ position, color, scale = 1, onPointerOver, onPointerOut, isHighlighted, isMutation }) {
  const meshRef = useRef();
  
  useFrame(() => {
    if (meshRef.current && (isHighlighted || isMutation)) {
      meshRef.current.rotation.y += 0.02;
    }
  });

  const finalScale = isHighlighted ? scale * 1.5 : isMutation ? scale * 1.3 : scale;

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      scale={finalScale}
    >
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial
        color={color}
        metalness={0.3}
        roughness={0.4}
        emissive={isHighlighted || isMutation ? color : '#000000'}
        emissiveIntensity={isHighlighted ? 0.5 : isMutation ? 0.3 : 0}
      />
    </mesh>
  );
}

function ProteinStructure({ residues, selectedMutation, highlightedRegions }) {
  const [hoveredResidue, setHoveredResidue] = useState(null);

  const getColorFromPLDDT = (pLDDT) => {
    if (pLDDT >= 90) return '#3b82f6'; // blue
    if (pLDDT >= 70) return '#06b6d4'; // cyan
    if (pLDDT >= 50) return '#eab308'; // yellow
    if (pLDDT >= 30) return '#f97316'; // orange
    return '#ef4444'; // red
  };

  const residueElements = useMemo(() => {
    return residues.map((residue) => {
      const isMutation = selectedMutation && residue.residueIndex === selectedMutation.position;
      const isInHighlightedRegion = highlightedRegions?.some(
        (region) => residue.residueIndex >= region.start && residue.residueIndex <= region.end
      );
      
      let color = getColorFromPLDDT(residue.pLDDT);
      if (isMutation) {
        color = '#ff0080'; // bright pink for mutations
      }

      return (
        <React.Fragment key={residue.residueIndex}>
          <Residue
            position={[residue.x, residue.y, residue.z]}
            color={color}
            scale={1}
            isHighlighted={isInHighlightedRegion}
            isMutation={isMutation}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredResidue(residue);
            }}
            onPointerOut={() => setHoveredResidue(null)}
          />
          {hoveredResidue?.residueIndex === residue.residueIndex && (
            <Html position={[residue.x, residue.y + 0.8, residue.z]}>
              <div className="bg-black/90 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap shadow-xl backdrop-blur-sm">
                <div className="font-bold">{residue.residueName} {residue.residueIndex}</div>
                <div className="text-gray-300">pLDDT: {residue.pLDDT}</div>
                <div className="text-xs text-gray-400 mt-1">
                  Position: ({residue.x.toFixed(1)}, {residue.y.toFixed(1)}, {residue.z.toFixed(1)})
                </div>
              </div>
            </Html>
          )}
        </React.Fragment>
      );
    });
  }, [residues, selectedMutation, highlightedRegions, hoveredResidue]);

  return <group>{residueElements}</group>;
}

function ProteinViewer3D({ proteinData, selectedMutation, highlightedRegions }) {
  if (!proteinData || !proteinData.structure) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl">
        <p className="text-white/60">No protein structure data available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Canvas
        camera={{ position: [8, 5, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#0f172a']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        
        <ProteinStructure
          residues={proteinData.structure}
          selectedMutation={selectedMutation}
          highlightedRegions={highlightedRegions}
        />
        
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
          zoomSpeed={0.8}
          panSpeed={0.5}
        />
      </Canvas>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md rounded-lg p-3 text-white text-xs">
        <div className="font-bold mb-2">pLDDT Confidence</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>90-100 (Very High)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
            <span>70-90 (High)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>50-70 (Medium)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>30-50 (Low)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>&lt;30 (Very Low)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-pink-500"></div>
            <span>Mutation Site</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProteinViewer3D;