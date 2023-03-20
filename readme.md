# Landrup Dans
Elev: Benjamin Nielsen
Hold: WU07
Uddannelse: Webudvikler

## Introduktion
Velkommen til Landrup Dans - en online platform der tilbyder kunder overblik og tilmeldelse over deres danseaktiviteter. Projektet er bygget ved hjælp af moderne teknologier og frameworks og fungere primary som web-app.

## Kom i gang
Skal du vidreudvikle på dette projekt? Følg blot disse skridt for at komme i gang.

Nuværende reposotory indenholder kun front-end delen. Du skal derfor også bruge [landrup-dans-web-api](https://github.com/benamager/svendeproeve-web-api "landrup-dans-web-api"), vi anbefaler at du sætter det op, inden du fortsætter.

- Klon projektet lokalt vha. `git clone https://github.com/rts-cmk-wu07svendeprove-benamager.git`
- Tilføj **.env** fil ved projektroden.
- Tilføj VITE_API_URL=http://localhost:4000 i **.env** filen
- Installer afhængigheder vha `npm install` eller `yarn install`
- Vi er nu klar `npm run dev` eller `yarn dev` og åben linket fra konsollen.

## Valgfrie opgave
C - Cookies, jeg har valgt denne, da den var rimelig ligetil at implementere i min useLogin hook. Forklaring på den er nedenunder :)

## Design ændringer
Jeg har valgt at tilføje en log in / log ud element til navigations baren, da dette gør det hele lidt nemmere for brugeren.

## Kode eksempler

#### useLogin, custom hook
```javascript
import { useContext, useState } from "react";
import { TokenContext } from "../contexts/TokenContext";
import useCookie from "react-use-cookie";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function useLogin() {
  const { token, setToken } = useContext(TokenContext)
  const [, setTokenDataCookie] = useCookie("tokenData", undefined)

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleLogin(loginObject) {
    setLoading(true)

    try {
      const response = await axios.post(`${API_URL}/auth/token`, loginObject);

      // If user clicked "remember me", save to cookie
      if (loginObject.rememberMe) {
        // Beregn tidsforskellen (i millisekunder) mellem tokenets udløbstid og nuværende tid
        const milliseconds = response.data.validUntil - Date.now()
        // Konverter tidsforskellen til dage
        const validFor = milliseconds / (1000 * 60 * 60 * 24)

        setTokenDataCookie(JSON.stringify(response.data), {
          days: validFor,
          SameSite: "Strict"
        })
      }

      setToken(response.data)

    } catch (error) {

      // Fejl i brugernavn eller adgangskode
      if (error.response) {
        setError("Ugyldig brugernavn eller adgangskode.")
        return
      }

      // Alle andre fejl
      setError("Intern serverfejl")

    } finally {
      setLoading(false)
    }
  }

  return { handleLogin, error, loading }
}
```

###### Forklaring
Dette er en React Custom Hook, der implementerer login funktionalitet for at opnå code splitting og bedre vedligeholdelse.

Hook'et eksporterer en funktion (handleLogin) til at håndtere login samt error og loading states.

Når handleLogin kaldes, sættes loading-state til true. Inde i en try-catch blok, foretages en POST-anmodning til APIet, hvor loginObject sendes med. Hvis brugeren har valgt "husk mig", gemmes et cookie med response-objektet fra APIet. Ellers gemmes objektet kun i context.

I catch-blokken håndteres fejl. Under debugging af API'et blev det fundet, at den eneste fejlrespons er error.response, som opstår ved forkert brugernavn eller adgangskode. Alle andre fejl betragtes som interne serverfejl. Fejl opdateres i error-state.

I finally-blokken sættes loading-state til false.

### Activity, komponent
```javascript
import { useNavigate } from "react-router-dom";
import ShimmerLoading from "./ShimmerLoading";

export default function Activity({ activityData, type }) {
  const navigate = useNavigate()

  // navigate to details page and pass data along, this skips one fetch request
  function handlePress() {
    navigate(`/activity-details/${activityData.id}`, {
      state: { activityData }
    });
  }

  return (
    <>
      {type === "loading" ?
        <ShimmerLoading className="rounded-[39px_39px_0_39px] overflow-hidden w-full h-[350px] opacity-50" /> :
        <article onClick={handlePress} className="grid rounded-[39px_39px_0_39px] overflow-hidden w-full cursor-pointer h-[350px]">
          <img src={activityData.asset.url} alt="" className="grid-area-1 shadow-lg object-cover h-full w-full" />
          <div className="grid-area-1 self-end bg-secondary bg-opacity-80 py-4 pl-7 text-base">
            <h2>{activityData.name}</h2>
            <span>{activityData.minAge}-{activityData.maxAge} år</span>
          </div>
        </article>
      }
    </>
  );
}
```

