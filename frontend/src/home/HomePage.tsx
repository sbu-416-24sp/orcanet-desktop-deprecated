import React, { useCallback, useRef, useState } from "react";

const HomePage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle file upload here
      console.log(e.dataTransfer.files[0]);
    }
  }, []);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // Example data - replace with actual data retrieval logic
  const nodeInfo = {
    status: "Connected",
    balance: "Orca Coin 1000",
    peerID: "12D3KooWM1J3AZKnEvVtEVjwFka2Z2Z9EZo5XVzUoyrAofWRUUWK",
    publicKey: "CAESIKY9RkdcwVuPzyQPn2SX7CEJRIj87Y1Mxtm0S5ABQMvI",
    gateway: "http://127.0.0.1:8080",
  };

  // Mock recent activities data
  const recentActivities = [
    { id: 1, name: "File1.txt", date: "2023-04-01", action: "Uploaded" },
    { id: 2, name: "Photo.png", date: "2023-04-02", action: "Uploaded" },
    { id: 3, name: "Document.pdf", date: "2023-04-03", action: "Deleted" },
    { id: 3, name: "Document.pdf", date: "2023-04-03", action: "Deleted" },
    { id: 3, name: "Document.pdf", date: "2023-04-03", action: "Deleted" },
    { id: 3, name: "Document.pdf", date: "2023-04-03", action: "Deleted" },
    { id: 3, name: "Document.pdf", date: "2023-04-03", action: "Deleted" },
    { id: 3, name: "Document.pdf", date: "2023-04-03", action: "Deleted" },
  ];

  return (
    <main className="flex-1 text-white p-2">
      {/* Node Status Section */}
      {/* <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">
          OrcaNet Home
        </h2>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-lg mb-4 font-semibold text-gray-800">
            Node Information
          </p>
          <div className="grid grid-cols-1 gap-6 text-gray-600">
            <div className="md:flex justify-between">
              <p className="truncate">
                <strong>Status:</strong> {nodeInfo.status}
              </p>
              <p className="truncate">
                <strong>Gateway:</strong> {nodeInfo.gateway}
              </p>
            </div>
            <p className="break-words">
              <strong>Peer ID:</strong> {nodeInfo.peerID}
            </p>
            <p className="break-words">
              <strong>Public Key:</strong> {nodeInfo.publicKey}
            </p>
          </div>
        </div>
      </section> */}

      <section className="mb-2 p-2">
        {" "}
        <h2 className="text-xl font-bold mb-2 text-black">Recent Activity</h2>{" "}
        <div
          className="bg-white text-gray-800 p-4 rounded shadow"
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {recentActivities.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      File Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivities.map((activity) => (
                    <tr key={activity.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {activity.name}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {activity.action}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {activity.date}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No recent activity</p>
          )}
        </div>
      </section>

      {/* <section className="p-2 bg-white text-gray-800 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Upload Files</h2>
        <div
          className={`p-10 border-2 border-dashed ${
            dragging ? "border-purple-500" : "border-gray-300"
          } rounded cursor-pointer`}
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          Drag and drop files here, or click to select files
        </div>
        <input type="file" ref={fileInputRef} style={{ display: "none" }} />
      </section> */}
    </main>
  );
};

export default HomePage;
