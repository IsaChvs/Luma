import { RightImageSection } from "../../components/RightSection";
import { Container } from "./style";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import Logo from "../../assets/LogoFudida.png";

import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

type CadastroSignUpProps = {
  onRegister: (msg: string) => void;
};

export function CadastroSignUp({ onRegister }: CadastroSignUpProps) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    username: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [errors, setErrors] = useState({
    nome: "",
    cpf: "",
    username: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
    setErrors({ ...errors, [id]: "" }); // limpa erro ao digitar
  };

  const validarCampos = () => {
    const newErrors: typeof errors = {
      nome: "",
      cpf: "",
      username: "",
      email: "",
      senha: "",
      confirmarSenha: "",
    };

    if (!form.nome.trim()) newErrors.nome = "Nome é obrigatório.";
    if (!/^\d{11}$/.test(form.cpf)) newErrors.cpf = "CPF deve conter 11 números.";
    if (!form.username.trim()) newErrors.username = "Nome de usuário é obrigatório.";
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "E-mail inválido.";
    if (form.senha.length < 6) newErrors.senha = "A senha deve ter pelo menos 6 caracteres.";
    if (form.senha !== form.confirmarSenha) newErrors.confirmarSenha = "As senhas não coincidem.";

    setErrors(newErrors);

    return Object.values(newErrors).every((erro) => erro === "");
  };

  const handleCadastro = () => {
    if (validarCampos()) {
      onRegister("Usuário Registrado!");
      navigate("/CadastroSignUp");
    }
  };

  const errorStyle = {
    color: "red",
    fontSize: "0.78rem",
    marginTop: "2px",
    marginBottom: "0",
    textAlign: "center" as const,
  };

  return (
    <Container>
      <div className="logoWrapper">
        <img src={Logo} alt="Logo da Luma" />
      </div>

      <div className="leftContent">
        <div className="formHeader">
          <h1>Crie sua conta</h1>
          <p>Preencha os campos para se cadastrar.</p>
        </div>

        <form className="signUpForm" onSubmit={(e) => e.preventDefault()}>
          {/* Nome */}
          <div className="inputGroup">
            <label htmlFor="nome">Nome completo:</label>
            <input
              type="text"
              id="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Digite seu nome"
            />
            {errors.nome && <p style={errorStyle}>{errors.nome}</p>}
          </div>

          {/* CPF */}
          <div className="inputGroup">
            <label htmlFor="cpf">CPF:</label>
            <input
              type="text"
              id="cpf"
              value={form.cpf}
              onChange={handleChange}
              placeholder="Digite seu CPF"
            />
            {errors.cpf && <p style={errorStyle}>{errors.cpf}</p>}
          </div>

          {/* Username */}
          <div className="inputGroup">
            <label htmlFor="username">Nome de usuário:</label>
            <input
              type="text"
              id="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Escolha um nome de usuário"
            />
            {errors.username && <p style={errorStyle}>{errors.username}</p>}
          </div>

          {/* Email */}
          <div className="inputGroup">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Digite seu e-mail"
            />
            {errors.email && <p style={errorStyle}>{errors.email}</p>}
          </div>

          {/* Senha */}
          <div className="inputGroup">
            <label htmlFor="senha">Senha:</label>
            <div className="inputWithIcon">
              <input
                type="password"
                id="senha"
                value={form.senha}
                onChange={handleChange}
                placeholder="Crie uma senha"
              />
              <VisibilityOutlinedIcon className="icon" />
            </div>
            {errors.senha && <p style={errorStyle}>{errors.senha}</p>}
          </div>

          {/* Confirmar senha */}
          <div className="inputGroup">
            <label htmlFor="confirmarSenha">Confirmar senha:</label>
            <div className="inputWithIcon">
              <input
                type="password"
                id="confirmarSenha"
                value={form.confirmarSenha}
                onChange={handleChange}
                placeholder="Confirme sua senha"
              />
              <VisibilityOutlinedIcon className="icon" />
            </div>
            {errors.confirmarSenha && (
              <p style={errorStyle}>{errors.confirmarSenha}</p>
            )}
          </div>

          <Button
            fullWidth
            variant="contained"
            onClick={handleCadastro}
            className="registerButton"
          >
            Cadastrar
          </Button>
        </form>

        <div className="loginLink">
          <Divider>
            <span>ou</span>
          </Divider>
          <p className="registerTextArea">
            Já tem uma conta? <Link to="/">Faça login</Link>
          </p>
        </div>

        <footer className="loginFooter">
          <a href="#">Política de Privacidade |</a>
          <a href="#"> Termos de Serviço</a>
        </footer>
      </div>

      <RightImageSection />
    </Container>
  );
}
