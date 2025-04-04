import './content.css';

interface ContentProps {
  className?: string;
  children?: React.ReactNode;
  scrollbarColor?: string; // Adicionando a prop para a cor da barra
  scrollbarHoverColor?: string;
}

export default function Content({
  className = '',
  children,
  scrollbarColor = "#888", // Cor padrão
  scrollbarHoverColor = "#555"
}: ContentProps) {
  return (
    <div
      className={`main-content ${className}`}
      style={
        {
          "--scrollbar-thumb-color": scrollbarColor,
          "--scrollbar-thumb-hover": scrollbarHoverColor
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
