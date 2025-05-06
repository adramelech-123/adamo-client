import React, { useState } from 'react';
import UploadArea from './UploadArea';
import FilePreview from './FilePreview';
import UploadStatus from './UploadStatus';
import ProgressIndicator from './ProgressIndicator';
import { FileState, StructuredData } from '.././types'
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


const IDUploadContainer: React.FC = () => {
  const [fileState, setFileState] = useState<FileState>({
    file: null,
    preview: null,
    status: 'idle',
    progress: 0,
    error: null,
  });

  const [structuredData, setStructuredData] = useState<StructuredData | null>(null);

  const handleFileSelected = (file: File) => {
    // Create a preview URL for the image
    const previewUrl = URL.createObjectURL(file);
    
    setFileState({
      file,
      preview: previewUrl,
      status: 'selected',
      progress: 0,
      error: null,
    });
  };

  // Upload Data to Model and return model output
  const handleUpload = async () => {
    if (!fileState.file) return;
  
    try {
      setFileState(prev => ({ ...prev, status: 'uploading', progress: 0 }));
  
      const formData = new FormData();
      formData.append('image', fileState.file);
  
      const response = await fetch('http://localhost:5000/process', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); 
      setStructuredData(data.structured_data);
      console.log('Server response:', data.structured_data
      );
      toast.success('Your image has been processed succesfully! ☺️')


  
      setFileState(prev => ({ ...prev, status: 'success', progress: 100 }));
    } catch (error) {
      setFileState(prev => ({
        ...prev,
        status: 'error',
        error: 'Failed to upload file. Please try again.'
      }));
  
      console.error(error);
      toast.error('Upload failed. Please try again! 😥');
    }
  };

  // Save Model Output to DB (Firestore)
  const addStructuredDataToFirestore = async (data: StructuredData): Promise<void> => {
    try {
      
      const collectionRef = collection(db, "processed_docs");
  
      // Use addDoc to add the data. 
      const docRef = await addDoc(collectionRef, data);
  
      console.log("Document written with ID: ", docRef.id);
      // toast.success("Your ID has been saved to our database.");
    } catch (e) {
      console.error("Error adding document: ", e);
      
      toast.error("Failed to save to database.")
      throw e; 
    }
  };

    // Save Original copy Model Output to DB (Firestore)
    const addOriginalStructuredDataToFirestore = async (data: StructuredData): Promise<void> => {
      try {
        
        const collectionRef = collection(db, "original_docs");
        const docRef = await addDoc(collectionRef, data);
    
        console.log("Document written with ID: ", docRef.id);
        // toast.success("Your ID has been saved to our database.");
      } catch (e) {
        console.error("Error adding original copy to database: ", e);
        
        toast.error("Failed to save original copy to database.")
        throw e; 
      }
    };
  

  // Reset modelOutput after submission to DB
  const handleReset = () => {
    
    // Clean up the object URL to avoid memory leaks
    if (fileState.preview) {
      URL.revokeObjectURL(fileState.preview);
    }
    
    setFileState({
      file: null,
      preview: null,
      status: 'idle',
      progress: 0,
      error: null,
    });

    setStructuredData(null);
  };

  // Save Processed ID to DB Handler
  const handleSaveData = async (finalized: boolean) => {
    if (!structuredData) {
      toast.warn("No structured data to save.");
      return;
    }

    const updatedData = {
      ...structuredData,
      finalized,
    }
  
    // setSaveStatus('saving');
    try {
      await addStructuredDataToFirestore(updatedData);
      await addOriginalStructuredDataToFirestore(updatedData)
      // setSaveStatus('success');
      console.log("Structured data saved to Firestore!");
      // Optional: Show a success message
      if (updatedData.finalized == true) {
        toast.success("Congratulations! Your ID has been verified. 👍")
      } else {
        toast.success("Your ID has been submitted for verification! Please check your status later.")
      }
      
      handleReset(); 
    } catch (error) {
      // setSaveStatus('error');
      console.error("Failed to save structured data:", error);
      // Show an error message to the user
      toast.error("Failed to process ID data! ❌")
    }
  };

  
  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <ToastContainer position="top-right" autoClose={6000} hideProgressBar={false} />
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Upload Your ID</h2>
      
      {fileState.status === 'idle' || fileState.status === 'error' ? (
        <UploadArea 
          onFileSelected={handleFileSelected} 
          error={fileState.error}
        />
      ) : fileState.status === 'selected' ? (
        <FilePreview 
          preview={fileState.preview} 
          fileName={fileState.file?.name || ''} 
          onUpload={handleUpload}
          onCancel={handleReset}
        />
      ) : (
        <div className="space-y-6">
          {fileState.preview && (
            <>
              <div className="relative overflow-hidden rounded-lg">
                <img 
                  src={fileState.preview} 
                  alt="ID Preview" 
                  className="w-full h-48 object-cover"
                />
                
                <div className="absolute inset-0 bg-black opacity-60 flex items-center justify-center">
                  <ProgressIndicator progress={fileState.progress} />
                </div>
              </div>

              {/* Display ID Data when progress is 100% */}
              {
                fileState.progress === 100 && (
                  <div className="p-4 bg-white rounded-xl shadow-md max-w-md mx-auto">
                    <table className="w-full text-left text-xs text-gray-700">
                      <tbody>
                        <tr className="border-b">
                          <th className="py-2 pr-4 font-medium text-gray-600">First Name</th>
                          <td className="py-2">{structuredData?.firstname || 'N/A'}</td>
                        </tr>
                        <tr className="border-b">
                          <th className="py-2 pr-4 font-medium text-gray-600">Surname</th>
                          <td className="py-2">{structuredData?.surname || 'N/A'}</td>
                        </tr>
                        <tr className="border-b">
                          <th className="py-2 pr-4 font-medium text-gray-600">Document Type</th>
                          <td className="py-2">{structuredData?.doc_type || 'N/A'}</td>
                        </tr>
                        <tr className="border-b">
                          <th className="py-2 pr-4 font-medium text-gray-600">Document Number</th>
                          <td className="py-2">{structuredData?.doc_num || 'N/A'}</td>
                        </tr>
                        <tr>
                          <th className="py-2 pr-4 font-medium text-gray-600">Country</th>
                          <td className="py-2">{structuredData?.country || 'N/A'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )
              }
              
            </>
          )}
          
          <UploadStatus 
            status={fileState.status} 
            onSubmit={(finalized: boolean) => handleSaveData(finalized)}
            onReset={handleReset}
          />
        </div>
      )}

      <p className="mt-6 text-xs text-gray-500">
        We accept JPG, PNG, WEBP, or PDF files. Maximum file size is 5MB. 
        Your ID will be securely processed and stored in accordance with our privacy policy.
      </p>
    </div>
  );
};

export default IDUploadContainer;