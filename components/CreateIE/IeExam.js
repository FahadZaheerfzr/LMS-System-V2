import axios from "axios";
import Spinner from "../Loader/Spinner";
import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useRouter } from "next/router";

const IeExam = ({ paperId, setActive, exam, ieFiles }) => {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  
  console.log(ieFiles)

  const handleFileUpload = (e) => {
    const newFile = e.target.files[0];
    setFiles([newFile]);
  };

  const handleFileRemove = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const editExam = () => {
    console.log("pushing back");
    router.push({
      pathname: `/faculty/create_exam/ie`,
      query: {
        ...exam,
      },
    });
  };

  const handleUpload = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });
      formData.append("paperId", paperId);
      const res = await axios.post(
        "/api/faculty/paper_creation/add_excel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      setLoading(false);
      setFiles([]);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };


  return (
    <div>
      <div className="flex flex-wrap gap-4">
      <table className="w-full mt-6 text-left table-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2">SR#</th>
            <th className="px-4 py-2">File</th>
            <th className="px-4 py-2">url</th>

          </tr>
        </thead>
        <tbody>
          {ieFiles.length > 0 &&
          ieFiles.map((IE, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{IE.fileName}</td>
              <td className="px-4 py-2">{IE.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
        {files.map((file, index) => (
          <div key={index} className="flex items-center">
            <p>{file.name}</p>
            <button onClick={() => handleFileRemove(index)}>
              <MdDelete />
            </button>
          </div>
        ))}
      </div>
      <input type="file" onChange={handleFileUpload} multiple />
      <button
        onClick={handleUpload}
        disabled={files.length === 0 || loading}
        className="bg-white text-blue-900 p-2 rounded hover:bg-blue-900 hover:text-white transition-colors"
      >
        {loading ? <Spinner /> : "Upload"}
      </button>
      <div className="mt-10 w-full pr-10 flex justify-end gap-x-5">
        <button
          type="button"
          className="border-2 border-[#FEC703] hover:bg-[#FEAF03] hover:text-white font-medium text-primary-black rounded-lg py-3 px-8"
          onClick={() => {
            setActive(1);
            editExam();
          }}
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-blue-800 hover:bg-blue-700 font-medium text-white rounded-lg py-4 px-8"
          onClick={() => setActive(3)}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default IeExam;