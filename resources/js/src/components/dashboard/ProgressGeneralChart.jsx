import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useDashboardStore } from "../../hooks";
import { Loader } from "@mantine/core";

export const ProgressGeneralChart = () => {
    const { totalVeedores, totalJuntas, isLoading } = useDashboardStore();
    ChartJS.register(ArcElement, Tooltip, Legend);

    // Evita la renderización si los datos aún no están listos
    if (isLoading || (totalJuntas === 0 && totalVeedores === 0)) {
        return <Loader />;
    }

    //console.log({ totalVeedores, totalJuntas });

    const textCenter = {
        id: "textCenter",
        beforeDatasetsDraw(chart) {
            const { ctx } = chart;
            ctx.save();
            ctx.font = "bolder 15px Poppins";
            ctx.fillStyle = "#4263eb";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            //console.log({ totalVeedores, totalJuntas });
            // Calcular el porcentaje y limitarlo entre 0 y 100
            let percentage = totalJuntas > 0
                ? ((totalVeedores * 100) / totalJuntas).toFixed(2)
                : 0;
            percentage = Math.min(Math.max(percentage, 0), 100);

            // Dibuja el porcentaje en el centro del gráfico
            ctx.fillText(
                `${percentage} %`,
                chart.getDatasetMeta(0).data[0].x,
                chart.getDatasetMeta(0).data[0].y
            );
        },
    };

    // Asegúrate de que los valores en el dataset no sean negativos
    const data = {
        labels: ["Veedores Registrados", "Total Juntas"],
        datasets: [
            {
                label: "Total: ",
                data: [
                    Math.max(totalVeedores, 0),
                    Math.max(totalJuntas - totalVeedores, 0),
                ],
                backgroundColor: [
                    "rgba(76, 49, 225, 0.8)",
                    "rgba(37, 224, 132, 0.8)",
                ],
                borderColor: [
                    "rgba(38, 7, 204, 0.8)",
                    "rgba(7, 175, 93, 0.8)"
                ],
                borderWidth: 1.5,
            },
        ],
    };

    return (
        <Doughnut
            height={290}
            data={data}
            plugins={[textCenter]}
            options={{
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                let value = tooltipItem.raw;
                                return value > 0 ? value : 0; // Muestra 0 si es negativo
                            }
                        }
                    }
                }
            }}
        />
    );
};
