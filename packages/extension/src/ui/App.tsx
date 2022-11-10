import { InitiallyDarkThemeProvider as ArgentTheme } from "@argent/ui"
import { localStorageManager } from "@chakra-ui/react"
import { ThemeProvider as MuiThemeProvider } from "@mui/material"
import { FC, Suspense, useEffect } from "react"
import { SWRConfig } from "swr"

import AppErrorBoundaryFallback from "./AppErrorBoundaryFallback"
import { AppRoutes } from "./AppRoutes"
import { ErrorBoundary } from "./components/ErrorBoundary"
import { AppDimensions } from "./components/Responsive"
import { LoadingScreen } from "./features/actions/LoadingScreen"
import DevUI from "./features/dev/DevUI"
import { useTracking } from "./services/analytics"
import SoftReloadProvider from "./services/resetAndReload"
import { useSentryInit } from "./services/sentry"
import { swrCacheProvider } from "./services/swr"
import { ThemeProvider, muiTheme } from "./theme"

export const App: FC = () => {
  useTracking()
  useSentryInit()
  useEffect(() => {
    /** Ensure colour mode is dark - may previously have defaulted to 'white' */
    localStorageManager.set("dark")
  }, [])
  return (
    <SoftReloadProvider>
      <SWRConfig value={{ provider: () => swrCacheProvider }}>
        <MuiThemeProvider theme={muiTheme}>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700;900&display=swap"
            rel="stylesheet"
          />
          <ThemeProvider>
            <ArgentTheme>
              <AppDimensions>
                {process.env.SHOW_DEV_UI && <DevUI />}
                <ErrorBoundary fallback={<AppErrorBoundaryFallback />}>
                  <Suspense fallback={<LoadingScreen />}>
                    <AppRoutes />
                  </Suspense>
                </ErrorBoundary>
              </AppDimensions>
            </ArgentTheme>
          </ThemeProvider>
        </MuiThemeProvider>
      </SWRConfig>
    </SoftReloadProvider>
  )
}
