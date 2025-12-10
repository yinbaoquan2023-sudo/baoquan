import React from 'react';
import { GeneratedImage } from '../types';
import { Download, ExternalLink } from 'lucide-react';

interface ResultGalleryProps {
  images: GeneratedImage[];
  isLoading: boolean;
}

const ResultGallery: React.FC<ResultGalleryProps> = ({ images, isLoading }) => {
  if (images.length === 0 && !isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-400 p-12 bg-white rounded-xl border border-gray-200 border-dashed">
        <div className="bg-gray-50 p-4 rounded-full mb-4">
          <ExternalLink className="w-8 h-8 text-gray-300" />
        </div>
        <p className="text-center">Select a scenario or enter a prompt to generate marketing assets.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {isLoading && (
        <div className="aspect-square bg-gray-100 rounded-xl animate-pulse flex items-center justify-center border border-gray-200">
           <div className="flex flex-col items-center">
             <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
             <p className="text-sm text-gray-500 font-medium">Generating visual...</p>
           </div>
        </div>
      )}
      
      {images.map((img) => (
        <div key={img.id} className="group relative rounded-xl overflow-hidden shadow-sm bg-white border border-gray-200 transition-all hover:shadow-md">
          <img src={img.dataUrl} alt="Generated Asset" className="w-full h-auto aspect-square object-cover" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
            <p className="text-white text-sm line-clamp-2 mb-3 font-medium">{img.prompt}</p>
            <a 
              href={img.dataUrl} 
              download={`product-viz-${img.id}.png`}
              className="bg-white hover:bg-gray-100 text-gray-900 w-full py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Asset
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultGallery;
