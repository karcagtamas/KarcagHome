import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { FluentProvider } from '@fluentui/react-components'
import { HomePage } from './pages/HomePage'
import { MeasurementPage } from './pages/MeasurementPage'

function App() {
  return (
    <FluentProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/measurements' element={<MeasurementPage />} />
        </Routes>
      </BrowserRouter>
    </FluentProvider>
  )
}

export default App
