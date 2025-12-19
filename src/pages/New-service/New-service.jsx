import { useState } from "react";
import "./New-Service.css";
import { useNavigate } from "react-router-dom";

export const NewService = () => {
    const [form, setForm] = useState({});
    const [images, setImages] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    function go(path) {
        setLoading(true);
        setTimeout(() => {
            navigate(path);
        }, 700)
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.onloadend = () => {
            setImages((prev) => ({
                ...prev,
                [e.target.id]: reader.result // base64 aqui
            }));
        };

        if (file) reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = {
            ...form,
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

    const handleNewService = async (e) => {
        e.preventDefault();

        const dataToSend = {
            ...form,
            image1: images.image1 || null,
            image2: images.image2 || null
        };

        try {
            const response = await fetch("http://localhost:3030/createService", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend)
            });

            const result = await response.json();

            if (!response.ok) {
                console.error(result);
                alert("Erro ao cadastrar o serviço");
                return;
            }

            alert("Serviço cadastrado com sucesso!");
        } catch (err) {
            console.error(err);
            alert("Falha ao enviar dados");
        }
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
            <div className="containerForm">
                <div className="containerTitleNewService">
                    <h1 className="titlePageNewService">Cadastrar novo serviço</h1>
                </div>

                <form className="formPage" onSubmit={handleSubmit}>
                    <h2 className="titlePlace">Dados do cliente</h2>
                    <input type="text" placeholder=" Nome" id="name" onChange={handleChange}/>
                    <input type="text" placeholder=" Endereço completo" id="address" onChange={handleChange}/>

                    <h2 className="titlePlace">Serviço previsto</h2>
                    <select id="typeOfService" onChange={handleChange}>
                        <option value="linhaBranca">Linha Branca</option>
                        <option value="eletricista">Eletricista</option>
                        <option value="SosAuto">SOS Auto</option>
                    </select>

                    <input type="text" placeholder=" Problema" id="problem" onChange={handleChange}/>
                    <input type="text" placeholder=" Modelo véiculo" id="vehicleModel" onChange={handleChange}/>

                    <h2 className="titlePlace">Serviço executado</h2>
                    <input type="time" id="startTime" onChange={handleChange}/>
                    <input type="time" id="endTime" onChange={handleChange}/>
                    <input type="date" id="date" onChange={handleChange}/>
                    <input type="text" placeholder=" Laudo avaliação" id="report" onChange={handleChange}/>

                    <h2 className="titlePlace">CheckList</h2>
                    <input type="text" placeholder=" Qual modalidade de serviço?" id="modality" onChange={handleChange}/>
                    <input type="text" placeholder=" Marca e modelo?" id="mark" onChange={handleChange}/>
                    <input type="text" placeholder=" No local possuem avarias?" id="observation1" onChange={handleChange}/>
                    <input type="text" placeholder=" Houve solução do problema?" id="observation2" onChange={handleChange}/>
                    <input type="text" placeholder=" Cliente pagou excedente?" id="observation3" onChange={handleChange}/>
                    <input type="text" placeholder=" Telefone do cliente" id="customerPhone" onChange={handleChange}/>
                    <input type="text" placeholder=" Quem forneceu o material?" id="observation4" onChange={handleChange}/>
                    <input type="text" placeholder=" Quem acompanhou o serviço?" id="observation5" onChange={handleChange}/>
                    <input type="text" placeholder=" Qual o problema identificado no local?" id="observation6" onChange={handleChange}/>
                    <input type="text" placeholder=" Laudo" id="observation7" onChange={handleChange}/>
                    {/*<input type="number" placeholder="CPF do cliente" id="observation8" onChange={handleChange}/>

                    <input type="file" id="image1" onChange={handleImageChange}/>
                    <input type="file" id="image2" onChange={handleImageChange}/>

                    <button type="submit">Emitir relatório</button>*/}
                </form>

                <div className="lineWhite"></div>

                <button type="submite" className="buttonNewService" onClick={handleNewService}>Cadastrar serviço</button>
                <button type="submite" className="buttonNewService" onClick={() => go('/home')}>Voltar</button>
            </div>)}
        </>
    );
};
