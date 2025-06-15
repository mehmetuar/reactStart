import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ currentUser, onDeleteAccount }) => {
  const navigate = useNavigate();

  if (!currentUser) return <p>Kullanıcı bulunamadı.</p>;

  const handleDelete = () => {
    const confirmDelete = window.confirm("Hesabınızı silmek istediğinize emin misiniz?");
    if (confirmDelete) {
      onDeleteAccount();  // App.js’ten gelen fonksiyon
      navigate("/login"); // Giriş sayfasına yönlendir
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Profil Bilgileri</h2>
      <p><strong>Kullanıcı Adı:</strong> {currentUser.username}</p>
      <p><strong>Memleket:</strong> {currentUser.location}</p>

      <button
        onClick={handleDelete}
        className="btn btn-danger mt-3"
      >
        Hesabı Sil
      </button>
    </div>
  );
};

export default Profile;

