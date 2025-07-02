
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import MasksPage from "./pages/MasksPage";
import AQIInfoPage from "./pages/AQIInfoPage";
import AQIMonitorPage from "./pages/AQIMonitorPage";
import MaskRecommendationPage from "./pages/MaskRecommendationPage";
import TipsPage from "./pages/TipsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/masks" element={<MasksPage />} />
            <Route path="/aqi-info" element={<AQIInfoPage />} />
            <Route path="/aqi-monitor" element={<AQIMonitorPage />} />
            <Route path="/mask-recommendation" element={<MaskRecommendationPage />} />
            <Route path="/tips" element={<TipsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
