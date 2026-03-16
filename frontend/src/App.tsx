import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { MeasurementPage } from './pages/MeasurementPage'
import { FluentProvider, makeStyles, webLightTheme } from '@fluentui/react-components'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const useStyles = makeStyles({
  provider: {
    display: 'flex',
    flex: 1,
    width: '100%',
  },
  frame: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  }
});

function App() {
  const styles = useStyles();

  return (
    <FluentProvider className={styles.provider} theme={webLightTheme}>
      <QueryClientProvider client={new QueryClient()}>
        <BrowserRouter>
          <div className={styles.frame}>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/measurements' element={<MeasurementPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </FluentProvider>
  )
}

export default App
