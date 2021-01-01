import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import ZropZone from "react-dropzone";
import config from "../../config/config";

const FileUploader = ({ onUploadFile }) => {
  const onPhotoSelected = async (files) => {
    let sigData;
    try {
      sigData = await axios.get("/api/signature");
    } catch (error) {
      console.log("Signature can not be fetched.", error);
      return;
    }

    const { signature, timestamp } = sigData.data;
    const url = `https://api.cloudinary.com/v1_1/${config.CLOUD_NAME}/image/upload?api_key=${config.CLOUD_API_KEY}&timestamp=${timestamp}`;

    for (let file of files) {
      const fileName = file.name;
      var fd = new FormData();
      fd.append("api_key", config.CLOUD_API_KEY);
      fd.append("upload_preset", config.CLOUD_PRESET);
      fd.append("signature", signature);
      // fd.append("timestamp", timestamp);
      // fd.append("tags", "kin's page photo");
      fd.append("multiple", true);
      // fd.append("context", `photo=${fileName}`);
      fd.append("file", file);

      const cfg = {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      };
      const res = await axios.post(url, fd, cfg);
      if (res.status !== 200) {
        console.log("Upload Error:", res);
      }
      onPhotoUploaded(fileName, res.data);
    }
  };
  const onPhotoUploaded = (name, res) => {
    onUploadFile(name, res["secure_url"]);
  };
  return (
    <div className="k-dropfile" id="upload">
      <span>Drop Photo in here.</span>
      <ZropZone
        disableClick={true}
        multiple={false}
        accept="image/*"
        onDrop={(files) => onPhotoSelected(files)}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
            </div>
          </section>
        )}
      </ZropZone>
    </div>
  );
};

FileUploader.propTypes = {
  onUploadFile: PropTypes.func.isRequired,
};
export default FileUploader;
