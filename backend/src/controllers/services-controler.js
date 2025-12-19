import Service from '../../models/Service.js';

export const servicesControler = async (req, res) => {
    try {
        const services = await Service.findAll();

        if (services.length === 0) {
            return res.status(200).json({ 
                message: "Não há registro no banco de dados",
                data: []
            });
        }

        return res.status(200).json({ 
            message: "Dados localizados com sucesso.",
            data: services
        })
    } catch (error) {
        console.error("Erro:", error);
        return res.status(500).json({ 
            message: "Erro ao tentar efetuar a procura dos serviços."
        })
    }
}

export const servicebyIDControler = async (req, res) => {
    const { id } = req.params;

    try {
        const service = await Service.findByPk(id);

        if (!service) {
            return res.status(200).json({ 
                message: "Não há registro no banco de dados desse serviço",
                data: []
            });
        }

        return res.status(200).json({ 
            message: "Serviço localizado com sucesso.",
            data: service
        })
    } catch (error) {
        console.error("Erro:", error);
        return res.status(500).json({ 
            message: "Erro ao tentar efetuar a procura do serviço."
        })
    }
}
