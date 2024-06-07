import { ChartData, DataProps } from "@/types";

const updateByFilter = (
  groupedResult: object,
  value: string,
  filter: string
) => {
  const data = new Array(0);

  for (let name in groupedResult) {
    if (name === value) {
      groupedResult[name].forEach((item) => {
        data.push(item.count);
      });
    }
    if (filter.length === 0) data.push(0);
  }

  return data;
};

export default function nameCount(
  props: DataProps[],
  filter: string
): ChartData {
  const staticLabels = ["shop_click", "interaction", "start"];
  const groupedResult = props.reduce(
    (acc, { count, version, platform, name }) => {
      if (!acc[name]) {
        acc[name] = [];
      }
      acc[name].push({ version, count, platform });
      return acc;
    },
    {}
  );

  const currentAttributes = props.map((item) =>
    item.platform ? item.platform : item.version ? item.version : item.name
  );

  const uniqueArrAttributes = Array.from(new Set(currentAttributes));
  const data: ChartData = {
    labels: uniqueArrAttributes.map((item) => item),
    datasets: staticLabels.map((value) => ({
      label: value,
      data: updateByFilter(groupedResult, value, filter),
    })),
  };
  return data;
}
