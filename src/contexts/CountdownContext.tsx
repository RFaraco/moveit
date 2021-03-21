import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;


}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData) 

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({children}: CountdownProviderProps) {

    const {startNewChallenge} = useContext(ChallengesContext); 

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false)


    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown() {

        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false);
        setTime(0.1 * 60); 
    }


    /* vai executar uma função depois de 1 segundo (1000) reduzindo o time em 1 segundo */
    useEffect(() => {
        if (isActive && time > 0 ) { 
            countdownTimeout = setTimeout(() => {  
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time === 0) {
            // finalizou a contagem
            setHasFinished(true);
            setIsActive(false);
            // chama a função que start novo desafio
            startNewChallenge();
        }
        
    }, [isActive, time]) 


    return (

        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>

    )

}
