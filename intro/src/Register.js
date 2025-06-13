import React, { Component } from "react";
import { Navigate } from "react-router-dom";

export default class Register extends Component {
  state = {
    username: "",
    password: "",
    redirect: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = this.state;

    if (!username || !password) {
      alert("Tüm alanları doldurunuz.");
      return;
    }

    // Yeni kullanıcıyı gönder
    this.props.onRegister({ username, password });
    alert("Kayıt başarılı! Giriş yapabilirsiniz.");

    // Giriş sayfasına yönlendir
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
          <button className="btn btn-success mt-3" type="submit">
            Kayıt Ol
          </button>
        </form>
      </div>
    );
  }
}
