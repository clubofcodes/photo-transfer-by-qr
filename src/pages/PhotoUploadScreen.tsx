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
  const [uploadLoader, setUploadLoader] = React.useState<boolean>(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFileData(event?.target?.files?.[0] ?? null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setUploadLoader(true);

    const formData = new FormData();
    if (fileData) {
      formData.append("file", fileData);
    }

    try {
      const res = await fetch(`${GLOBAL_ENV.BACKEND_BASE_URL_API}upload/`, {
        method: "POST",
        body: formData,
        headers: {
          "x-access-token": sessionToken ?? "",
        },
      });
      const result = await res.json();
      if (res?.status === 201) {
        enqueueSnackbar(result?.message, { variant: "success" });
        setFileData(null);
      } else {
        enqueueSnackbar(result?.message, { variant: "error" });
      }
    } catch (error: any) {
      enqueueSnackbar(
        `Catch block: ${error?.["message"] ?? "An unexpected error occurred"}`,
        {
          variant: "error",
        }
      );
    } finally {
      setUploadLoader(false);
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
        disabled={!fileData || uploadLoader}
        className="relative w-full rounded-lg disabled:bg-gray-800 disabled:text-white/35 disabled:cursor-not-allowed bg-theme active:bg-theme/5 active:shadow-primary-2 hover:bg-black/75 text-white font-medium uppercase leading-normal px-6 py-3 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-theme/10"
      >
        {uploadLoader && (
          <div className="input-inline-icon-wrapper">
            <svg
              className="input-inline-svg-icon w-6 h-6 mt-1"
              width="50"
              height="50"
              viewBox="0 0 50 50"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="25"
                cy="25"
                r="20"
                stroke="#2563eb"
                stroke-width="5"
                fill="none"
              />
              <circle
                cx="25"
                cy="25"
                r="20"
                stroke="#000"
                stroke-width="5"
                stroke-dasharray="126.92"
                stroke-dashoffset="63.46"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="126.92;0"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>
        )}
        <p>Upload</p>
      </button>
    </form>
  );
};

export default PhotoUploadScreen;
