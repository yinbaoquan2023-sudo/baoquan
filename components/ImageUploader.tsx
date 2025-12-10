import React, { useRef } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  currentImage: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, currentImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
      />
      
      {!currentImage ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="border-2 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors h-96"
        >
          <div className="bg-blue-100 p-4 rounded-full mb-4">
            <Upload className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Upload Product Image</h3>
          <p className="text-sm text-gray-500 text-center max-w-xs">
            Drag and drop your image here, or click to browse. Supported formats: PNG, JPG.
          </p>
        </div>
      ) : (
        <div className="relative group rounded-xl overflow-hidden border border-gray-200 shadow-sm">
           <img 
            src={currentImage} 
            alt="Original Product" 
            className="w-full h-auto object-cover max-h-[500px]" 
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <button 
               onClick={() => fileInputRef.current?.click()}
               className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium shadow-lg flex items-center gap-2"
             >
               <ImageIcon className="w-4 h-4" />
               Change Image
             </button>
          </div>
          <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium">
            Original Source
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
