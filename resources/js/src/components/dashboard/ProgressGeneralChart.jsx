import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useDashboardStore } from '../../hooks';

export const ProgressGeneralChart = () => {
    const { totalVeedores, totalJuntas } = useDashboardStore();
    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {
        labels: ["Veedores Registrados", "Total Juntas"],
        datasets: [
            {
                label: "Total: ",
                data: [totalVeedores, totalJuntas.totalJuntas],
                backgroundColor: [
                    "rgba(76, 49, 225, 0.8)",
                    "rgba(37, 224, 132, 0.8)",
                ],
                borderColor: [
                    "rgba(38, 7, 204, 0.8)",
                    "rgba(7, 175, 93, 0.8)",
                ],
                borderWidth: 1,
            },
        ],
    };

    return <Doughnut height={270} data={data} options={{ maintainAspectRatio: false }} />;
};
