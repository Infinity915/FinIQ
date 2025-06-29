import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import "./Profile.css";

const Profile = () => {
  const { updateUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userMeta, setUserMeta] = useState({
    _id: "",
    role: "",
    createdAt: "",
    updatedAt: ""
  });
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:2100/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const fetchedUser = response.data;
        setUser(fetchedUser);
        setImagePreview(fetchedUser.pfp ? getImageUrl(fetchedUser.pfp) : "https://via.placeholder.com/150");
        setUserMeta({
          _id: fetchedUser._id || "",
          role: fetchedUser.role || "",
          createdAt: fetchedUser.createdAt || "",
          updatedAt: fetchedUser.updatedAt || ""
        });
      } catch (err) {
        setError("Failed to load user profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const getImageUrl = (pfp) => {
    if (!pfp) return "https://via.placeholder.com/150";
    if (pfp.startsWith("http")) return pfp;
    return `http://localhost:2100${pfp}`;
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:2100/api/users/me/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.pfp) {
        setImagePreview(getImageUrl(res.data.pfp));
        setUser((prev) => ({ ...prev, pfp: res.data.pfp }));
        // Update global AuthContext user so Home.jsx gets the new image
        updateUser({ ...user, pfp: res.data.pfp });
      }
    } catch (err) {
      setError("Failed to upload image. Please try again.");
    }
  };

  if (loading) return <div className="profile-loading">Loading profile...</div>;
  if (error) return <div className="profile-error">{error}</div>;
  if (!user) return <div className="profile-error">User not found</div>;

  return (
    <div className="profile-truecaller-bg">
      <div className="profile-truecaller-card">
        <div className="profile-truecaller-left">
          <img
            src={imagePreview}
            alt={user.name}
            className="profile-truecaller-avatar"
          />
          <div className="profile-truecaller-name">{user.name || "-"}</div>
          <div className="profile-truecaller-profession">{user.profession || "-"}</div>
          <button
            className="profile-truecaller-upload-btn"
            onClick={() => fileInputRef.current.click()}
            type="button"
          >
            Upload Image
          </button>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>
        <div className="profile-truecaller-details">
          <div>
            <div className="profile-truecaller-detail-label">User Name</div>
            <div className="profile-truecaller-detail-value">{user.name || "-"}</div>
          </div>
          <div>
            <div className="profile-truecaller-detail-label">E-mail</div>
            <div className="profile-truecaller-detail-value">{user.email || "-"}</div>
          </div>
          <div>
            <div className="profile-truecaller-detail-label">Date of Birth</div>
            <div className="profile-truecaller-detail-value">{user.dob ? user.dob.slice(0, 10) : "-"}</div>
          </div>
          <div>
            <div className="profile-truecaller-detail-label">Profession</div>
            <div className="profile-truecaller-detail-value">{user.profession || "-"}</div>
          </div>
          <div>
            <div className="profile-truecaller-detail-label">Created At</div>
            <div className="profile-truecaller-detail-value">{userMeta.createdAt ? new Date(userMeta.createdAt).toLocaleString() : "-"}</div>
          </div>
          <div>
            <div className="profile-truecaller-detail-label">Updated At</div>
            <div className="profile-truecaller-detail-value">{userMeta.updatedAt ? new Date(userMeta.updatedAt).toLocaleString() : "-"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
