import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Services.css'

export const Services = () => {
    const [servicesList, setServicesList] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    function go(path) {
        setLoading(true);
        setTimeout(() => {
            navigate(path);
        }, 700)
    }

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get("http://localhost:3030/services");
                setServicesList(response.data.data); 
            } catch (error) {
                console.error("Erro ao solicitar os dados para o backend:", error);
            }
        };

        fetchServices();
    }, []);

    return (
        <>
            {loading && 
            <div className="three-body">
                <div class="three-body__dot"></div>
                <div class="three-body__dot"></div>
                <div class="three-body__dot"></div>
            </div>}

            {!loading && (
            <div className='container'>
                <div className="containerTitleServices">
                    <h1 className="titleContainer">Serviços</h1>
                </div>

                <button className='buttonBack' onClick={() => go('/home')}>Voltar</button>

                {servicesList.length === 0 ? (
                    <p>Nenhum serviço encontrado.</p>
                ) : (
                    servicesList.map((item) => (
                        <div
                            className='containerService'
                            key={item.id}
                            onClick={() => navigate(`/services/${item.id}`)}
                        >
                            <img src="src\images\formigaEnosLogo3.png" alt="logo formiga ENOS" className='logoItem' />
                            <h3><strong>{'Cliente'}</strong>{` - ${item.nameOfClient}`}</h3>
                            <h3><strong>{'Endereço'}</strong>{` - ${item.addressOfClient}`}</h3>
                        </div>
                    ))
                )}
            </div>)}
        </>
    );
};
