export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
  }[];
}
export interface DataProps {
  name: string;
  count: number;
  platform?: string;
  version?: string;
}
