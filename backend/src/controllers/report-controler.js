import { generateReport } from "../services/generate-report.js"

export const reportController = async (req, res) => {
    try {
        const pdfDoc = await generateReport(req.body);

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=relatorio.pdf");
        pdfDoc.pipe(res);
        pdfDoc.end();
    } catch (error) {
        console.error("Erro ao gerar PDF:", error);
        res.status(500).json({ error: "Erro ao gerar relatório PDF." })
    }
}
