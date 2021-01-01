import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import ZropZone from "react-dropzone";
import config from "../../config/config";

const FileUploader = ({ onUploadFile }) => {
  const onPhotoSelected = async (files) => {
    const url = `https://api.cloudinary.com/v1_1/${config.CLOUD_NAME}/upload`;

    for (let file of files) {
      const fileName = file.name;
      var fd = new FormData();
      fd.append("upload_preset", config.CLOUD_PRESET);
      fd.append("tags", "kin's page photo"); // Optional - add tag for image admin in Cloudinary
      fd.append("multiple", true);
      fd.append("context", `photo=${fileName}`);
      fd.append("file", file);
      const cfg = {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      };
      const res = await axios.post(url, fd, cfg);
      if (res.status === "400") {
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
