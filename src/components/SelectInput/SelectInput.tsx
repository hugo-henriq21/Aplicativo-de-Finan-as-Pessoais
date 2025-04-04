import "./SelectInput.css";

interface SelectInputProps {
  options: {
    value: string | number;
    label: string | number;
  }[];
}

export default function SelectInput({ options }: SelectInputProps) {
  return (
    <div>
      <select className="select">
        {options.map((option, index) => (  //percorrerá cada opção informada e atribuirá um value e uma label como requere a interface
          <option key={`${option.value}-${index}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
