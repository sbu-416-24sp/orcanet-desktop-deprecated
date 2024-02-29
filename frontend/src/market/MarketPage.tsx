import { DataTable } from "./DataTable";
import { columns } from "./columns";

import SearchBar from "./SearchBar";

import fakeSeeds from "./fakeSeeds";

import "./market-page.css";

const MarketPage = () => {
  return (
    <div id="market-page">
      <SearchBar />
      <DataTable columns={columns} data={fakeSeeds} />
    </div>
  );
};

export default MarketPage;
