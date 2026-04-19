import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Brand from "./pages/Brand";
import Menu from "./pages/Menu";
import Space from "./pages/Space";
import Reservation from "./pages/Reservation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/brand" component={Brand} />
      <Route path="/menu" component={Menu} />
      <Route path="/space" component={Space} />
      <Route path="/reservation" component={Reservation} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
