import React, { FormEvent } from "react";
import UploadFileInput from "../components/UploadFileInput";
import { useLocation } from "react-router";
import { enqueueSnackbar } from "notistack";
import { GLOBAL_ENV } from "../services/env";

const PhotoUploadScreen: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sessionToken = searchParams.get("sessionToken");

  const [fileData, setFileData] = React.useState<File | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFileData(event?.target?.files?.[0] ?? null);
    alert(`Hurray ${JSON.stringify(event?.target?.files?.[0]?.name)}`);
    handleSubmit(event);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (fileData) {
      formData.append("file", fileData);
    }

    try {
      const res = await fetch(`http://172.20.10.9:8080/api/upload/`, {
        method: "POST",
        body: formData,
        headers: {
          "x-access-token": sessionToken ?? "",
        },
      });
      const result = await res.json();
      if (res?.status === 201) {
        enqueueSnackbar(result?.message, { variant: "success" });
      } else {
        enqueueSnackbar(result?.message, { variant: "error" });
      }
    } catch (error: any) {
      enqueueSnackbar(
        `Idhaar se ${error?.["message"] ?? "An unexpected error occurred"}`,
        {
          variant: "error",
        }
      );
    }
  };
  return (
    <form
      className="mt-4 space-y-6"
      onSubmit={handleSubmit}
      method="POST"
      encType="multipart/form-data"
    >
      <UploadFileInput
        inputFieldId="qr-photo-upload"
        handleFileChange={handleFileChange}
      />
      {fileData && (
        <div className="relative flex items-center border border-white/15 bg-black/50 shadow-lg rounded-lg p-3 px-4">
          <div className="input-inline-icon-wrapper">
            <svg
              className="input-inline-svg-icon w-6 h-6 mt-1"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 15L11 17L15 13M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V9M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19"
                stroke="#2563eb"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <p className="ml-8">{fileData.name}</p>
        </div>
      )}
      <button
        type="submit"
        className="w-full text-white bg-theme hover:bg-theme/40 focus:ring-4 focus:outline-none focus:ring-theme/90 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-theme dark:hover:bg-theme/40 dark:focus:ring-theme/20"
      >
        Upload
      </button>
    </form>
  );
};

export default PhotoUploadScreen;
