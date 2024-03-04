import { DataTable } from "./MarketTable";
import { columns } from "./columns";

import fakeSeeds from "./fakeSeeds";

const MarketPage = () => {
  return (
    <div className="p-8">
      <DataTable columns={columns} data={fakeSeeds} />
    </div>
  );
};

export default MarketPage;
