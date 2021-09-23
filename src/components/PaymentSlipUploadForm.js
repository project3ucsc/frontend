import React from "react";
import { containers } from "services/azureblob.service";
import AttachUpload from "./AttachUpload";

export default function PaymentSlipUploadForm() {
  return (
    <div>
      <AttachUpload
        dbid={1}
        container={containers.submissions}
        file={{ bool: false, filename: "" }}
      />
    </div>
  );
}
