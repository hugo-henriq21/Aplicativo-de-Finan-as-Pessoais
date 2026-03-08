import { useMemo } from 'react';
import CountUp from 'react-countup'
import dollarImg from '../../assets/dollar.svg';
import arrowUpImg from '../../assets/arrow-up.svg';
import arrowDownImg from '../../assets/arrow-down.svg';
import "./WalletBox.css";


interface WalletBoxProps{
    title:string;
    amount:number;
    footerlabel: string;
    icon:'dollar' | 'arrowUp' | 'arrowDown';
    backgroundColor: string;
}

export default function WalletBox({
    title,
    amount,
    footerlabel,
    icon,
    backgroundColor
}: WalletBoxProps){

  const iconSelected = useMemo(() => {
    if(icon === 'dollar'){
      return dollarImg;
    }
    if(icon === 'arrowUp'){
      return arrowUpImg;
    }
    if(icon === 'arrowDown'){
      return arrowDownImg
    }
    
  },[icon]);

  return (
    <div 
    className='main-wallet-box'
    style = {{backgroundColor: backgroundColor}}
    >
      <div className='wallet-title'>
        <span>{title}</span>
        <h1>
          <CountUp
          end={amount}
          prefix={"R$"}
          separator='.'
          decimal=','
          decimals={2}
          ></CountUp>
        </h1>
        <small>{footerlabel}</small>
      </div>
        
        
        <img src={iconSelected} alt={title} />
        
    </div>
  );
}
