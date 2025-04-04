import { useState } from "react";
import Switch from "react-switch";
import "./Toggle.css";


export default function Toggle() {
  const [isChecked, setIsChecked] = useState(false); // Estado para controlar o switch

  const handleChange = (checked: boolean) => {
    setIsChecked(checked); // Atualiza o estado com o valor do switch
    console.log("Mudou para:", checked ? "Dark" : "Light");
  };

  return (
    <div className="toggle-container">
      <span>Light</span>
      <Switch
         checked={isChecked}
         onChange={handleChange}
         onColor="#D32F2F"  // Verde quando ligado
         offColor="#FFA500"  // Cinza quando desligado
         onHandleColor="#fff"  // Cor do botão quando ligado
         offHandleColor="#fff"  // Cor do botão quando desligado
         checkedIcon={false}  // Remove ícone de "on"
         uncheckedIcon={false}  // Remove ícone de "off"
         height={20}  // Altura do switch
         width={40}  // Largura do switch
         handleDiameter={18}  // Tamanho do botão
         boxShadow="0px 1px 5px rgba(0, 0, 0, 0.2)"
         activeBoxShadow="0px 0px 10px rgba(0, 0, 0, 0.4)"
      ></Switch>
      <span>Dark</span>
    </div>
  );
}
