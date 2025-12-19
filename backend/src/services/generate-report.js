import "pdfmake/build/vfs_fonts.js";
import PdfPrinter from "pdfmake";
import fs from "fs";

const nowDate = new Date();
const day = nowDate.getDate();
const month = nowDate.getMonth() + 1;
const year = nowDate.getFullYear();
const hour = nowDate.getHours();
const minutes = nowDate.getMinutes();

const logoIps = fs.readFileSync("images/logoIPS.png").toString("base64");
const logoFormigaEnos = fs.readFileSync("images/logoSistemaFormigaEnos.png").toString("base64");

export async function generateReport(data) {
    const fonts = {
        Roboto: {
            normal: "fonts/Roboto-Regular.ttf",
            bold: "fonts/Roboto-Medium.ttf",
        }
    };

    const printer = new PdfPrinter(fonts);

    const docDefinition = {
        content: [
            { image: "data:image/png;base64," + logoIps, width: 70 },
            "\n",
            { text: `${day}/${month}/${year} - ${hour}:${minutes}`, fontSize: 10 },
            "\n",
            { text: "RELATÓRIO DE ATENDIMENTO", alignment: "center", fontSize: 20, bold: true },
            "\n",
            { text: 'Dados do cliente', alignment: 'center', fontSize: 15, bold: true },
            { text: `Nome: ${data.name}` },
            { text: `Endereço: ${data.address}` },
            "\n",
            { text: 'Serviço previsto', alignment: 'center', fontSize: 15, bold: true },
            { text: `Problema: ${data.problem}` },
            { text: `Modelo: ${data.vehicleModel}` },
            "\n",
            { text: 'Serviço executado', alignment: 'center', fontSize: 15, bold: true  },
            { text: `Início: ${data.startTime}` },
            { text: `Fim: ${data.endTime}` },
            { text: `date: ${data.date}` },
            { text: `Laudo: ${data.report}` },
            "\n",
            { text: 'CheckList', alignment: 'center', fontSize: 15, bold: true  },
            { text: `QUAL A MODALIDADE DE SERVIÇO: ${data.modality}` },
            { text: `MARCA E MODELO: ${data.mark}` },
            { text: `NO LOCAL POSSUEM AVARIAS: ${data.observation1}` },
            { text: `HOUVE SOLUÇÃO DO PROBLEMA: ${data.observation2}` },
            { text: `CLIENTE PAGOU EXCEDENTE: ${data.observation3}` },
            { text: `TELEFONE DO CLIENTE: ${data.customerPhone}` },
            { text: `QUEM FORNECEU O MATERIAL: ${data.observation4}` },
            { text: `QUEM ACOMPANHOU O SERVIÇO: ${data.observation5}` },
            { text: `QUAL O PROBLEMA IDENTIFICADO NO LOCAL: ${data.observation6}` },
            { text: `LAUDO: ${data.observation7}` },
            "\n",
            data.image1 ? { image: data.image1, width: 100, heigth: 100 } : "",
            data.image2 ? { image: data.image2, width: 100, heigth: 100 } : "",
        ],

        footer: {
            stack: [
                { image: "data:image/png;base64," + logoFormigaEnos, width: 160, margin: [0, -8, 0, 20] },
            ]
        }
    };

    return printer.createPdfKitDocument(docDefinition);
}
