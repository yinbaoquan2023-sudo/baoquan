import React, { useState, useCallback } from 'react';
import ImageUploader from './components/ImageUploader';
import ResultGallery from './components/ResultGallery';
import Controls from './components/Controls';
import { generateMarketingVisual } from './services/geminiService';
import { GeneratedImage } from './types';
import { Sparkles, ShoppingBag } from 'lucide-react';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalImageMimeType, setOriginalImageMimeType] = useState<string>('image/png');
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        setOriginalImage(e.target.result);
        setOriginalImageMimeType(file.type);
        setGeneratedImages([]); // Clear previous results when new image is uploaded
        setError(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = useCallback(async (prompt: string) => {
    if (!originalImage) return;

    setIsLoading(true);
    setError(null);

    try {
      const generatedDataUrl = await generateMarketingVisual(
        originalImage,
        originalImageMimeType,
        prompt
      );

      const newImage: GeneratedImage = {
        id: crypto.randomUUID(),
        dataUrl: generatedDataUrl,
        prompt: prompt,
        timestamp: Date.now(),
      };

      setGeneratedImages((prev) => [newImage, ...prev]);
    } catch (err: any) {
      console.error(err);
      setError("Failed to generate image. Please try again. Ensure your prompt is clear.");
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, originalImageMimeType]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
               <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">ProductViz <span className="text-blue-600">AI</span></h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
             <Sparkles className="w-4 h-4 text-amber-500" />
             <span>Powered by Gemini 2.5 Flash Image</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input */}
          <div className="lg:col-span-5 space-y-8">
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
               <h2 className="text-lg font-semibold text-gray-800 mb-4">1. Product Source</h2>
               <ImageUploader 
                 onImageSelect={handleImageSelect} 
                 currentImage={originalImage} 
               />
            </section>

            <section className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-200 transition-opacity ${!originalImage ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
               <h2 className="text-lg font-semibold text-gray-800 mb-4">2. Generate & Edit</h2>
               <Controls 
                 onScenarioSelect={handleGenerate} 
                 onCustomPrompt={handleGenerate}
                 disabled={isLoading || !originalImage}
               />
            </section>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
          </div>

          {/* Right Column: Output */}
          <div className="lg:col-span-7">
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 min-h-[600px] flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Generated Assets</h2>
                <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                   {generatedImages.length} result{generatedImages.length !== 1 && 's'}
                </span>
              </div>
              
              <div className="flex-1">
                <ResultGallery images={generatedImages} isLoading={isLoading} />
              </div>
            </section>
          </div>

        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-6">
         <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
           ProductViz AI &copy; {new Date().getFullYear()}. Built with React, Tailwind & Gemini.
         </div>
      </footer>
    </div>
  );
};

export default App;
