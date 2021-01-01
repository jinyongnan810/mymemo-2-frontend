import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import ZropZone from "react-dropzone";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";
const FileUploader = ({ onUploadFile, setAlert }) => {
  const onPhotoSelected = async (files) => {
    for (let file of files) {
      if (file.size >= 1024000) {
        setAlert("File need to be smaller than 1Mb.", "danger");
        return;
      }
      const fileName = file.name;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const cfg = {
          headers: { "Content-Type": "application/json" },
        };
        try {
          setAlert("Uploading...");
          const res = await axios.post(
            "/api/upload",
            JSON.stringify({ data: reader.result }),
            cfg
          );
          if (res.status !== 200) {
            setAlert("Upload failed.", "danger");
            if (res.status === 503) {
              setAlert("File too large.", "danger");
            }
          } else {
            setAlert("Uploaded.");
            onPhotoUploaded(fileName, res.data);
          }
        } catch (error) {
          console.log("Upload failed.", error);
          setAlert("Upload failed.", "danger");
          return;
        }
      };
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
  setAlert: PropTypes.func.isRequired,
};
export default connect(null, { setAlert })(FileUploader);
