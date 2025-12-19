import { useState } from "react";
import { getUsers } from "../../public/script.js";

export const LoginPage = () => {
    const [ loginEmail, setLoginEmail ] = useState('')
    const [ loginPassword, setLoginPassword ] = useState('')
    const [ userValid, setUserValid ] = useState(false)

    async function consultData(email, password) {
        const dataUsers = await getUsers();

        if (!dataUsers) return alert("Erro ao consultar dados");

        let beData = dataUsers.find(item => item.email === email);

        if (!beData) return alert('Não localizamos o usuário nos dados.')

        if (beData.password === password) {
            setUserValid(true);
            alert('Login realizado com sucesso!')
            window.location.href = "/home";
        } else {
            alert('Senha incorreta.')
        }
    }

    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <h1>Login</h1>

                <h6>E-mail</h6>
                <input 
                    type="email" 
                    placeholder="Digite seu e-mail..."
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                />

                <h6>Senha</h6>
                <input 
                    type="password"
                    placeholder="Digite sua senha..."
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                />

                <button
                    type="button"
                    onClick={() => consultData(
                        loginEmail,
                        loginPassword
                    )}
                >
                    Entrar
                </button>
            </form>
        </div>
    )
}
