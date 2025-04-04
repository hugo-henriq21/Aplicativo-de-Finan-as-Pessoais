import { useMemo } from 'react';
import './header.css';
import emojis from '../../utils/emojis'
import Toggle from '../Toggle/Toggle';

interface HeaderProps {
  className: string;  // Receber a classe como prop
}

export default function header({ className }: HeaderProps) {
  const emoji = useMemo(()=>{

     const indice = Math.floor(Math.random() * emojis.length )
     return emojis[indice];



  }, [])

  return (
    <div className={`main-header ${className}`}>
      <Toggle></Toggle>
      <div className='profile'>
        <h3>Olá, {emoji}</h3>
        <span>Huguinho!</span>
      </div>
    </div>
  );
}
