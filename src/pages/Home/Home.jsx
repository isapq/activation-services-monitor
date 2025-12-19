import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './Home.css'
import { Footer } from "../../components/Footer/Footer.jsx";

export const Home = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    function go(path) {
        setLoading(true);
        setTimeout(() => {
            navigate(path);
        }, 700)
    }

    return (
        <>
            {loading && 
            <div className="three-body">
                <div class="three-body__dot"></div>
                <div class="three-body__dot"></div>
                <div class="three-body__dot"></div>
            </div>}

            {!loading && (
                <>
                    <div className="containerTitle">
                        <h1 className="titlePage">Página inicial</h1>
                    </div>

                    <div className="divButtons">
                        <button
                            className="button"
                            onClick={() => go('/newService')}
                        >
                            Novo atendimento
                        </button>

                        <button
                            className="button"
                            onClick={() => go('/services')}
                        >
                            Atendimentos
                        </button>
                    </div>

                    <Footer />
                </>
            )}
        </>
    )
}