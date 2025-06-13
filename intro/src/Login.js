import React, { Component } from "react";
import { Navigate } from "react-router-dom";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    redirect: false
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLogin = (e) => {
    e.preventDefault();

    // Basit kontrol (gerçek uygulamada API olur)
    if (this.state.username && this.state.password) {
      this.props.onLogin(); // App.js’ten gelen login fonksiyonu
      this.setState({ redirect: true });
    } else {
      alert("Kullanıcı adı ve şifre giriniz.");
    }
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/" replace />;
    }

    return (
      <div style={{ padding: "30px", maxWidth: "400px", margin: "auto" }}>
        <h2>Giriş Yap</h2>
        <form onSubmit={this.handleLogin}>
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
          <button className="btn btn-primary mt-3" type="submit">
            Giriş Yap
          </button>
        </form>
      </div>
    );
  }
}
