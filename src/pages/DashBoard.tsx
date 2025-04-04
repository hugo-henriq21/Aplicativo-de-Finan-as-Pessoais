import ContentHeader from '../components/ContentHeader/ContentHeader';
import SelectInput from '../components/SelectInput/SelectInput';
import '../css/DashBoard.css';


export default function DashBoard() {
    const nomes = [
        {value: 'Rodrigo', label: 'Rodrigo'},
        {value: 'Maria', label: 'Maria'},
        {value: 'Joana', label: 'Joana'},
      ]
    
      const veiculos = [
        {value: 'Carro', label: 'Siena'},
        {value: 'Carro', label: 'HB20' },
        {value: 'Carro', label: 'Range Hover'}
      ]

    return (
        <div className='main-dashboard'>
            <ContentHeader title='DashBoard'>
                <SelectInput options={nomes}></SelectInput>
                <SelectInput options={veiculos}></SelectInput>
                
            </ContentHeader>
        </div>

    )
}
