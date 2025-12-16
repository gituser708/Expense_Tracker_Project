import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, plugins, } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {useQuery} from '@tanstack/react-query';
import {listTransactionQuery} from '../../React_Query/transactionQuery/transactionQuery';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TransactionChart() {
    const { data: transactions, isLoading, error, isFetched, refetch } = useQuery({
        queryFn:  listTransactionQuery,
        queryKey: ['transactions-lists'],
    });

    const totals = transactions?.reduce(
        (acc, transaction) => {
            if (transaction?.type === 'income') {
                acc.income += transaction?.amount
            } else {
                acc.expense += transaction?.amount
            };
            return acc;
        },
        { income: 0, expense: 0 },
    );
    
    const data = {
         labels: ["Income", "Expense"],
        datasets: [
            {
                labels: "Transactions",
                data: [totals?.income, totals?.expense],
                backgroundColor: ["#36A2EB", "#FF6384"],
                borderColor: ['#36A2EB', '#FF6384'],
                borderWith: 1,
                hoverOffset: 4
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    padding: 25,
                    boxWidth: 12,
                    font: {
                        size: 15,
                    }
                }
            },
            title: {
                display: true,
                text: "Income vs Expense",
                font: {
                    size: 18,
                    weight: "bold",
                },
                padding: {
                    top: 10,
                    bottom: 30
                }
            }
        },
        cutout: "25%"
    };
    
    return (
        <div className="chart" style={{height: '350px', marginTop: '2rem'}}>
            <Doughnut data={data} options={options} />
        </div>
    );
};