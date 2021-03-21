import { useState } from "react"

{/* Esta interface foi criada para passar um parâmetro de propriedades para ser utilizada no APP.tsx dentro do
componente Button */}
interface ButtonProps {
    color: string;   
    children: string; 
}

export function Button(props: ButtonProps) {

    {/* esta const significa um estado mutante que vai ser alterado na funcao increment} */}
    const [counter, setCounter] = useState(1)

    function incremet() {
        setCounter(counter +1);

    }



    return (
        <button type="button" 
                style={{backgroundColor: props.color}}
                onClick={incremet}
        >
            {props.children} A cor é {props.color} <strong>{counter}</strong>

        </button>
    )
}
