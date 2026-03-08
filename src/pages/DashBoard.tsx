import { useMemo, useState, useEffect } from "react";
import ContentHeader from '../components/ContentHeader/ContentHeader';
import SelectInput from '../components/SelectInput/SelectInput';
import WalletBox from '../components/WalletBox/WalletBox';
import MessageBox from "../components/MessageBox/MessageBox";
import listofmonths from "../utils/months";

import happyImg from '../assets/happy.svg'
import sadImg from '../assets/sad.svg'


import gains from "../repositories/gains";
import expenses from "../repositories/expenses";
import '../css/DashBoard.css';


export default function DashBoard() {
    const [monthSelected, setMonthSelected] = useState<string>(
        String(new Date().getMonth() + 1),
      );
      const [yearSelected, setYearSelected] = useState<string>(
        String(new Date().getFullYear()),
      );
      

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
    
        [...expenses,...gains].forEach((item) => {
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
      }, []);

      const totalExpenses = useMemo(()=>{
        let total: number = 0;

        expenses.forEach(item =>{
          const date = new Date(item.date);
          const year = String(date.getFullYear());
          const month = String(date.getMonth() + 1);

          if(month === monthSelected && year === yearSelected){
            try{
              total +=Number(item.amount)
            }catch{
              throw new Error('Invalid amount! Amount must be number')
            }
          }
        });
        return total
      },[monthSelected, yearSelected])

      const totalGains = useMemo(()=>{
        let total: number = 0;

        gains.forEach(item =>{
          const date = new Date(item.date);
          const year = String(date.getFullYear());
          const month = String(date.getMonth() + 1);

          if(month === monthSelected && year === yearSelected){
            try{
              total +=Number(item.amount)
            }catch{
              throw new Error('Invalid amount! Amount must be number')
            }
          }
        });
        return total
      },[monthSelected, yearSelected])

      const totalBalance = useMemo(()=>{
        return totalGains - totalExpenses;

      },[totalGains, totalExpenses])

      const messageBoxTitle = useMemo(()=>{
        if(totalBalance >0){
          return {
            title : 'Muito Bem!',
            description: 'Sua carteira está positiva!',
            icon: happyImg,
            footerText: 'Continue assim. Considere investir seu saldo.'

          }
        }else if(totalBalance <0){
          return {
            title : 'Cuidado com as despesas!',
            description: 'Sua carteira está negativa!',
            icon: sadImg,
            footerText: 'Que pena, tente melhorar no próximo mês!'

          }
        }else{
          return {
            title : 'Ufa!',
            description: 'Neste mês, você gastou exatamente o que ganhou.',
            icon: happyImg,
            footerText: 'Tenha cuidado, no próximo mês, tente poupar o seu dinheiro!'

          }
        }
      },[totalBalance])

      
   

    return (
        <div className='main-dashboard'>
            <ContentHeader title='DashBoard'>
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
            <div className="wallet-box">
              <WalletBox
                title="saldo"
                amount={totalBalance}
                footerlabel="Atualizado com base nas entradas e saídas"
                icon="dollar"
                backgroundColor="#4E41F0"
              ></WalletBox>
              <WalletBox
                title="entradas"
                amount={totalGains}
                footerlabel="Atualizado com base nas entradas e saídas"
                icon='arrowUp'
                backgroundColor="#F7931B"
              ></WalletBox>
              <WalletBox
                title="saídas"
                amount={totalExpenses}
                footerlabel="Atualizado com base nas entradas e saídas"
                icon='arrowDown'
                backgroundColor="#E44C4E"
              ></WalletBox>
              <MessageBox
                title={messageBoxTitle.title}
                description= {messageBoxTitle.description}
                footerText={messageBoxTitle.footerText}
                icon={messageBoxTitle.icon}
              >

              </MessageBox>
            </div>
        </div>

    )
}
