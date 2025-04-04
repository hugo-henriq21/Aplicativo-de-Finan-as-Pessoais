import './HistoryFinance.css';

interface HistoryFinanceProps {
 
  tagColor: string;
  title: string;
  subtitle: string;
  amount: string;
}

export default function HistoryFinance({
  tagColor,
  title,
  subtitle,
  amount,
}: HistoryFinanceProps) {
  return (
    <li
      className="main-historyFinance" >
      <div className="Tag" 
      style={{ "--tag-color": tagColor } as React.CSSProperties} ></div> 
      <div className="HistoryContent">
        <span>{title}</span> 
        <small>{subtitle}</small>
      </div>
      <h3>{amount}</h3>
    </li>
  );
}
