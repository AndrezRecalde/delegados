import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useDashboardStore } from '../../hooks';

export const ProgressGeneralChart = () => {
    const { totalVeedores, totalJuntas } = useDashboardStore();
    ChartJS.register(ArcElement, Tooltip, Legend);

    const textCenter = {
        id: 'textCenter',
        beforeDatasetsDraw(chart, args, pluginOptions){
            const { ctx, data } = chart;
            ctx.save();
            ctx.font = 'bolder 20px sans-serif';
            ctx.fillStyle = totalVeedores > (totalVeedores - totalJuntas.totalJuntas) ? '#4263eb' : '#4ff4a2';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${((totalVeedores * 100) / totalJuntas.totalJuntas).toFixed(2)} %`, chart.getDatasetMeta(0).data[0].x,chart.getDatasetMeta(0).data[0].y);
        }
    }

    const data = {
        labels: ["Veedores Registrados", "Total Juntas"],
        datasets: [
            {
                label: "Total: ",
                data: [totalVeedores, totalJuntas.totalJuntas - totalVeedores],
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

    return <Doughnut height={290} data={data} plugins={[textCenter]} options={{ maintainAspectRatio: false }} />;
};
