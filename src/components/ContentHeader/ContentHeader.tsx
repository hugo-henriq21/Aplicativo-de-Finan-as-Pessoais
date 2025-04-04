import "./ContentHeader.css";

interface ContentHeaderProps {
  title: string;
  lineColor?: string; // Cor da linha como opcional
  children: React.ReactNode;
}

export default function ContentHeader({
  title,
  lineColor = "rgb(226, 115, 123)", // Cor padrão
  children,
}: ContentHeaderProps) {
  return (
    <div
      className="contentHeader-main"
      style={{ "--line-color": lineColor } as React.CSSProperties}
    >
      <div className="TitleHeader">
        <h1>{title}</h1>
      </div>

      <div className="controllers">{children}</div>
    </div>
  );
}
