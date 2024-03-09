import React, { useCallback, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import { sizeToBytes } from "./sizeUtils";

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

  interface Activity {
    id: number;
    name: string;
    size: string;
    hash: string;
    status: string;
    showDropdown?: boolean;
    peers?: number;
  }

  // Mock recent activities data with id, name, size, hash, status
  const [recentActivities, setRecentActivities] = useState<Activity[]>([
    {
      id: 1,
      name: "File1.txt",
      size: "150KiB",
      hash: "a1b2c3d4e5a1b2c3d4e5",
      status: "Uploaded",
      showDropdown: false,
      peers: 3,
    },
    {
      id: 2,
      name: "Photo.png",
      size: "45KiB",
      hash: "f6g7h8i9j0f6g7h8i9j0",
      status: "Uploaded",
      showDropdown: false,
      peers: 1,
    },
    {
      id: 3,
      name: "Document.pdf",
      size: "120KiB",
      hash: "k1l2m3n4o5k1l2m3n4o5",
      status: "Deleted",
      showDropdown: false,
    },
    {
      id: 4,
      name: "Presentation.pptx",
      size: "500KiB",
      hash: "p6q7r8s9t0p6q7r8s9t0",
      status: "Uploaded",
      showDropdown: false,
      peers: 29,
    },
    {
      id: 5,
      name: "Spreadsheet.xlsx",
      size: "85KiB",
      hash: "u1v2w3x4y5u1v2w3x4y5",
      status: "Updated",
      showDropdown: false,
      peers: 12,
    },
    {
      id: 6,
      name: "Archive.zip",
      size: "2.5MiB",
      hash: "z6a7b8c9d0z6a7b8c9d0",
      status: "Uploaded",
      showDropdown: false,
      peers: 19,
    },
    {
      id: 7,
      name: "Ebook.epub",
      size: "1MiB",
      hash: "e1f2g3h4i5e1f2g3h4i5",
      status: "Uploaded",
      showDropdown: false,
      peers: 4,
    },
    {
      id: 8,
      name: "Code.js",
      size: "25KiB",
      hash: "j6k7l8m9n0j6k7l8m9n0",
      status: "Updated",
      showDropdown: false,
      peers: 6,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const totalSizeBytes = recentActivities.reduce((total, activity) => {
    return total + sizeToBytes(activity.size);
  }, 0);

  return (
    <main className="home flex-1 text-white p-2">
      <SearchBar onSearch={(term) => setSearchTerm(term.toLowerCase())} />

      <section className="mb-4 mt-4 mr-16 w-1/2 ml-auto flex flex-col bg-gray-100 p-2 rounded-t font-mono">
        <div className="flex justify-between items-center mb-1">
          <div className="flex flex-col items-center">
            <h3 className="ml-2 text-1xm font-semibold text-black">
              {recentActivities.length}
            </h3>
            <span className="text-sm font-medium text-gray-600 ml-2">
              Files
            </span>
          </div>
          <div className="flex flex-col items-center">
          <h3 className="text-1xl font-semibold text-black">{(totalSizeBytes / (1024 * 1024)).toFixed(2)} MiB</h3>
            <span className="text-sm font-medium text-gray-600">
              All Blocks
            </span>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-5 rounded"
            onClick={handleClick}
          >
            + Import
          </button>
        </div>
      </section>
      <section className="mb-2 p-2">
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
                    <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-12">
                      <input type="checkbox" className="w-4 h-4 mt-3" />
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      File Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Size
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Peers
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivities
                    .filter((activity) => activity.hash.includes(searchTerm))
                    .map((activity, index) => (
                      <tr key={activity.id}>
                        <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm text-center">
                          <input type="checkbox" className="w-4 h-4" />
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex flex-col">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {activity.name}
                            </p>
                            <p className="text-gray-500 text-xs whitespace-no-wrap">
                              {activity.hash}
                            </p>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {activity.status}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {activity.size}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {activity.peers ? activity.peers : "-"}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center relative">
                          <button
                            className="text-gray-600 hover:text-gray-900 focus:outline-none"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Toggle visibility logic for dropdown
                              let updatedActivities = [...recentActivities];
                              updatedActivities[index] = {
                                ...updatedActivities[index],
                                showDropdown:
                                  !updatedActivities[index].showDropdown,
                              };
                              setRecentActivities(updatedActivities);
                            }}
                          >
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                              ></path>
                            </svg>
                          </button>
                          {activity.showDropdown && (
                            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20 border border-blue-200">
                              <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-200"
                              >
                                Download
                              </a>
                              <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-200"
                              >
                                View File Details
                              </a>
                              <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Copy CID
                              </a>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No activity</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
