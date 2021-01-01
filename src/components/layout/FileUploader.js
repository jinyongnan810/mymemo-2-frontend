import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import ZropZone from "react-dropzone";
import config from "../../config/config";
import { Fragment } from "react";

const FileUploader = ({ onUploadFile }) => {
  const onPhotoSelected = async (files) => {
    const url = `https://api.cloudinary.com/v1_1/${config.CLOUD_NAME}/upload`;

    for (let file of files) {
      const fileName = file.name;
      const uploadInfo = {
        upload_preset: config.CLOUD_PRESET,
        file: file,
        multiple: true,
        tags: "kin's page photo",
        context: `photo=${fileName}`,
      };
      const res = await axios.post(url, uploadInfo);
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
