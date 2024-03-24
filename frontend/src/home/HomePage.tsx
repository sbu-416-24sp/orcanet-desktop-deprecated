import React, { useState } from "react";
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

  const isAnyActivitySelected = activities.some(activity => activity.isSelected);


  const toggleDropdown = (id: number) => {
    setActivities((currentActivities) =>
      currentActivities.map((activity) =>
        activity.id === id
          ? { ...activity, showDropdown: !activity.showDropdown }
          : activity
      )
    );
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
        activity.id === id ? { ...activity, isSelected: isSelected } : activity
      )
    );
  };

  const updateAllSelections = (isSelected: boolean) => {
    console.log(`updateAllSelections called with isSelected: ${isSelected}`);
    setActivities(currentActivities =>
      currentActivities.map(activity => {
        console.log(`Updating activity ${activity.id} isSelected to ${isSelected}`);
        return {
          ...activity,
          isSelected: isSelected,
        };
      })
    );
  };

  const addFileToActivities = async (file: File) => {
    const hash = await generateFileHash(file);
    const newActivity: Activity = {
      id: activities.length + 1, // Simple ID generation, consider using a more robust method
      name: file.name,
      size: formatFileSize(file.size),
      hash: hash,
      status: "Uploaded",
      showDropdown: false,
    };

    setActivities((currentActivities) => [...currentActivities, newActivity]);
  };

  const handleDrop = async (event: React.DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const fileArray = Array.from(files);

    const newActivitiesPromises = fileArray.map(async (file, index) => {
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

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const totalSizeBytes = activities.reduce((total, activity) => {
    return total + sizeToBytes(activity.size);
  }, 0);

  const totalSizeFormatted = formatFileSize(totalSizeBytes);

  return (
    <div id="home-page" onDrop={handleDrop} onDragOver={handleDragOver}>
      <DataTable
        columns={getColumns(
          toggleDropdown,
          updateActivityName,
          toggleEdit,
          removeAllSelected,
          updateSelection,
          updateAllSelections
        )}
        data={activities}
        totalSize={totalSizeFormatted}
        onFileAdded={addFileToActivities}
      />
      {isAnyActivitySelected && (
        <div className="fixed bottom-4 right-4 flex gap-2">
          <button
            onClick={() => updateAllSelections(false)}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Unselect All
          </button>
          <button
            onClick={removeAllSelected}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Remove Selected
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
