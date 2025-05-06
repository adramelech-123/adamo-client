
import IDUploadContainer from "./IDUploadContainer"
import Logo from "/logo.svg"

const UploadForm = () => {
    
  return (
    <div className="min-h-screen bg-gradient-to-bl from-blue-50 to-slate-400 flex flex-col items-center justify-center p-4">
    <div className="w-full max-w-md">
      <div className="text-center mb-8 flex flex-col items-center">
        <img src={Logo} alt="AdamoID Logo" width={200}/>
        <h1 className="text-2xl font-bold text-gray-800 mt-4">ID Verification</h1>
        <p className="text-gray-600 mt-2">
          Upload a photo of your government-issued ID to verify your identity
        </p>
      </div>

            <IDUploadContainer/>

      <p className="text-center text-gray-500 text-xs mt-8">
        Your security is our priority. All uploads are encrypted and securely processed.
      </p>
    </div>
  </div>
    
  )
}

export default UploadForm