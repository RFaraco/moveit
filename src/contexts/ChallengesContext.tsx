import {createContext, ReactNode, useEffect, useState} from 'react';

// coloca todos os challenges do arquivo json dentro do array challenges 
import challenges from "../../challenges.json"; 

// biblioteca para armazenamento de dados nos cookies
import Cookies from 'js-cookie';
import {LevelUpModal} from '../components/LevelUpModal';


// tipar os tipos de desafios do Json
interface Challenge {

    type: 'body' | 'eye';
    description: string;
    amount: number;
}


interface ChallengesContextData{
    level: number;
    currentExperience: number; 
    challengesCompleted: number; 
    experienceToNextLevel: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;   
    closeLevelUpModal: () => void;                       

}

interface ChallengesProviderProps {
// children pode ser um componente react
    children: ReactNode;
    level: number;
    currentExperience: number; 
    challengesCompleted: number;

}
// children foi tipado

export const ChallengesContext = createContext<ChallengesContextData>({} as ChallengesContextData);

export function ChallengesProvider({children, ...rest}: ChallengesProviderProps) {

    /* criar as informações que queiro passar entre os componentes */
    const [level, setLevel] = useState(rest.level || 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ||  0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted || 0);

    // estado para armazenar challenge
    const [activeChallenge, setActiveChallenge] = useState(null);

    // estado para abrir modal de nivel
    const[isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    // vai executar apenas uma vez assim que o componente for exibido em tela (passa array parametro vazio)
    useEffect(() => {
        Notification.requestPermission(); 
    }, [])

    // vai disparar uma função quando tiver alteração no level, currentExperience, challengesCompleted
    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
        
    }, [level, currentExperience, challengesCompleted])


    /* Função que será passada como parâmetro do contexto. OS componentes começam a se conversar por meio das funções */
  
    function levelUp() {
      setLevel(level + 1);
      setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        // passa o challenge qualquer (randomico)

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();
        
        if (Notification.permission === 'granted') {

            new Notification('Novo Desafio ', {
                body: `Valendo ${challenge.amount}xp!`,
            })
        }
    }


    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;
        

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }        
        
        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);

    }
    
    return(
        /* quando colo um conteudo dentro do contexto uso o children */
        
        <ChallengesContext.Provider 
            value={{
                level, 
                currentExperience, 
                challengesCompleted, 
                activeChallenge,
                experienceToNextLevel,
                levelUp,
                startNewChallenge,
                resetChallenge,
                completeChallenge,
                closeLevelUpModal                          
            }}>

            {children}
            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>

    )
}

