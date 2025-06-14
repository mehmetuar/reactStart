import React from "react";

const Profile = ({ currentUser }) => {
  if (!currentUser) return <p>Kullanıcı bulunamadı.</p>;

  return (
    <div style={{ padding: "30px" }}>
      <h2>Profil Bilgileri</h2>
      <p><strong>Kullanıcı Adı:</strong> {currentUser.username}</p>
    </div>
  );
};

export default Profile;
