import { DataTable } from "./MarketTable";
import { columns } from "./MarketTableType";

import data from "./MarketData";

const MarketPage = () => {
  return (
    <div className="p-8 h-full bg-blue-100 bg-opacity-50">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default MarketPage;
