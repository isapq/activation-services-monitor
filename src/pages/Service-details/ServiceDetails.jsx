import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import './Service-details.css';

import iconEdit from '../../images/iconEdit.png';
import { EditinService } from "../Editin-service/Editin-service.jsx";

export const ServiceDatails = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState({});
    const [edit, setEdit] = useState(false);
    const navigate = useNavigate();

    function go(path) {
        setLoading(true);
        setTimeout(() => {
            navigate(path);
        }, 700)
    }

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

    if (!service) {
        return (
            <div className="three-body">
                <div className="three-body__dot"></div>
                <div className="three-body__dot"></div>
                <div className="three-body__dot"></div>
            </div>
        );
    }

    // emitir relatório

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = {
            name: service.nameOfClient,
            address: service.addressOfClient,
            typeOfService: service.specificationsOfService?.typeOfService,
            problem: service.specificationsOfService?.problem,
            vehicleModel: service.specificationsOfService?.vehicleModel,
            date: service.specificationsOfTime?.date,
            startTime: service.specificationsOfTime?.startTime,
            endTime: service.specificationsOfTime?.endTime,
            report: service.specificationsOfTime?.report,
            modality: service.specificationsCheckList?.modality,
            mark: service.specificationsCheckList?.mark,
            observation1: service.specificationsCheckList?.observation1,
            observation2: service.specificationsCheckList?.observation2,
            observation3: service.specificationsCheckList?.observation3,
            customerPhone: service.specificationsCheckList?.customerPhone,
            observation4: service.specificationsCheckList?.observation4,
            observation5: service.specificationsCheckList?.observation5,
            observation6: service.specificationsCheckList?.observation6,
            observation7: service.specificationsCheckList?.observation7,
            image1: images.image1 || null,
            image2: images.image2 || null
        };

        const response = await fetch("http://localhost:3030/report", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataToSend)
        });

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "relatorio.pdf";
        link.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.onloadend = () => {
            setImages((prev) => ({
                ...prev,
                [e.target.id]: reader.result
            }));
        };

        if (file) reader.readAsDataURL(file);
    };

    return (
        <>
            {loading && 
            <div className="three-body">
                <div class="three-body__dot"></div>
                <div class="three-body__dot"></div>
                <div class="three-body__dot"></div>
            </div>}

            {!loading && (
            <div className="containerPage">
                <div className="containerTitleServiceDetails">
                    <h1 className="titlePageServiceDetails">Detalhes do Serviço</h1>
                </div>

                <div className="containerButtons">
                    <button onClick={() => go('/services')}>Voltar</button>
                    <button onClick={() => go('/home')}>Página inicial</button>
                </div>

                <div className="containerDetails">
                    <h2>Dados do cliente:</h2>
                    <p><strong>Cliente:</strong> {service.nameOfClient}</p>
                    <p><strong>Endereço:</strong> {service.addressOfClient}</p>

                    <h2>Serviço previsto:</h2>
                    <p><strong>Problema:</strong> {service?.specificationsOfService?.problem}</p>
                    <p><strong>Modelo veículo:</strong> {service?.specificationsOfService?.vehicleModel}</p>
                    
                    <h2>Serviço executado:</h2>
                    <p><strong>Data:</strong> {service?.specificationsOfTime?.date}</p>
                    <p><strong>Laudo:</strong> {service?.specificationsOfTime?.report}</p>

                    <h2>CheckList</h2>
                    <p><strong>QUAL A MODALIDADE DE SERVIÇO:</strong> {service?.specificationsCheckList?.modality}</p>
                    <p><strong>MARCA E MODELO:</strong> {service?.specificationsCheckList?.mark}</p>
                    <p><strong>NO LOCAL POSSUEM AVARIAS:</strong> {service?.specificationsCheckList?.observation1}</p>
                    <p><strong>HOUVE SOLUÇÃO DO PROBLEMA:</strong> {service?.specificationsCheckList?.observation2}</p>
                    <p><strong>CLIENTE PAGOU EXCEDENTE:</strong> {service?.specificationsCheckList?.observation3}</p>
                    <p><strong>TELEFONE DO CLIENTE:</strong> {service?.specificationsCheckList?.customerPhone}</p>
                    <p><strong>QUEM FORNECEU O MATERIAL:</strong> {service?.specificationsCheckList?.observation4}</p>
                    <p><strong>QUEM ACOMPANHOU O SERVIÇO:</strong> {service?.specificationsCheckList?.observation5}</p>
                    <p><strong>QUAL O PROBLEMA IDENTIFICADO NO LOCAL:</strong> {service?.specificationsCheckList?.observation6}</p>
                    <p><strong>LAUDO:</strong> {service?.specificationsCheckList?.observation7}</p>
                </div>

                <div className="containerReportAndImg">
                    <div className="containerInput">
                        <input 
                            type="file"
                            className="inputFile"
                            id="image1"
                            onChange={handleImageChange}
                        />
                        <input 
                            type="file"
                            className="inputFile"
                            id="image2"
                            onChange={handleImageChange}
                        />
                    </div>
                    <button
                        className="buttonReport"
                        onClick={handleSubmit}
                    >
                        Emitir relatório
                    </button>
                </div>

                {edit && <EditinService onClose={() => setEdit(false)} />}

                <button className="buttonEdit" onClick={() => setEdit(true)}>
                    <img src={iconEdit} alt="Icon Edit" />
                </button>
            </div>)}
        </>
    )
}
