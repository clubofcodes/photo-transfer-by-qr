import React, { useEffect, useMemo, useState } from "react";
import QrCodeScreen from "./pages/QrCodeScreen";
import LoginScreen from "./pages/LoginScreen";
import { BrowserRouter, Route, Routes } from "react-router";
import DefaultLayout from "./layout/DefaultLayout";
import LandingScreen from "./pages/LandingScreen";
import PhotoUploadScreen from "./pages/PhotoUploadScreen";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import ProtectedRoute from "./routes/ProtectedRoute";
import { socket } from "./services/socket";

const RouteApp: React.FC = () => {
  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on("image_uploaded", (data) => {
      console.log(data); // Log the received message data to the console
      if (data?.file_name) {
        enqueueSnackbar(`${data.file_name} uploaded recently!`, {
          variant: "warning",
          autoHideDuration: 5000,
        });
      }
    });

    // Cleanup the effect by removing the event listener when the component unmounts
    return () => {
      socket.off("image_uploaded");
    };
  }, []);

  return (
    <BrowserRouter>
      <SnackbarProvider maxSnack={1} autoHideDuration={2000}>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<LandingScreen />} />
            {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/qr-code" element={<QrCodeScreen />} />
            {/* </Route> */}
            <Route path="/photo-upload" element={<PhotoUploadScreen />} />
          </Route>
        </Routes>
      </SnackbarProvider>
    </BrowserRouter>
  );
};

export default RouteApp;
