import React, { useState, useContext } from "react";
import { DataTable } from "./DataTable";
import { getColumns } from "./columns";
import "./HomePage.css";
import { generateFileHash, formatFileSize, sizeToBytes } from "./sizeUtils";

const HomePage = () => {
  interface Activity {
    id: number;
    name: string;
    size: string;
    hash: string;
    status: string;
    showDropdown?: boolean;
    peers?: number;
    isEditing?: boolean;
    isSelected?: boolean;
  }
  const [activities, setActivities] = useState<Activity[]>([
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
  
  const isAnyActivitySelected = activities.some(
    (activity) => activity.isSelected
  );
  const totalFiles = activities.length;

  const networkStatus = "Healthy";

  const toggleDropdown = (id: number) => {
    if (id === -1) {
      setActivities((currentActivities) =>
        currentActivities.map((activity) => ({
          ...activity,
          showDropdown: false,
        }))
      );
    } else {
      setActivities((currentActivities) =>
        currentActivities.map((activity) =>
          activity.id === id
            ? { ...activity, showDropdown: !activity.showDropdown }
            : activity
        )
      );
    }
  };

  const updateActivityName = (id: number, newName: string) => {
    setActivities((currentActivities) =>
      currentActivities.map((activity) =>
        activity.id === id ? { ...activity, name: newName } : activity
      )
    );
  };

  const toggleEdit = (id: number) => {
    setActivities((currentActivities) =>
      currentActivities.map((activity) =>
        activity.id === id
          ? { ...activity, isEditing: !activity.isEditing }
          : activity
      )
    );
  };

  const removeAllSelected = () => {
    setActivities((currentActivities) =>
      currentActivities.filter((activity) => !activity.isSelected)
    );
  };

  const updateSelection = (id: number, isSelected: boolean) => {
    setActivities((currentActivities) =>
      currentActivities.map((activity) =>
        activity.id === id ? { ...activity, isSelected } : activity
      )
    );
  };

  const updateAllSelections = (isSelected: boolean) => {
    setActivities((currentActivities) =>
      currentActivities.map((activity) => ({
        ...activity,
        isSelected: isSelected,
      }))
    );
  };

  const addFileToActivities = async (file: File) => {
    const hash = await generateFileHash(file);
    const newActivity: Activity = {
      id: activities.length + 1,
      name: file.name,
      size: formatFileSize(file.size),
      hash: hash,
      status: "Uploaded",
      showDropdown: false,
    };

    setActivities((currentActivities) => [...currentActivities, newActivity]);
  };

  const removeActivity = (id: number) => {
    setActivities((currentActivities) =>
      currentActivities.filter((activity) => activity.id !== id)
    );
  };

  const handleDrop = async (event: React.DragEvent) => {
    document.getElementById("home-page")!.style.backgroundColor = "";
    event.preventDefault();
    const items = event.dataTransfer.items;
    const files: File[] = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i].webkitGetAsEntry();
      if (item) {
        const fileEntries = await getFilesRecursively(item);
        files.push(...fileEntries);
      }
    }

    const newActivitiesPromises = files.map(async (file, index) => {
      const hash = await generateFileHash(file);
      return {
        id: activities.length + index + 1,
        name: file.name,
        size: formatFileSize(file.size),
        hash: hash,
        status: "Uploaded",
        showDropdown: false,
      };
    });

    const newActivities = await Promise.all(newActivitiesPromises);

    setActivities((currentActivities) => [
      ...currentActivities,
      ...newActivities,
    ]);
  };

  const getFilesRecursively = async (entry: any): Promise<File[]> => {
    const files: File[] = [];

    if (entry.isFile) {
      const file = await new Promise<File>((resolve) => entry.file(resolve));
      files.push(file);
    } else if (entry.isDirectory) {
      const dirReader = entry.createReader();
      const entries = await new Promise<any[]>((resolve) => {
        dirReader.readEntries(resolve);
      });

      for (const childEntry of entries) {
        const childFiles = await getFilesRecursively(childEntry);
        files.push(...childFiles);
      }
    }

    return files;
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    document.getElementById("home-page")!.style.backgroundColor =
      "rgba(0, 123, 255, 0.1)";
    event.dataTransfer.dropEffect = "copy";
  };

  const handleDragLeave = (event: React.DragEvent) => {
    document.getElementById("home-page")!.style.backgroundColor = "";
  };

  const totalSizeBytes = activities.reduce((total, activity) => {
    return total + sizeToBytes(activity.size);
  }, 0);

  const totalSizeFormatted = formatFileSize(totalSizeBytes);

  return (
    <div
      id="home-page"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`relative w-full`}
    >
      <div className="dashboard-overview bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-200">Dashboard Overview</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="file-hosted bg-gray-700 p-4 rounded-lg">
            <span className="block text-sm font-medium text-gray-400">
              Files Hosted
            </span>
            <span className="block text-2xl font-bold text-white">
              {totalFiles}
            </span>
          </div>
          <div className="storage-used bg-gray-700 p-4 rounded-lg">
            <span className="block text-sm font-medium text-gray-400">
              Total Storage Used
            </span>
            <span className="block text-2xl font-bold text-white">
              {totalSizeFormatted}
            </span>
          </div>
          <div className="network-status bg-gray-700 p-4 rounded-lg">
            <span className="block text-sm font-medium text-gray-400">
              Network Status
            </span>
            <span className={`block text-2xl font-bold ${networkStatus === "Healthy" ? "text-green-400" : "text-red-400"}`}>
              {networkStatus}
            </span>
          </div>
        </div>
      </div>
      <DataTable
        columns={getColumns(
          toggleDropdown,
          updateActivityName,
          toggleEdit,
          removeAllSelected,
          updateSelection,
          updateAllSelections,
          removeActivity,
          activities
        )}
        data={activities}
        totalSize={totalSizeFormatted}
        onFileAdded={addFileToActivities}
        activities={activities}
      />
      {isAnyActivitySelected && (
        <div
          className={`ml-80 fixed bottom-0 inset-x-0 mx-auto p-4 bg-white shadow-lg flex items-center justify-between transition-transform duration-300 ease-in-out ${
            isAnyActivitySelected ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mr-3 px-4 py-1">
                {activities.filter((activity) => activity.isSelected).length}
              </span>
              <span className="font-semibold">
                {activities.filter((activity) => activity.isSelected).length}{" "}
                Item selected
              </span>
              <span className="text-sm text-gray-600">
                Total size:{" "}
                {formatFileSize(
                  activities
                    .filter((activity) => activity.isSelected)
                    .reduce(
                      (total, activity) => total + sizeToBytes(activity.size),
                      0
                    )
                )}
              </span>
            </div>
            <div className="flex space-x-2">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 text-sm rounded transition ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Share link
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 text-sm rounded transition ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Download
              </button>
              <button
                onClick={removeAllSelected}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 text-sm rounded transition ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Remove
              </button>
            </div>
          </div>
          <button
            onClick={() => updateAllSelections(false)}
            className="text-gray-600 hover:text-gray-800 transition ease-in-out focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
