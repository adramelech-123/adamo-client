import React from 'react';

interface FilePreviewProps {
  preview: string | null;
  fileName: string;
  onUpload: () => void;
  onCancel: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ 
  preview, 
  fileName, 
  onUpload, 
  onCancel 
}) => {
  // Determine if the file is a PDF (to handle display differently)
  const isPDF = fileName.toLowerCase().endsWith('.pdf');
  
  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-lg border border-gray-200">
        {isPDF ? (
          <div className="h-48 bg-gray-100 flex items-center justify-center">
            <div className="flex flex-col items-center text-gray-500">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              <span className="mt-2 text-sm font-medium">PDF Document</span>
            </div>
          </div>
        ) : (
          <img 
            src={preview || ''} 
            alt="ID Preview" 
            className="w-full h-48 object-contain bg-gray-100"
          />
        )}
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 pt-8">
          <p className="text-white text-sm truncate font-medium">
            {fileName}
          </p>
        </div>
      </div>
      

      {/* Buttons for Client Approval after model processing */}
      <div className="flex items-center justify-between">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Cancel
        </button>
        
        <button
          onClick={onUpload}
          className="px-4 py-2 bg-slate-500 text-white text-sm font-medium rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all duration-200 transform active:scale-95"
        >
          Upload ID
        </button>
      </div>
    </div>
  );
};

export default FilePreview;