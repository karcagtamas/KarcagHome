import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import {
  Dropdown,
  Option,
  FluentProvider,
  makeStyles,
  tokens,
  webDarkTheme,
  webLightTheme,
} from '@fluentui/react-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ExpensesPage } from './modules/expenses/pages/ExpensesPage';
import { CurrenciesPage } from './modules/expenses/pages/CurrenciesPage';
import { MeasurementPage } from './modules/measurements/pages/MeasurementPage';
import { AppBar } from './components/common/AppBar';
import { useState } from 'react';

type ThemeMode = 'light' | 'dark';

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
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
  },
});

function App() {
  const styles = useStyles();

  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  const theme = themeMode === 'dark' ? webDarkTheme : webLightTheme;

  return (
    <FluentProvider className={styles.provider} theme={theme}>
      <QueryClientProvider client={new QueryClient()}>
        <BrowserRouter>
          <div className={styles.frame}>
            <AppBar
              title="KarcagHome"
              route="/"
              right={
                <Dropdown
                  value={themeMode === 'dark' ? 'Dark' : 'Light'}
                  selectedOptions={[themeMode]}
                  onOptionSelect={(_, data) => {
                    setThemeMode(data.optionValue as ThemeMode);
                  }}
                >
                  <Option value="light">Light</Option>
                  <Option value="dark">Dark</Option>
                </Dropdown>
              }
            ></AppBar>
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
