import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Importar useParams
import ContentHeader from "../components/ContentHeader/ContentHeader";
import SelectInput from "../components/SelectInput/SelectInput";
import HistoryFinance from "../components/HistoryFinance/HistoryFinance";
import gains from "../repositories/gains";
import expenses from "../repositories/expenses";
import "../css/Lista.css";

interface IData {
  id: string;
  description: string;
  amountFormatted: string;
  frequency: string;
  dataFormatted: string;
  tagColor:  string;
}

export default function Lista() {
  const [data, setData] = useState<IData[]>([]);
  const { type } = useParams(); // Capturar o parâmetro 'type' da URL

  const title = useMemo(() => {
    return type === "entrance-balance" ? "Entradas" : "Saídas";
  }, [type]);

  const lineColor = useMemo(() => {
    return type === "entrance-balance" ? "#F7931B" : "#E44C4E";
  }, [type]);

  const listData = useMemo(() => {
    return type === "entrance-balance" ? gains : expenses;
  }, [type]);

  const mounths = [
    { value: 7, label: "Julho" },
    { value: 8, label: "Agosto" },
    { value: 9, label: "Setembro" },
  ];

  const years = [
    { value: 2020, label: 2020 },
    { value: 2019, label: 2019 },
    { value: 2018, label: 2018 },
  ];
  useEffect(() => {
    const response = listData.map((item) => {
      return {
        id: String(Math.random() * data.length),
        description: item.description,
        amountFormatted: item.amount,
        frequency: item.frequency,
        dataFormatted: item.date,
        tagColor: item.frequency === 'recorrente'? '#4E41F0': '#E44C4E',
      };
    });
    setData(response);
  }, []);
  return (
    <div className="main-lista">
      <ContentHeader title={title} lineColor={lineColor}>
        <SelectInput options={mounths} />
        <SelectInput options={years} />
      </ContentHeader>
      <div className="filter">
        <button type="button" className="tag-filter tag-filter-recurrent">
          Recorrentes
        </button>
        <button type="button" className="tag-filter tag-filter-eventual">
          Eventuais
        </button>
      </div>
      <div>
        {data.map((item) => (
          <HistoryFinance
            key={item.id}
            tagColor={item.tagColor}
            title={item.description}
            subtitle={item.dataFormatted}
            amount={item.amountFormatted}
          />
        ))}
      </div>
    </div>
  );
}
