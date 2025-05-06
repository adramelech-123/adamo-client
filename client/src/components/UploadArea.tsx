import React, { useCallback, useState } from 'react';
import { Camera } from 'lucide-react';

interface UploadAreaProps {
  onFileSelected: (file: File) => void;
  error: string | null;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onFileSelected, error }) => {
  // Dragging into the Upload Area
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndProcessFile(file);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onFileSelected]);



  
  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      validateAndProcessFile(file);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onFileSelected]);

  const validateAndProcessFile = (file: File) => {
    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid ID document (JPG, PNG, or PDF)');
      return;
    }
    
    // Check file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      alert('File size exceeds 5MB limit');
      return;
    }
    
    onFileSelected(file);
  };
  
  // Function to trigger mobile camera
  const handleCameraCapture = () => {
    const fileInput = document.getElementById('id-upload-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.setAttribute('capture', 'environment');
      fileInput.click();
    }
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-xl p-6 transition-colors duration-200 ease-in-out flex flex-col items-center justify-center space-y-4 ${
        isDragging 
          ? 'border-blue-500 bg-blue-50' 
          : error 
            ? 'border-red-300 bg-red-50' 
            : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{ minHeight: '200px' }}
    >
      <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-200 ${
        isDragging ? 'bg-blue-100' : error ? 'bg-red-100' : 'bg-gray-200'
      }`}>
        <svg 
          className={`w-8 h-8 ${
            isDragging ? 'text-blue-500' : error ? 'text-red-500' : 'text-gray-500'
          }`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </div>
      
      <div className="text-center">
        <p className="text-sm font-medium text-gray-700">
          {isDragging ? 'Drop your ID here' : 'Drag and drop your ID here'}
        </p>
        <p className="text-xs text-gray-500 mt-1">or</p>

        
        <div className="mt-2 flex flex-col sm:flex-row gap-2 justify-center">
          <label 
            htmlFor="id-upload-input" 
            className="cursor-pointer px-4 py-2 bg-slate-500 text-white text-sm font-medium rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Browse Files
          </label>
          
          <button
            type="button"
            onClick={handleCameraCapture}
            className="flex items-center justify-center gap-1 px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            <Camera size={16} /> Take Photo
          </button>
        </div>
      </div>
      
      {error && (
        <p className="text-sm text-red-600 mt-2 animate-fade-in">{error}</p>
      )}
      
      <input
        id="id-upload-input"
        type="file"
        className="hidden"
        accept="image/jpeg,image/png,application/pdf"
        onChange={handleFileInputChange}
      />
    </div>
  );
};

export default UploadArea;