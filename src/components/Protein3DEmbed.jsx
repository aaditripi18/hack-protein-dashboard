import React from 'react';

export default function Protein3DEmbed({ pdbId }) {
  if (!pdbId) return null;

  const src = `https://www.rcsb.org/3d-view/${pdbId}?ui=false&hideControls=true`;

  return (
    <div className="w-full h-[420px] rounded-xl overflow-hidden border bg-white">
      <iframe
        title={`Protein structure ${pdbId}`}
        src={src}
        className="w-full h-full"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
}
