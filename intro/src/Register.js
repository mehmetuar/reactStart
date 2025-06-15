import React, { Component } from "react";
import { Navigate } from "react-router-dom";

export default class Register extends Component {
  state = {
    username: "",
    password: "",
    confirmPassword: "",
    location: "",
    redirect: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { username, password, confirmPassword, location } = this.state;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // ❌ Kullanıcı adı mevcut mu?
    const usernameExists = users.some((user) => user.username === username);
    if (usernameExists) {
      alert("Bu kullanıcı adı zaten mevcut. Lütfen farklı bir kullanıcı adı girin.");
      return;
    }

    // ❌ Boş alan kontrolü
    if (!username || !password || !confirmPassword || !location) {
      alert("Tüm alanları doldurun.");
      return;
    }

    // ❌ Şifre eşleşme kontrolü
    if (password !== confirmPassword) {
      alert("Şifreler uyuşmuyor.");
      return;
    }

    // ❌ Şifre uzunluk ve büyük harf kontrolü
    if (password.length < 8 || !/[A-Z]/.test(password)) {
      alert("Şifre en az 8 karakter ve en az 1 büyük harf içermelidir.");
      return;
    }

    // ❌ Memleket kontrolü
    if (location.trim().toLowerCase() === "konya" || location.trim().toLowerCase() === "konyalı") {
      alert("Üzgünüz, Konyalı kullanıcılar kayıt olamaz 🙃");
      return;
    }

    // ✅ Başarılı kayıt
    const newUser = { username, password, location };
    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    localStorage.setItem("loggedIn", true);

    alert("Kayıt başarılı! Giriş yapabilirsiniz.");
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/login" replace />;
    }

    return (
      <div style={{ padding: "30px", maxWidth: "400px", margin: "auto" }}>
        <h2>Kayıt Ol</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Kullanıcı Adı</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Şifre</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Şifre (Tekrar)</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Memleketiniz</label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={this.state.location}
              onChange={this.handleChange}
            />
          </div>

          <button className="btn btn-success mt-3" type="submit">
            Kayıt Ol
          </button>
        </form>
      </div>
    );
  }
}
