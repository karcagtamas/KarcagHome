import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { FluentProvider, makeStyles, webLightTheme } from '@fluentui/react-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ExpensesPage } from './modules/expenses/pages/ExpensesPage';
import { CurrenciesPage } from './modules/expenses/pages/CurrenciesPage';
import { MeasurementPage } from './modules/measurements/pages/MeasurementPage';
import { AppBar } from './components/common/AppBar';

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
  },
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
});

function App() {
  const styles = useStyles();

  return (
    <FluentProvider className={styles.provider} theme={webLightTheme}>
      <QueryClientProvider client={new QueryClient()}>
        <BrowserRouter>
          <div className={styles.frame}>
            <AppBar title="KarcagHome"></AppBar>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<MeasurementPage />} />
              <Route path="/measurements" element={<MeasurementPage />} />
              <Route path="/tasks" element={<MeasurementPage />} />
              <Route path="/expenses" element={<ExpensesPage />} />
              <Route path="/currencies" element={<CurrenciesPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </FluentProvider>
  );
}

export default App;
