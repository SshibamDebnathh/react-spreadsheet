import { TopNavBar } from "./components/TopNavBar";
import { ActionButtons } from "./components/ActionButtons";
import { TableGrid } from "./components/TableGrid";
import { FooterTabs } from "./components/FooterTabs";

function App() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <TopNavBar />
      <ActionButtons />
      <main className="flex-1 overflow-auto">
        <TableGrid />
      </main>
      <footer className="sticky bottom-0 z-30 bg-white shadow-md px-2 sm:px-4 md:px-6 lg:px-10">
        <FooterTabs />
      </footer>
     
    </div>
  );
}

export default App;
