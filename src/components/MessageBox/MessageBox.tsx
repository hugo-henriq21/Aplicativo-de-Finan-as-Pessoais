import "./MessageBox.css";



interface MessageBoxProps{
    title: string;
    description: string;
    footerText: string;
    icon: string;
}

export default function MessageBox({
    title,
    description,
    footerText,
    icon
}: MessageBoxProps) {
  return (
    <div className="main-messageBox">
        <header>
            <h1>
                {title} 
                <img src={icon} alt="" />
            </h1>
            <p>
               {description} 
            </p>
        </header>
        <footer>
            <span>{footerText}</span>
        </footer>
    </div>
  );
}
