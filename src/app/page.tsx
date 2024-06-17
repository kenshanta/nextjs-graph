"use client";
import Image from "next/image";
import { useState, useEffect, useCallback, useMemo } from "react";
import styles from "./page.module.scss";
import loadingSvg from "../../public/loading.svg";
import { Bar } from "react-chartjs-2";
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Chart from "chart.js/auto";
import nameCount from "@/utils/nameCount";
import "@/components/filterOptionArea";
import "@/components/flexBox";
import { ChartData, DataProps } from "@/types";
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface FilterOption {
  label: string;
  value: string;
}

export default function Home() {
  const [chartData, setChartData] = useState<ChartData | null>({
    labels: ["shop_click", "interaction", "start"],
    datasets: [{ label: "initialLabel", data: new Array(0) }],
  });
  const filterOptions: FilterOption[] = useMemo(
    () => [
      { label: "All", value: "" },
      { label: "Platform", value: "platform" },
      { label: "Version", value: "version" },
    ],
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>(filterOptions[0].value);
  const options = useMemo(
    () => ({
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      plugins: {
        legend: {
          position: "bottom" as const,
        },
        title: {
          display: true,
          text: `${filter ? filter.toUpperCase() : "All"} Graph Logs`,
          font: {
            size: 33,
            family: "Protest",
          },
        },
      },
      maintainAspectRatio: true,
    }),
    [filter]
  );

  const fetchData = useCallback(async (filterValue: string = "") => {
    setIsLoading(true);
    try {
      const res = await fetch(`api/data?filter=${filterValue}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data: DataProps[] = await res.json();
      const filteredData = nameCount(data, filterValue);

      setChartData(filteredData);
    } catch (error) {
      console.error("Fetch data error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(filter);
  }, [filter, fetchData]);

  const handleSelectionChange = useCallback((event: CustomEvent) => {
    setFilter(event.detail.value);
  }, []);

  useEffect(() => {
    const filterOptionArea = document.querySelector(
      "filter-option-area"
    ) as HTMLElement & { options: FilterOption[]; selectedValue: string };

    if (filterOptionArea) {
      filterOptionArea.options = filterOptions;
      filterOptionArea.selectedValue = filter;
      filterOptionArea.addEventListener(
        "selection-changed",
        handleSelectionChange
      );
    }

    return () => {
      if (filterOptionArea) {
        filterOptionArea.removeEventListener(
          "selection-changed",
          handleSelectionChange
        );
      }
    };
  }, [filter, filterOptions, handleSelectionChange]);

  return (
    <main className={styles.main}>
      <div>
        <filter-option-area></filter-option-area>
        {isLoading ? (
          <div className={styles.loader}>
            <svg height={100} viewBox="0 0 400 100">
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
              >
                Loading...
              </text>
            </svg>
          </div>
        ) : (
          <div className={styles.graph}>
            <Bar options={options} data={chartData!} />
          </div>
        )}
        <flex-box></flex-box>
      </div>
    </main>
  );
}
