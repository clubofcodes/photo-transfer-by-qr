import { QRCodeSVG } from "qrcode.react";
import React, { useMemo } from "react";
import { getAuthUser } from "../utils/auth";
import { GLOBAL_ENV } from "../services/env";

const QrCodeScreen: React.FC = () => {
  const authUserToken = useMemo(
    () => JSON.parse(getAuthUser() ?? `{}`)?.accessToken,
    []
  );

  return (
    <div className="justify-items-center space-y-6 [&>svg]:w-52 [&>svg]:h-52 [&>svg]:sm:w-56 [&>svg]:sm:h-56 [&>svg]:md:w-96 [&>svg]:md:h-96">
      <h1 className="text-2xl text-bold text-center">Scan this QR Code</h1>
      <QRCodeSVG
        className="border border-white/20 shadow-2xl ring-4 ring-white/20 rounded-md"
        value={`${GLOBAL_ENV.FRONTEDN_BASE_URL}photo-upload?sessionToken=${authUserToken}`}
        title={"Photo Transfer QR Code"}
        size={380}
        level="M"
      />
      <div />
    </div>
  );
};

export default QrCodeScreen;
