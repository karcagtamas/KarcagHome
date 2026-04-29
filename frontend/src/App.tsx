import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Dropdown, Option, FluentProvider, makeStyles, tokens } from '@fluentui/react-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ExpensesPage } from './modules/expenses/pages/ExpensesPage';
import { CurrenciesPage } from './modules/expenses/pages/CurrenciesPage';
import { MeasurementPage } from './modules/measurements/pages/MeasurementPage';
import { AppBar } from './components/common/AppBar';
import { useEffect, useState } from 'react';
import { getInitialTheme, THEME_STORAGE_KEY, THEMES, type ThemeKey } from './common/theme';

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

  const [themeKey, setThemeKey] = useState<ThemeKey>(getInitialTheme());
  const current = THEMES[themeKey];

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, themeKey);
  }, [themeKey]);

  return (
    <FluentProvider className={styles.provider} theme={current.theme}>
      <QueryClientProvider client={new QueryClient()}>
        <BrowserRouter>
          <div className={styles.frame}>
            <AppBar
              title="KarcagHome"
              route="/"
              right={
                <Dropdown
                  value={current.caption}
                  selectedOptions={[themeKey]}
                  onOptionSelect={(_, data) => {
                    setThemeKey(data.optionValue as ThemeKey);
                  }}
                >
                  {Object.entries(THEMES).map(([key, value]) => (
                    <Option key={key} value={key}>
                      {value.caption}
                    </Option>
                  ))}
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
