import { useQueries, useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fecthCoinHistory } from "./api";
import ReactApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IChartContext {
  coinId: string;
}
interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
const CoinChart = () => {
  const { coinId } = useOutletContext<IChartContext>();
  const { isLoading, data } = useQuery<IHistorical[]>({
    queryKey: ["ohlcv"],
    queryFn: () => fecthCoinHistory(coinId),
    refetchInterval: 5000,
  });
  const isDark = useRecoilValue(isDarkAtom);
  console.log(data);
  return (
    <div>
      {isLoading ? (
        "Loading Chart.."
      ) : (
        <ReactApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => Number(price.close)) as number[],
            },
          ]}
          options={{
            theme: { mode: isDark ? "dark" : "light" },
            chart: {
              height: 300,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: { show: false },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
              type: "datetime",
              categories: data?.map((date) =>
                new Date(date.time_close * 1000).toUTCString()
              ),
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            },
            colors: ["#0fbcf9"],
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
};
export default CoinChart;
