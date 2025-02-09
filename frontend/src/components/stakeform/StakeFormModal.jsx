import { useState } from 'react';
import { X, Upload, Heart } from 'lucide-react';
import "./stakeformmodal.css";
// eslint-disable-next-line react/prop-types
const StakeFormModal = ({ isOpen, onClose,title,duration,time,btnText }) => {
  const [formData, setFormData] = useState({
    duration: '',
    name: '',
    description: '',
    status: 'Not Married',
    image: null,
    imagePreview: ''
  });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
          <h2 className="stake-form-title text-gradient">Begin Your Love Journey</h2>
          <p className="stake-form-subtitle">
            {title}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="stake-form-body">
          <div className="stake-form-left">
            <label className="stake-form-label">NFT Image</label>
            <div className="stake-form-image-container">
              {formData.imagePreview ? (
                <div className="stake-form-image-preview">
                  <img src={formData.imagePreview} alt="Preview" className="stake-form-image" />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: null, imagePreview: '' })}
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
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="stake-form-input"
                placeholder={`${time}`}
                required
              />
            </div>

            <div>
              <label className="stake-form-label">NFT Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="stake-form-input"
                placeholder="Give your NFT a romantic name"
                required
              />
            </div>

            <div>
              <label className="stake-form-label">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="stake-form-textarea"
                placeholder="Tell your love story..."
                required
              />
            </div>

            <div>
              <label className="stake-form-label">Relationship Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
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
