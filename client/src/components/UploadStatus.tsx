import React from 'react';

interface UploadStatusProps {
  status: string;
  onSubmit: (finalized:boolean) => void;
  onReset?: () => void;
}

const UploadStatus: React.FC<UploadStatusProps> = ({ status, onSubmit, onReset }) => {
  return (
    <div className="flex flex-col items-center">
      {status === 'uploading' && (
        <div className="text-center py-2">
          <p className="text-gray-700 font-medium">Processing your ID...</p>
          <p className="text-sm text-gray-500 mt-1">Please wait while we process your document</p>
        </div>
      )}
      
      {status === 'success' && (
        <div className="text-center py-4 space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <div>
            <p className="text-gray-800 font-medium">ID Processing Complete!</p>
            <p className="text-sm text-gray-500 mt-1">Your ID has been processed please verify if the details above are correct.</p>
          </div>
          
          <div className='flex flex-row space-x-6 justify-center'>
            {/* Set finalized to true */}
            <button
              onClick={() => onSubmit(true)}
              className="mt-4 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg cursor-pointer hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Correct
            </button>

            {/* Set finalized to false */}
            <button
              onClick={() => onSubmit(false)}
              className="mt-4 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg cursor-pointer hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Incorrect
            </button>
          </div>
        </div>
      )}
      
      {status === 'error' && (
        <div className="text-center py-4">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          
          <p className="text-gray-800 font-medium mt-4">Upload Failed</p>
          <p className="text-sm text-gray-500 mt-1">Please try again or contact support.</p>
          
          <button
            onClick={onReset}
            className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadStatus;