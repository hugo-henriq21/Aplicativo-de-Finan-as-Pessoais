import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Importar useParams
import { v4 as uuid } from "uuid";
import ContentHeader from "../components/ContentHeader/ContentHeader";
import SelectInput from "../components/SelectInput/SelectInput";
import HistoryFinance from "../components/HistoryFinance/HistoryFinance";
import gains from "../repositories/gains";
import expenses from "../repositories/expenses";
import formatCurrency from "../utils/formatCurrency";
import formatDate from "../utils/formatDate";
import listofmonths from "../utils/months";

import "../css/Lista.css";

interface IData {
  id: string;
  description: string;
  amountFormatted: string;
  frequency: string;
  dataFormatted: string;
  tagColor: string;
}

export default function Lista() {
  const [data, setData] = useState<IData[]>([]);
  const [monthSelected, setMonthSelected] = useState<string>(
    String(new Date().getMonth() + 1),
  );
  const [yearSelected, setYearSelected] = useState<string>(
    String(new Date().getFullYear()),
  );
  const [selectedFrequency, setSelectedFrequency] = useState<string[]>([
    "recorrente",
    "eventual",
  ]);

  const { type } = useParams(); // Capturar o parâmetro 'type' da URL

  const title = useMemo(() => {
    return type === "entrance-balance" ? "Entradas" : "Saídas";
  }, [type]);

  const lineColor = useMemo(() => {
    return type === "entrance-balance" ? "#4E41F0" : "#E44C4E";
  }, [type]);

  const listData = useMemo(() => {
    return type === "entrance-balance" ? gains : expenses;
  }, [type]);

  // const pageData = useMemo(()=>{
    
  //     return type === 'entrance-balance'? {
  //       title: 'Entradas',
  //       lineColor: '#F7931B',
  //       listData: gains
  //     }:{
  //       title:'Saídas',
  //       lineColor: '#E44C4E',
  //       listData: expenses
  //     }
    
  // },[type])

  const months = useMemo(() => {
    return listofmonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      };
    });
  }, []);

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    listData.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year);
      }
    });

    return uniqueYears.map((year) => {
      return {
        value: year,
        label: year,
      };
    });
  }, [listData]);

  

  const handleFrequencyClick = (frequency: string) => {
    const alreadySelected = selectedFrequency.findIndex(
      (item) => item === frequency,
    );
    if (alreadySelected >= 0) {
      const filtered = selectedFrequency.filter((item) => item !== frequency);
      setSelectedFrequency(filtered);
      // console.log('Já está selecionado!')
    } else {
      setSelectedFrequency((prev) => [...prev, frequency]);
    }
  };

  // const handleMonthSelected = (month:string)=>{
  //   try{
  //     const parseMonth = Number(month);
  //     setMonthSelected(parseMonth)
  //   }catch(error){
  //     throw new Error('invalid month value. Is accept 0 - 24')
      
  //   }
  // }
  
  // const handleYearSelected = (year:string)=>{
  //   try{
  //     const parseYear = Number(year);
  //     setMonthSelected(parseYear)
  //   }catch(error){
  //     throw new Error('invalid month value. Is accept integer number')
      
  //   }
  // }
  useEffect(() => {
    if (years.length > 0) {
      setYearSelected(String(years[0].value));
    }
  }, [years]);

  useEffect(() => {
    const filteredDate = listData.filter((item) => {
      const date = new Date(item.date);
      const month = String(date.getMonth() + 1);
      const year = String(date.getFullYear());

      return (
        month === monthSelected &&
        year === yearSelected &&
        selectedFrequency.includes(item.frequency)
      );
    });

    const formattedDate = filteredDate.map((item) => {
      return {
        id: uuid(),
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dataFormatted: formatDate(item.date),
        tagColor: item.frequency === "recorrente" ? "#4E41F0" : "#E44C4E",
      };
    });
    setData(formattedDate);
  }, [listData, monthSelected, yearSelected, selectedFrequency]);

  return (
    <div className="main-lista">
      <ContentHeader title={title} lineColor={lineColor}>
        <SelectInput
          options={months}
          onChange={(e) => setMonthSelected(e.target.value)}
          defaultValue={monthSelected}
        />
        <SelectInput
          options={years}
          onChange={(e) => setYearSelected(e.target.value)}
          defaultValue={yearSelected}
        />
      </ContentHeader>
      <div className="filter">
        <button
          type="button"
          className={`tag-filter tag-filter-recurrent 
        ${selectedFrequency.includes("recorrente") && "tag-actived"}`}
          onClick={() => handleFrequencyClick("recorrente")}
        >
          Recorrentes
        </button>

        <button
          type="button"
          className={`tag-filter tag-filter-eventual 
        ${selectedFrequency.includes("eventual") && "tag-actived"}`}
          onClick={() => handleFrequencyClick("eventual")}
        >
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
