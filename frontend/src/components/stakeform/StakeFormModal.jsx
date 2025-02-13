/* eslint-disable react/prop-types */
import { useState } from "react";
import { X, Upload, Heart } from "lucide-react";
import { useWriteContract } from "wagmi";
import "./stakeformmodal.css";
import pinata from "../../helper/pinataWeb3";
import {stakeConfig} from "../../contractABI/stakeConfig.js";
const StakeFormModal = ({
  isOpen,
  onClose,
  title,
  duration,
  time,
  btnText,
  coupleName,
}) => {
  const [formData, setFormData] = useState({
    duration: "",
    coupleName: "",
    name: "",
    description: "",
    status: "Not Married",
    image: null,
    imagePreview: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const { data: hash, writeContract } = useWriteContract();
  const handleSubmit = async (e) => {
    try {
      console.log("Write contract called");
      e.preventDefault();
      // Uploading the photo in IPFS
      const upload = await pinata.upload.file(formData.image);
      console.log(upload);
      const imageURL = `https://orange-given-mink-808.mypinata.cloud/ipfs/${upload.IpfsHash}`;
      const today = new Date().toISOString().split("T")[0];

      const tokenMetadata = {
        name: formData.name,
        description: formData.description,
        image: imageURL,
        attributes: [
          { trait_type: "Couple", value: formData.coupleName || "Couple" }, // Fix:
          { trait_type: "Anniversary", value: today },
          { trait_type: "Status", value: formData.status },
        ],
      };
      const pinataRes = await pinata.upload.json(tokenMetadata);
      const uri = `https://orange-given-mink-808.mypinata.cloud/ipfs/${pinataRes.IpfsHash}`;
      writeContract({
        ...stakeConfig,
        functionName: "commit",
        args: [
          BigInt(formData.duration * 30.5 * 84000),
          formData.coupleName,
          uri,
        ],
      });
      if (hash) console.log(hash);
      console.log(formData);
    } catch (err) {
      console.log("Error in Commiting");
      console.log(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="stake-form-overlay fontfamily">
      <div className="stake-form-modal">
        <button onClick={onClose} className="stake-form-close-btn">
          <X className="stake-form-icon" />
        </button>

        <div className="stake-form-header">
          <div className="stake-form-icon-wrapper">
            <Heart className="stake-form-heart-icon" fill="currentColor" />
          </div>
          <h2 className="stake-form-title text-gradient">
            Begin Your Love Journey
          </h2>
          <p className="stake-form-subtitle">{title}</p>
        </div>

        <form onSubmit={handleSubmit} className="stake-form-body">
          <div className="stake-form-left">
            <label className="stake-form-label">NFT Image</label>
            <div className="stake-form-image-container">
              {formData.imagePreview ? (
                <div className="stake-form-image-preview">
                  <img
                    src={formData.imagePreview}
                    alt="Preview"
                    className="stake-form-image"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        image: null,
                        imagePreview: "",
                      })
                    }
                    className="stake-form-remove-image"
                  >
                    <X className="stake-form-icon" />
                  </button>
                </div>
              ) : (
                <div className="stake-form-upload-container">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="stake-form-file-input"
                    required
                  />
                  <div className="stake-form-upload-box">
                    <Upload className="stake-form-upload-icon" />
                    <span className="stake-form-upload-text">
                      Click to upload your favorite photo
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="stake-form-right">
            <div>
              <label className="stake-form-label">{duration}</label>
              <input
                type="number"
                min="1"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                className="stake-form-input"
                placeholder={`${time}`}
                required
              />
            </div>
            {coupleName && (
              <div>
                <label className="stake-form-label">Couple Name</label>
                <input
                  type="text"
                  value={formData.coupleName}
                  onChange={(e) =>
                    setFormData({ ...formData, coupleName: e.target.value })
                  }
                  className="stake-form-input"
                  placeholder="Enter the couple names - John & Alisa"
                  required
                />
              </div>
            )}

            <div>
              <label className="stake-form-label">NFT Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="stake-form-input"
                placeholder="Give your NFT a romantic name"
                required
              />
            </div>

            <div>
              <label className="stake-form-label">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="stake-form-textarea"
                placeholder="Tell your love story..."
                required
              />
            </div>

            <div>
              <label className="stake-form-label">Relationship Status</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="stake-form-select"
                required
              >
                <option value="Not Married">Not Married</option>
                <option value="Married">Married</option>
              </select>
            </div>

            <button type="submit" className="stake-form-submit-btn">
              <Heart className="stake-form-submit-icon" />
              <span>{btnText}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StakeFormModal;
