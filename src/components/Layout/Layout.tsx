import './Layout.css';
import MainHeader from '../MainHeader/header';
import Aside from '../Aside/Aside';
import Content from '../Content/content';
import { useState } from 'react';

interface LayoutProps{
  children: React.ReactNode
}

export default function Layout({children}:LayoutProps) {
  // Estado para controlar o tema
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // Função para alternar o tema
  // const toggleTheme = () => {
  //   setIsDarkTheme(prevTheme => !prevTheme);
  // };

  // Definir as classes com base no tema
  const layoutClass = isDarkTheme ? 'dark' : 'light';
  const headerClass = isDarkTheme ? 'dark' : 'light';
  const asideClass = isDarkTheme ? 'dark' : 'light';
  const contentClass = isDarkTheme ? 'dark' : 'light';

  return (
    <div className={`main-Layout ${layoutClass}`}>
      <MainHeader className={headerClass} />
      <Aside className={asideClass} />
      <Content className={contentClass}>
          {children}
      </Content>

      {/* Botão para alternar o tema */}
      {/* <button onClick={toggleTheme}>
        {isDarkTheme ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro'}
      </button> */}
    </div>
  );
}
