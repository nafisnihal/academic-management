"use client";
import Chart from "react-apexcharts";

export default function BarChart({
  data,
}: {
  data: { name: string; count: number }[];
}) {
  const options = {
    chart: {
      id: "popular-courses",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    grid: {
      show: true,
    },
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        columnWidth: "10%",
        distributed: false,
        startingShape: "flat",
        endingShape: "flat",
      },
    },
    colors: ["#fff"],
    xaxis: {
      categories: data.map((d) => d.name),
      labels: {
        show: false,
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "14px",
        },
      },
    },
    legend: { show: false },
    tooltip: {
      theme: "dark",
    },
  };

  const series = [
    {
      name: "Enrollments",
      data: data.map((d) => d.count),
    },
  ];

  return <Chart options={options} series={series} type="bar" height={300} />;
}
