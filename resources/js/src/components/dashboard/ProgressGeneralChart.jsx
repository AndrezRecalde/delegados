import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useDashboardStore } from "../../hooks";
import { Loader } from "@mantine/core"; // Si ya estás usando Mantine

export const ProgressGeneralChart = () => {
    const { totalVeedores, totalJuntas, isLoading } = useDashboardStore(); // Asegúrate de tener el estado isLoading
    ChartJS.register(ArcElement, Tooltip, Legend);
    console.log(totalJuntas);

    // Evita la renderización si los datos aún no están listos
    if (totalJuntas === 0 && totalVeedores === 0 && !isLoading) {
        return <Loader />;
    }

    const textCenter = {
        id: "textCenter",
        beforeDatasetsDraw(chart, args, pluginOptions) {
            const { ctx, data } = chart;
            ctx.save();
            ctx.font = "bolder 15px sans-serif";
            ctx.fillStyle = "#4263eb";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            console.log(totalVeedores);
            console.log(totalJuntas);
            // Verifica si totalJuntas es mayor que 0 para evitar NaN
            const percentage =
                totalJuntas > 0
                    ? ((totalVeedores * 100) / totalJuntas).toFixed(2)
                    : 0;


            ctx.fillText(
                `${percentage} %`,
                chart.getDatasetMeta(0).data[0].x,
                chart.getDatasetMeta(0).data[0].y
            );
        },
    };

    const data = {
        labels: ["Veedores Registrados", "Total Juntas"],
        datasets: [
            {
                label: "Total: ",
                data: [totalVeedores, totalJuntas - totalVeedores],
                backgroundColor: [
                    "rgba(76, 49, 225, 0.8)",
                    "rgba(37, 224, 132, 0.8)",
                ],
                borderColor: ["rgba(38, 7, 204, 0.8)", "rgba(7, 175, 93, 0.8)"],
                borderWidth: 1.5,
            },
        ],
    };

    return (
        <Doughnut
            height={290}
            data={data}
            plugins={[textCenter]}
            options={{ maintainAspectRatio: false }}
        />
    );
};