## Tech-stack
#### Bygningsværktøj | Build Tool
Jeg har valgt VITE fremfor Create React App af flere grunde. Ikke kun at skaberne af CRA selv anbefaler det, har jeg en lille liste med hvorfor.
- Hurtigere udviklingsoplevelse: Vite giver hurtigere starttid og opdateringer under udvikling sammenlignet med CRA.
- Optimeret bygning: Vite producerer mere effektive og mindre bundter med Rollup, hvilket kan forbedre applikationens ydeevne.
- Letvægts og modulær: Vite er designet til at være letvægts og modulær, hvilket giver en renere og mere overskuelig opsætning sammenlignet med CRA.

#### React
- React er et populært JavaScript-bibliotek til opbygning af brugergrænseflader, og react-dom er dens DOM-bindingsbibliotek.
- Begrundelse for valg: React er et letvægts, fleksibelt og modulært bibliotek med stor community-støtte og et stort økosystem af tredjepartspakker. Det er valgt fremfor alternativer som Vue og Angular, da det er mere populært og har en større efterspørgsel på arbejdsmarked.

#### react-use-cookie
- React-use-cookie er et lille bibliotek, der tilbyder en simpel hook-baseret løsning til at læse, opdatere og slette cookies i React-applikationer.
- Begrundelse for valg: Det er valgt for sin hooks-baserede API, der er mere naturlig og integreret med React. JS-Cookie er et godt alternativ, men det er ikke designet specifikt til React og kræver lidt mere opsætning for at integrere det med React-komponenter.

#### Axios
- Axios er en populær og letvægts HTTP klient baseret på Promises, som bruges til at foretage API-kald i applikationen.
- Begrundelse for valg: Axios tilbyder en mere bekvem API og håndtering af fejl end fetch. Desuden understøtter Axios automatisk JSON-data og har bredere browserkompatibilitet.

#### formik
- Formik er et populært React-bibliotek til håndtering af formularer, som hjælper med at styre formularstatus, validering og indsendelse.
- Begrundelse for valg: Formik er mere begyndervenligt og har en nemmere opsætning sammenlignet med react-hook-form. Selvom react-hook-form kan være hurtigere på grund af sin brug af hooks, er Formik stadig et solidt valg for mange applikationer.

#### yup
- Yup er et letvægts JavaScript-valideringsbibliotek, der gør det nemt at oprette komplekse valideringsregler og integrere dem med Formik.
- Begrundelse for valg: Yup er valgt for sin integration med Formik og enkelthed. Joi er et mere omfattende valideringsbibliotek, men det er mere komplekst og kan være overkill for de fleste applikationer.

#### framer-motion
- Framer Motion er et animationsbibliotek til React, der tilbyder en enkel og effektiv måde at lave animationer og gestusstyret interaktion.
- Begrundelse for valg: Framer Motion har en mere intuitiv API og er nemmere at tage i brug sammenlignet med react-spring. Selvom react-spring er en kraftfuld løsning, er Framer Motion et godt valg for hurtigere udvikling og enklere animationer.

#### react-icons
- React Icons er en samling af populære ikonbiblioteker, der er optimeret til brug i React-applikationer.
- Begrundelse for valg: React Icons er valgt for sin store samling af ikoner fra forskellige biblioteker, hvilket giver større fleksibilitet og designmuligheder. Alternativer som FortAwesome og Material Icons er også gode valg, men React Icons tilbyder en bredere vifte af muligheder.

## Skalering
Landrup dans frontend er allerede godt skalerbar takket være følgende:

- Modulær kodebase: Koden er struktureret og overskuelig med code splitting, hvilket fremmer genbrug og vedligeholdelse.
- API-orienteret design: Frontend og backend er adskilt, hvilket tillader uafhængig skalering og letter integrationen med andre systemer.
- Lazy loading for først at indlæse komponenter og ressourcer når de faktisk er nødvendige, hvilket reducere indlæsningstid og forbedre ydeevne.

For yderligere skalering kan backenden forbedres ved at:

- Implementere serverless funktioner, som automatisk skalerer med belastningen og reducerer omkostningerne ved ressourceforbrug.
- Optimering af databasen, fx ved at vælge en skalerbar databaseløsning og bruge teknikker som replikering og caching for at forbedre ydeevnen.
- Komprimerer og optimer billeder, videoer og andre mediefiler for at reducere filstørrelse og indlæsningstiden.

Endelig skal frontend og backend hostes hos en udbyder, der kan håndtere høj trafik og sikre optimal ydeevne for brugerne.