import React, { useCallback, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import { sizeToBytes, generateFileHash } from "./sizeUtils";

const HomePage = () => {
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

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState<number[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [renamingActivityId, setRenamingActivityId] = useState<number | null>(
    null
  );

const initiateRename = (id: number) => {
  setRenamingActivityId(id);
  setRecentActivities((currentActivities) =>
    currentActivities.map((activity) => {
      if (activity.id === id) {
        // close the dropdown for the activity being renamed
        return { ...activity, showDropdown: false };
      }
      return activity;
    })
  );

  // add click listener to close the dropdown if clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    let targetElement = event.target as HTMLElement;

    if (!targetElement.closest(`#rename-input-${id}`)) {
      setRenamingActivityId(null); // Exit renaming mode
      document.removeEventListener('click', handleClickOutside);
    }
  };

  setTimeout(() => document.addEventListener('click', handleClickOutside), 0);
};



  const handleRename = (id: number, newName: string) => {
    setRecentActivities((currentActivities) =>
      currentActivities.map((activity) => {
        if (activity.id === id) {
          return { ...activity, name: newName };
        }
        return activity;
      })
    );
    setRenamingActivityId(null); // Exit renaming mode
  };

  

  const handleSelectAllChange = useCallback(() => {
    if (selectAll) {
      setSelectedActivities([]);
      setShowPopup(false);
    } else {
      const allActivityIds = recentActivities.map((activity) => activity.id);
      setSelectedActivities(allActivityIds);
      setShowPopup(true);
    }
    setSelectAll(!selectAll);
  }, [selectAll, recentActivities]);

  const handleActivitySelectChange = useCallback((activityId: number) => {
    setSelectedActivities((prevSelectedActivities) => {
      const newSelectedActivities = prevSelectedActivities.includes(activityId)
        ? prevSelectedActivities.filter((id) => id !== activityId)
        : [...prevSelectedActivities, activityId];

      setShowPopup(newSelectedActivities.length > 0);

      return newSelectedActivities;
    });
  }, []);
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  }, []);

  interface Activity {
    id: number;
    name: string;
    size: string;
    hash: string;
    status: string;
    showDropdown?: boolean;
    peers?: number;
  }

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
      const file =
        e.dataTransfer.files && e.dataTransfer.files[0]
          ? e.dataTransfer.files[0]
          : null;
      if (file) {
        const newActivity = {
          id: recentActivities.length + 1,
          name: file.name,
          size: `${(file.size / 1024).toFixed(2)}KiB`, // size is in bytes and converting to KiB
          hash: await generateFileHash(file),
          status: "Uploaded",
          showDropdown: false,
          peers: 0,
        };
        setRecentActivities([...recentActivities, newActivity]);
      }
    },
    [recentActivities]
  );

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
            <h3 className="text-1xl font-semibold text-black">
              {(totalSizeBytes / (1024 * 1024)).toFixed(2)} MiB
            </h3>
            <span className="text-sm font-medium text-gray-600">
              All Blocks
            </span>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={async (e) => {
              const file = e.target.files ? e.target.files[0] : null;
              if (file) {
                const newActivity = {
                  id: recentActivities.length + 1,
                  name: file.name,
                  size: `${(file.size / 1024).toFixed(2)}KiB`, // size is in bytes and converted to KiB
                  hash: await generateFileHash(file),
                  status: "Uploaded",
                  showDropdown: false,
                  peers: 0,
                };
                setRecentActivities([...recentActivities, newActivity]);
              }
            }}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-5 rounded"
            onClick={() => fileInputRef.current?.click()}
          >
            + Import
          </button>
        </div>
      </section>
      <section className="mb-2 p-2">
        <div
          className="bg-white text-gray-800 p-4 rounded shadow"
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
                      <input
                        type="checkbox"
                        className="w-4 h-4 mt-3 checkbox-purple"
                        checked={selectAll}
                        onChange={handleSelectAllChange}
                      />
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
                          <input
                            type="checkbox"
                            className="w-4 h-4 checkbox-purple"
                            checked={selectedActivities.includes(activity.id)}
                            onChange={() =>
                              handleActivitySelectChange(activity.id)
                            }
                          />
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
                                onClick={(e) => {
                                  e.preventDefault();
                                  initiateRename(activity.id);
                                }}
                              >
                                Rename
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
                          {activity.id === renamingActivityId ? (
                            <input
                              type="text"
                              defaultValue={activity.name}
                              onBlur={(e) =>
                                handleRename(activity.id, e.target.value)
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  handleRename(
                                    activity.id,
                                    (e.target as HTMLInputElement).value
                                  );
                                }
                              }}
                              autoFocus
                              className="text-gray-900 w-full max-w-xs overflow-hidden"
                              style={{
                                resize: "none",
                                maxHeight: "30px",
                                overflowY: "auto",
                              }}
                            />
                          ) : (
                            <p className="text-gray-900 whitespace-no-wrap"></p>
                          )}
                          {showPopup && (
                            <div className="fixed bottom-0 left-250 right-0 p-4 bg-white shadow-lg z-50">
                              <div className="flex justify-between items-center p-3 rounded">
                                <div className="space-x-2">
                                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs">
                                    Download
                                  </button>
                                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs">
                                    Remove
                                  </button>
                                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs">
                                    Inspect
                                  </button>
                                  <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-xs"
                                    onClick={() => {
                                      setShowPopup(false);
                                      setSelectedActivities([]);
                                    }}
                                  >
                                    Unselect all
                                  </button>
                                </div>
                              </div>
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
