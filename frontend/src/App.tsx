import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CurrenciesPage } from './modules/expenses/pages/CurrenciesPage';
import { MeasurementPage } from './modules/measurements/pages/MeasurementPage';
import { AppBar } from './components/common/AppBar';
import { useEffect, useState } from 'react';
import { getInitialTheme, THEME_STORAGE_KEY, THEMES, type ThemeKey } from './common/theme';
import { AccountsPage } from './modules/expenses/pages/AccountsPage';
import { AccountPage } from './modules/expenses/pages/AccountPage';
import { ExpenseCategoriesPage } from './modules/expenses/pages/ExpenseCategoriesPage';
import { TasksPage } from './modules/tasks/pages/TasksPage';
import { Box, FormControl, MenuItem, Select, ThemeProvider, type SelectChangeEvent } from '@mui/material';
import { MeasurementCategoriesPage } from './modules/measurements/pages/MeasurementCategoriesPage';

function App() {
  const [themeKey, setThemeKey] = useState<ThemeKey>(getInitialTheme());
  const current = THEMES[themeKey];

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, themeKey);
  }, [themeKey]);

  const handleThemeChange = (event: SelectChangeEvent) => {
    setThemeKey(event.target.value as ThemeKey);
  };

  return (
    <ThemeProvider theme={current.theme}>
      <QueryClientProvider client={new QueryClient()}>
        <BrowserRouter>
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              width: '100%',
              minHeight: '100vh',
              bgcolor: 'background.primary',
              color: 'text.primary',
            }}
          >
            <AppBar
              title="KarcagHome"
              route="/"
              right={
                <FormControl size="small">
                  <Select
                    value={themeKey}
                    onChange={handleThemeChange}
                    variant="outlined"
                    sx={{ bgcolor: 'background.paper', minWidth: 120 }}
                  >
                    {Object.entries(THEMES).map(([key, value]) => (
                      <MenuItem key={key} value={key}>
                        {value.caption}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              }
            ></AppBar>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<MeasurementPage />} />
              <Route path="/measurements" element={<MeasurementPage />} />
              <Route path="/measurement-categories" element={<MeasurementCategoriesPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/accounts" element={<AccountsPage />} />
              <Route path="/accounts/:id" element={<AccountPage />} />
              <Route path="/currencies" element={<CurrenciesPage />} />
              <Route path="/expense-categories" element={<ExpenseCategoriesPage />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
