import { Navigate, createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/app/layout/AppLayout'
import { HomePage } from '@/features/home/HomePage'
import { SignInPage } from '@/features/auth/SignInPage'
import { SignUpPage } from '@/features/auth/SignUpPage'
import { ProtectedRoute } from '@/features/auth/ProtectedRoute'
import { ClientPanelPage } from '@/features/client/ClientPanelPage'
import { CheckoutPage } from '@/features/client/CheckoutPage'
import {
  ArchitecturePage,
  CommunityPage,
  FabricationPage,
  OptimizationPage,
} from '@/features/stages/StagePage'

export const appRouter = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'architecture', element: <ArchitecturePage /> },
      { path: 'fabrication', element: <FabricationPage /> },
      { path: 'optimization', element: <OptimizationPage /> },
      { path: 'community', element: <CommunityPage /> },
      { path: 'sign-in', element: <SignInPage /> },
      { path: 'sign-up', element: <SignUpPage /> },
      {
        path: 'client-panel',
        element: (
          <ProtectedRoute>
            <ClientPanelPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'checkout',
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])
