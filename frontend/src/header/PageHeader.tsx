import { AlignRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

function PageName({ pageName }: { pageName: string }) {
  return (
    <div className="flex items-center gap-2">
      <AlignRight />
      <h1 className="font-bold text-xl">{pageName}</h1>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="flex items-center relative">
      <Input
        type="text"
        className="block m-0 border border-stone-900 rounded-xl pl-3 pr-10 py-1"
        placeholder="Search"
      />
      <Search className="absolute right-2" />
    </div>
  );
}

export default function PageHeader({ pageName }: { pageName: string }) {
  return (
    <div className="bg-white w-full py-5 px-7 flex justify-between items-center drop-shadow-md">
      <PageName pageName={pageName} />
      <SearchBar />
    </div>
  );
}
