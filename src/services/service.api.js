export const handleUpdate = async ({ objUpdate }) => {
    try {
        const response = await fetch(
            `http://localhost:3030/modifyService/${objUpdate.id}`,
        {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(objUpdate),
        }
        );

        if (!response.ok) {
            throw new Error("Error of change de service");
        }

        const data = await response.json();
        console.log('Serviço atualizado:', data);

        return data;
    } catch (error) {
        console.error('Error of try change de service. ERROR:', error);
        alert('Erro ao tentar alterar o serviço.')
    }
}
