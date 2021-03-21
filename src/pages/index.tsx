import Head from 'next/head';
import {GetServerSideProps} from 'next';


import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";


import styles from "../styles/pages/Home.module.css";
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps {
  level: number;
  currentExperience: number; 
  challengesCompleted: number;

}

export default function Home(props: HomeProps) {
  return (
    
  <ChallengesProvider
    level = {props.level}
    currentExperience = {props.currentExperience}
    challengesCompleted = {props.challengesCompleted}
  >  
    <div className={styles.container}>
      
        <Head>
          <title> Inicio | Move.it </title>
        </Head>

        <ExperienceBar /> 
      {/* colocar o countdownprovider como contexto ao redor dos compoentes que interessam o countdown */}  
      
      <CountdownProvider>
      {/* para poder separar o lado direito do esquerdo da aplicação */}
          <section>
            <div>
              <Profile />
              <CompletedChallenges/>
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
    </div>
  </ChallengesProvider>
    
  )
}

// Função do next para recuperar os dados dos cookies  
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const {level, currentExperience, challengesCompleted} = ctx.req.cookies;

  return {
    props: {
      level: Number(level), 
      currentExperience: Number(currentExperience), 
      challengesCompleted: Number(challengesCompleted)
    }

  }

}

// sequencia de acesso (por exemplo)
// backend (ruby) - 3o. 
// next.js (Node.js)  - 1o.
// front-end (React.js) - 2o.