import { BrowserRouter, Routes, Route } from 'react-router'
import UploadForm from './components/UploadForm'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UploadForm/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
