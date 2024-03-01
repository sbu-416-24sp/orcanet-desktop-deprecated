import { motion } from "framer-motion";
import { routeVariants } from "../helper/RouterAnimation";

import Header from "./Header/Header";

function UploadStatus() {
  return (
    <div className="file-upload-header">
      <Header />
      <div className="file-upload-title-btn">
        <h3>File Upload Status</h3>
        <button className="import-btn px-2 py-1 rounded-lg bg-sky-500 hover:bg-sky-700">
          + Import
        </button>
      </div>
    </div>
  );
}

function FileList() {
  return (
    <table className="table peer-list" style={{ borderRadius: "8px" }}>
      <thead>
        <tr style={{ borderRadius: "8px" }}>
          <th>
            <input type="checkbox" />
          </th>
          <th>Pin Status</th>
          <th>Name</th>
          <th>Status</th>
          <th>Size</th>
          <th>Peers</th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        <tr>
          <td>
            <input type="checkbox" />
          </td>
          <td>✅</td>
          <td>Movie.mp4</td>
          <td>
            ⬆ 5 MB/s
            <br />⬇ 18 MB/s
          </td>
          <td>
            ■■■■■□□ 87%
            <br />
            823 MB
          </td>
          <td>18</td>
        </tr>
      </tbody>
    </table>
  );
}

export default function FileUploadPage() {
  return (
    <motion.div
      className="content file-upload-page"
      initial="initial"
      animate="final"
      variants={routeVariants}
    >
      <UploadStatus />
      <FileList />
    </motion.div>
  );
}
