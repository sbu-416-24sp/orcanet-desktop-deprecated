import { DataTable } from "./MarketTable";
import { columns } from "./columns";

import fakeSeeds from "./fakeSeeds";

const MarketPage = () => {
  return (
    <div className="p-8 h-full bg-blue-100 bg-opacity-50">
      <DataTable columns={columns} data={fakeSeeds} />
    </div>
  );
};

export default MarketPage;
