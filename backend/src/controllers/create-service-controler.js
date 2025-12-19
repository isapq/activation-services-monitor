import Service from "../../models/Service.js";

export const createServiceControler = async (req, res) => {
  try {
    const newService = await Service.create({
      nameOfClient: req.body.name,
      addressOfClient: req.body.address,

      specificationsOfService: {
        typeOfService: req.body.typeOfService,
        problem: req.body.problem,
        vehicleModel: req.body.vehicleModel
      },

      specificationsOfTime: {
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        date: req.body.date,
        report: req.body.report,
      },

      specificationsCheckList: {
        modality: req.body.modality,
        mark: req.body.mark,
        observation1: req.body.observation1,
        observation2: req.body.observation2,
        observation3: req.body.observation3,
        customerPhone: req.body.customerPhone,
        observation4: req.body.observation4,
        observation5: req.body.observation5,
        observation6: req.body.observation6,
        observation7: req.body.observation7,
        observation8: req.body.observation8,
      },

      images: {
        image1: req.body.image1,
        image2: req.body.image2,
      }
    });

    return res.status(201).json({
      message: "Serviço criado com sucesso!",
      service: newService
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Erro ao criar serviço",
      error: error.message
    });
  }
};
