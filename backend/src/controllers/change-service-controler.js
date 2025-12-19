import { Service } from '../../models/Service.js';

export const chandeServiceControler = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    if (!id) {
        return res.status(400).json({
            error: "O parâmetro 'id' é obrigatório."
        })
    }

    try {
        const [updatedws] = await Service.update(
            {
                nameOfClient: body.nameOfClient,
                addressOfClient: body.addressOfClient,

                specificationsOfService: {
                    problem: body.problem,
                    vehicleModel: body.vehicleModel
                },

                specificationsOfTime: {
                    startTime: body.startTime,
                    endTime: body.endTime,
                    date: body.date,
                    report: body.report
                },

                specificationsCheckList: {
                    modality: body.modality,
                    mark: body.mark,
                    observation1: body.observation1,
                    observation2: body.observation2,
                    observation3: body.observation3,
                    customerPhone: body.customerPhone,
                    observation4: body.observation4,
                    observation5: body.observation5,
                    observation6: body.observation6,
                    observation7: body.observation7
                },

                images: {
                    image1: body.image1 || null,
                    image2: body.image2 || null
                }
            },
            {
                where: { id: id }
            }
        );

        if (updatedws === 0) {
            return res.status(404).json({ error: "Serviço não encontrado." });
        }

        return res.status(200).json({
            message: "Serviço atualizado com sucesso!"
        });

    } catch (error) {
        return res.status(500).json({
            error: "Erro ao atualizar o serviço.",
            details: error.message
        });
    }
}