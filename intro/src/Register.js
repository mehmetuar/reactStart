import React, { Component } from "react";
import { Navigate } from "react-router-dom";

export default class Register extends Component {
    state = {
        username: "",
        password: "",
        confirmPassword: "",
        redirect: false,
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const { username, password, confirmPassword } = this.state;

        // Boş alan kontrolü
        if (!username || !password || !confirmPassword) {
            alert("Tüm alanları doldurun.");
            return;
        }

        // Şifre eşleşme kontrolü
        if (password !== confirmPassword) {
            alert("Şifreler uyuşmuyor.");
            return;
        }

        // Şifre uzunluk kontrolü
        if (password.length < 8) {
            alert("Şifre en az 8 karakter olmalıdır.");
            return;
        }

        // En az 1 büyük harf kontrolü
        if (!/[A-Z]/.test(password)) {
            alert("Şifre en az 1 büyük harf içermelidir.");
            return;
        }

        // Başarılıysa kayıt
        this.props.onRegister({ username, password });
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
                    <button className="btn btn-success mt-3" type="submit">
                        Kayıt Ol
                    </button>
                </form>

            </div>
        );
    }
}
