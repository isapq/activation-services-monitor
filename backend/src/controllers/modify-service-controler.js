import Service from "../../models/Service.js";

export const modifyServiceControler = async (req, res) => {
  const {
    nameOfClient,
    addressOfClient,
    specificationsOfService,
    specificationsOfTime,
    specificationsCheckList
  } = req.body;

  const { id } = req.params;

  try {
    const serviceOfId = await Service.findByPk(id);

    if (!serviceOfId) {
      return res.status(404).json({ message: 'Service not found.' })
    }

    console.log('BODY RECEBIDO:', req.body);

    await serviceOfId.update({
      nameOfClient: nameOfClient ?? serviceOfId.nameOfClient,
      addressOfClient: addressOfClient ?? serviceOfId.addressOfClient,

      specificationsOfService: {
        ...serviceOfId.specificationsOfService,
        ...specificationsOfService,
      },

      specificationsOfTime: {
        ...serviceOfId.specificationsOfTime,
        ...specificationsOfTime,
      },

      specificationsCheckList: {
        ...serviceOfId.specificationsCheckList,
        ...specificationsCheckList,
      },
    });

    return res.status(200).json({
      message: 'Service updated successfully',
      serviceOfId
    });
  
  } catch (error) {
    console.error('Dont was possible, change the service. Error:', error)

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};
