import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const EditinService = () => {
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

    if (!service) return <p>Carregando...</p>;

    return (
        <div className="containerEditinService">
            <div>
                <h1>Dados do cliente</h1>
        
                <label>
                    Cliente:
                    <input
                        name="name"
                        value={service.nameOfClient}
                        //onChange={handleChange}
                    />
                </label>

                <label>
                    Endereço:
                    <input
                        name="adress"
                        value={service.addressOfClient}
                        //onChange={handleChange}
                    />
                </label>

                <h1>Serviço previsto</h1>

                <label>
                    Problema:
                    <input
                        name="adress"
                        value={service.specificationsOfService.problem}
                        //onChange={handleChange}
                    />
                </label>

                <label>
                    Modelo veículo:
                    <input
                        name="adress"
                        value={service.specificationsOfService.vehicleModel}
                        //onChange={handleChange}
                    />
                </label>

                <h1>Serviço executado</h1>

                <label>
                    Data:
                    <input
                        name="adress"
                        value={service.specificationsOfTime.date}
                        //onChange={handleChange}
                    />
                </label>

                <label>
                    Laudo:
                    <input
                        name="adress"
                        value={service.specificationsOfTime.report}
                        //onChange={handleChange}
                    />
                </label>

                <h1>CheckList</h1>

                <div>
                    <label>
                        Qual a modalidade de serviço:
                        <input
                            name="adress"
                            value={service.specificationsCheckList.modality}
                            //onChange={handleChange}
                        />
                    </label>

                    <label>
                        Marca e modelo:
                        <input
                            name="adress"
                            value={service.specificationsCheckList.mark}
                            //onChange={handleChange}
                        />
                    </label>

                    <label>
                        No local possuem avarias:
                        <input
                            name="adress"
                            value={service.specificationsCheckList.observation1}
                            //onChange={handleChange}
                        />
                    </label>

                    <label>
                        Houve solução do problema:
                        <input
                            name="adress"
                            value={service.specificationsCheckList.observation2}
                            //onChange={handleChange}
                        />
                    </label>

                    <label>
                        Cliente pagou excedente:
                        <input
                            name="adress"
                            value={service.specificationsCheckList.observation3}
                            //onChange={handleChange}
                        />
                    </label>

                    <label>
                        Telefone do cliente:
                        <input
                            name="adress"
                            value={service.specificationsCheckList.customerPhone}
                            //onChange={handleChange}
                        />
                    </label>

                    <label>
                        Quem forneceu o material:
                        <input
                            name="adress"
                            value={service.specificationsCheckList.observation4}
                            //onChange={handleChange}
                        />
                    </label>

                    <label>
                        Quem acompanhou o serviço:
                        <input
                            name="adress"
                            value={service.specificationsCheckList.observation5}
                            //onChange={handleChange}
                        />
                    </label>

                    <label>
                        Qual o problema identificado no local:
                        <input
                            name="adress"
                            value={service.specificationsCheckList.observation6}
                            //onChange={handleChange}
                        />
                    </label>

                    <label>
                        Laudo:
                        <input
                            name="adress"
                            value={service.specificationsCheckList.observation7}
                            //onChange={handleChange}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
};