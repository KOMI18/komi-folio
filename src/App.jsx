
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { EventsHackathonsPage } from "./pages/Event";
import { Layout } from "./Layout";
import { Toaster } from "@/components/ui/toaster";
import {BlogComingSoonPage} from "./pages/Blog"
function App() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventsHackathonsPage />} />
          <Route path="/blog" element={<BlogComingSoonPage />} />

        </Route>

        {/* Page 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster />
    </BrowserRouter>
  );
}

export default App;
