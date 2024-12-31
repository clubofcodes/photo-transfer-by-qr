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
    <div className="justify-items-center">
      <QRCodeSVG
        value={`${GLOBAL_ENV.BASE_FRONTEDN_URL}photo-upload?sessionToken=${authUserToken}`}
        title={"Photo Transfer QR Code"}
        size={380}
      />
    </div>
  );
};

export default QrCodeScreen;
