
import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';


export function Countdown () {

    const {
        minutes, 
        seconds, 
        hasFinished, 
        isActive, 
        startCountdown, 
        resetCountdown
    } = useContext(CountdownContext)
    
    /* se o valor tiver menos de 2 caracteres vai preencher com 0 na frente e separa os dois com split */

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

 
    return (
        <div>    
            <div className = {styles.countdownContainer}>
                <div>
                   <span>{minuteLeft}</span>
                   <span>{minuteRight}</span>
                </div>
                <span>:</span>
               <div>
                     <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>

            </div>

            {hasFinished ? (
                <button 
                    disabled
                    className={styles.countdownButton}
                    onClick={resetCountdown}
                >
                Ciclo encerrado
                </button>
            )   :   (         
            // serve <> para empacotar o códivo dentro do else para o react como se fosse uma div      
               <> 
                {isActive ? ( 
                    <button 
                        type="button"
                        className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                        onClick={resetCountdown}
                    >
                        Abandonar Ciclo    
                    </button>
                ) : (
                    
                    <button 
                        type="button"
                        className={styles.countdownButton}
                        onClick={startCountdown}
                    >
                        Iniciar Ciclo    
                </button>
                )}
                           
               </> 
            )}         

         </div>
    )
}



