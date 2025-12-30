import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './Editin-service.css'
import iconCheck from '../../images/iconCheck.png';
import iconClose from '../../images/iconClose.png';
import { handleUpdate } from "../../services/service.api.js";

export const EditinService = ({ onClose }) => {
    const { id } = useParams();
    const [service, setService] = useState(null);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await axios.get(`http://localhost:3030/services/${id}`);
                setService(response.data.data);
            } catch (error) {
                console.error("Erro ao buscar serviço:", error);
            }
        }

        fetchService();
    }, [id]);

    function handleChange(event) {
        const { name, value } = event.target;

        setService((prev) => {
            const keys = name.split('.');

            if (keys.length === 1) {
                return { ...prev, [name]: value };
            }

            return {
                ...prev,
                [keys[0]]: {
                    ...prev[keys[0]],
                    [keys[1]]: value,
                },
            };
        });
    }

    async function changeService() {
        await handleUpdate({
            objUpdate: {
                ...service,
                id,
            },
        });

        onClose();
        window.location.reload();
    }

    if (!service) return <p>Carregando...</p>;

    return (
        <div className="overlay">
            <div className="containerOfIcons">
                <div className="containerOfIcons__divGreen">
                    <img 
                        src={iconCheck} 
                        alt="icon check"
                        className="containerOfIcons__divGreen--greenIcon"
                        onClick={changeService}
                    />
                </div>
            
                <img
                    src={iconClose}
                    alt="icon close"
                    onClick={onClose}
                    className="containerOfIcons--redIcon"
                />
            </div>

            <div className="containerEditinService">
                <h1>Dados do cliente</h1>

                <label>
                    Cliente:
                    <input 
                        value={service.nameOfClient}
                        onChange={handleChange}
                        name="nameOfClient"
                    />
                </label>

                <label>
                    Endereço:
                    <input 
                        value={service.addressOfClient}
                        onChange={handleChange}
                        name="addressOfClient"
                    />
                </label>

                <h1>Serviço previsto</h1>

                <label>
                    Problema:
                    <input
                        name="specificationsOfService.problem"
                        value={service.specificationsOfService.problem}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Modelo veículo:
                    <input
                        name="specificationsOfService.vehicleModel"
                        value={service.specificationsOfService.vehicleModel}
                        onChange={handleChange}
                    />
                </label>

                <h1>Serviço executado</h1>

                <label>
                    Data:
                    <input
                        name="specificationsOfTime.date"
                        value={service.specificationsOfTime.date}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Laudo:
                    <input
                        name="specificationsOfTime.report"
                        value={service.specificationsOfTime.report}
                        onChange={handleChange}
                    />
                </label>

                <h1>CheckList</h1>

                <div className="containerChecklist">
                    <label>
                        Qual a modalidade de serviço:
                        <input
                            name="specificationsCheckList.modality"
                            value={service.specificationsCheckList.modality}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Marca e modelo:
                        <input
                            name="specificationsCheckList.mark"
                            value={service.specificationsCheckList.mark}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        No local possuem avarias:
                        <input
                            name="specificationsCheckList.observation1"
                            value={service.specificationsCheckList.observation1}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Houve solução do problema:
                        <input
                            name="specificationsCheckList.observation2"
                            value={service.specificationsCheckList.observation2}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Cliente pagou excedente:
                        <input
                            name="specificationsCheckList.observation3"
                            value={service.specificationsCheckList.observation3}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Telefone do cliente:
                        <input
                            name="specificationsCheckList.customerPhone"
                            value={service.specificationsCheckList.customerPhone}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Quem forneceu o material:
                        <input
                            name="specificationsCheckList.observation4"
                            value={service.specificationsCheckList.observation4}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Quem acompanhou o serviço:
                        <input
                            name="specificationsCheckList.observation5"
                            value={service.specificationsCheckList.observation5}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Qual o problema identificado no local:
                        <input
                            name="specificationsCheckList.observation6"
                            value={service.specificationsCheckList.observation6}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Laudo:
                        <input
                            name="specificationsCheckList.observation7"
                            value={service.specificationsCheckList.observation7}
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
};
