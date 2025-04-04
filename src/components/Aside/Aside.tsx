import logo from '../../assets/logo.svg'
import {MdDashboard, MdArrowDownward,MdArrowUpward, MdExitToApp} from 'react-icons/md'
import './Aside.css';

interface AsideProps {
  className: string;  // Receber a classe como prop
}

export default function Aside({ className }: AsideProps) {
  return (
    <div className={`main-aside ${className}`}>
     <header>
            <img className='Logoimg' src={logo} alt="Logo" />
            <span>Minha Carteira</span>
    </header> 
    <nav>
      <a href="/dashboard"><MdDashboard/>Dashboard</a>
      <a href="/lista/entrance-balance"><MdArrowUpward/>Entradas</a>
      <a href="/lista/exit-balance"><MdArrowDownward/>Saídas</a>
      <a href=""><MdExitToApp/>Sair</a>
     
    </nav>
    </div>
  );
}
