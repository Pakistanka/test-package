
//@ts-nocheck
import { useState, useEffect, FC } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';


import { convertStats } from './../../utils';

// import * as FluidLib from './../../fluid-lib';
import Spinner from '../../shared/Spinner';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface DepthChartProps {
    epochs: any;
    setTotalLiquidity?: (value: number) => void;
  }

  const DepthChart: FC<DepthChartProps> = (props) => {
    console.log(props)
    const [liqDepth, setLiqDepth] = useState([]);

    useEffect(() => {
        getData(props.epochs);
    }, [props.epochs]);

    const getData = async (epochs: any) => {
        try {
            console.log(epochs)
            let Realdeadline = undefined
            if (epochs == undefined) {
                Realdeadline = (0)
            } else {
                Realdeadline = (parseInt(epochs) * 86400000 * 5 + Date.now()).toString()
            }
            const res = await FluidLib.StakeBoost.getTotalStake(Realdeadline);

            const finData = Object.keys(res).map(key => {
                return {
                    apr: (5 * +key / 137).toFixed(1),
                    value: res[key] / 1e6
                }
            })
            console.log(finData)
            setLiqDepth(finData);
            if (props.setTotalLiquidity) {
                const finTotal = finData.reduce((a, b) => b?.value + a, 0);
                console.log(finTotal)
                props.setTotalLiquidity(finTotal);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const options = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 0,
                borderRadius: 6,
                barThickness: 1
            },
        },
        scales: {
            x: {
                ticks: {
                    callback: function (value: any, index: number, ticks: any) {
                        return convertStats(value, 0) + ' ADA';
                    }
                },
                title: {
                    display: true,
                    text: 'Liquidity in ADA',
                    font: {
                        weight: 700
                    }
                }
            },
            y: {
                grid: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'APR',
                    font: {
                        weight: 700
                    }
                }
            }
        },
        tooltip: {
            display: false
        },
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },

        },

    };

    const labels = liqDepth?.map(item => item?.apr + '%');
    console.log(liqDepth)
    const data = liqDepth?.length && {
        labels,
        datasets: [
            {
                label: 'Liquidity Available',
                data: liqDepth.map(item => item?.value),
                backgroundColor: localStorage && localStorage?.theme == 'dark' ? '#238092' : '#612dbf',
            },
        ],
    };
    const totalLiquidity = liqDepth?.reduce((a, b) => b?.value + a, 0);

    return (
        <div className='w-full h-full mt-4 dark:bg-darker-gray'>
            <div className='text-center py-3'>
                <div className='font-exBold text-xl text-center tracking-wider'>{totalLiquidity?.toLocaleString()} ADA</div>
                <div className='uppercase tracking-wider text-xs font-medium'>Total Liquidity Available</div>
            </div>
            {liqDepth?.length ?
                <Bar options={options} data={data} width={"100%"} height={"100%"} />
                : <div className='flex items-center justify-center w-full mt-10'> <Spinner /></div>
            }
        </div>
    );
}

export default DepthChart;
