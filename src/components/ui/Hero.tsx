//@ts-nocheck
import { useEffect, useState } from "react";
import { GitHubStats, LeetCodeStats } from "./ProfileCard";
import githubData from "../../../public/backup.github.json";
import leetCodeData from "../../../public/backup.leetcode.json";
import axios from "axios";
const typingSpeed = 120;
const pauseBetweenPhrases = 1600;



const phrases = [
  { verb: "Design", phrase: "Sleek Interfaces" },
  { verb: "Deliver", phrase: "Intuitive Experiences" },
  { verb: "Develop", phrase: "Scalable Solutions" },
];

const floatFast = {
  animation: "floatFast 4s ease-in-out infinite",
};




export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showFadeUp, setShowFadeUp] = useState(false);
  const [resetCycle, setResetCycle] = useState(false);



const GITHUB_API = "https://codeonbackend-txs4.onrender.com/github/gautamabhish";
const LEETCODE_API = "https://codeonbackend-txs4.onrender.com/leetcode/uUTmPQg4t3";


const [githubData, setGithubData] = useState({
  "player": {
    "_id": "67e834073d7f7dff59bb6d42",
    "platform": "GitHub",
    "playerId": "gautamabhish",
    "__v": 0,
    "name": "gautamabhish",
    "score": 168
  },
  "problemSolvingScore": 0,
  "overallScore": 168,
  "ranking": {
    "rank": 18,
    "totalPlayers": 54
  },
  "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAAV6SURBVO3BUYoESQ4FwaegD+ZH95tpfwULCUlF9UwPMstaa6211lprrbXWWmuttdZaa6211lpr/UdUPqR2fhFQGdTOAFS+SO08ACoP1M4DoDKonV8EVD5wstZFJ2tddLLWRT+5DKhcpHY+oHZeACqD2nkAVAa18wCofACoXKR2LjpZ66KTtS46Weuin3yZ2nkBqLwAVF4AKoPaGdTOB4DKA7XzAKi8oHZeACpfdLLWRSdrXXSy1kU/+ePUzgOgMqidAah8QO08ACoDUBnUzn/IyVoXnax10claF/3kjwMqg9oZ1M4LamcAKg+AyqB2HqidAaj8h5ysddHJWhedrHXRT74MqPwhQGVQOwNQeQBUXlA7A1B5Aaj8i5ysddHJWhedrHXRTy5TO79I7QxAZVA7A1AZ1M4AVF5QOwNQGdTOAFQGtfOC2vkXO1nropO1LjpZ66LKH6d2fhFQeaB2HgCVQe0MQOUPO1nropO1LjpZ66LKh9TOAFQGtfMAqAxq5wWgMqidAag8UDsvAJVB7XwAqDxQOwNQeaB2BqAyqJ0HQOUDJ2tddLLWRSdrXVT5kNp5AFQeqJ0HQGVQOwNQGdTOA6DyAbXzRUBlUDsvAJUX1M4AVD5wstZFJ2tddLLWRT+5DKg8UDsPgMqgdi5SOw+AyqB2HgCVQe08ACoP1M4AVAa1MwCVB2rnAVC56GSti07WuuhkrYsqX6Z2BqDyQO0MQOWB2nkAVAa1cxFQeaB2BqAyqJ0XgMqgdgag8oLaGYDKB07WuuhkrYtO1rqo8iG18wGg8kDtDEBlUDsPgMoXqZ0HQOUXqZ0HQOWLTta66GSti07WuqjyZWrnAVB5Qe28AFReUDsDUHlB7QxAZVA7A1B5oHYGoPKC2nkBqHzgZK2LTta66GSti35ymdp5Qe28AFReUDsPgMoAVAa1MwCVB0DlBbUzAJU/7GSti07WuuhkrYsqH1I7D4DKC2pnACqD2hmAyqB2BqDygtoZgMqgdgag8oLa+SKg8kDtDEDlopO1LjpZ66KTtS6qfEjtDEBlUDsDUHlB7QxAZVA7FwGVi9TOC0DlBbXzAKgMamcAKhedrHXRyVoXnax1UeUytTMAlUHtDEBlUDsDUHmgdgag8gG1MwCVfxG1MwCVQe28AFQuOlnropO1LjpZ66LKh9TOAFQGtTMAlUHtDEBlUDsDUHmgdl4AKhepnQdAZVA7A1AZ1M4LQGVQOwNQ+aKTtS46Weuik7UuqnyZ2vkAUHmgdh4AlUHtPAAqD9TOC0DlA2rnBaAyqJ0BqHzRyVoXnax10claF1UuUzsPgMqgdgagMqidF4DKC2rnAVAZ1M4HgMqgdn4RUPmik7UuOlnropO1Lqr8cWrnHwRUBrXzAKgMamcAKi+onYuAygdO1rroZK2LTta66CcfUju/CKh8AKg8UDsDUPkAUBnUzgtqZwAqLwCVQe0MQOWik7UuOlnropO1LvrJZUDlIrXzAlB5oHYGoDIAlRfUzgBUHgCVQe08ACp/yMlaF52sddHJWhf95MvUzgtA5QWgMqidi9TOAFQGoDKonQGovKB2PgBUBrUzAJVB7QxA5QMna110stZFJ2td9JM/Tu08ACovqJ0HaucBUHmgdgagMqidAagMaueB2hmAyqB2BqBy0claF52sddHJWhf95D8GqLygdgag8kVAZVA7A1B5Aag8UDsDUBnUzgBUPnCy1kUna110stZFP/kyoPJFQOUitfMAqHyR2hmAygtqZwAqg9oZgMpFJ2tddLLWRSdrXfSTy9TOL1I7HwAqg9oZgMoDtTMAlUHtfEDtDEDlAVD5B52sddHJWhedrLXWWmuttdZaa6211lprrbXWWmuttdZa6//8D2M7tKFbPH8HAAAAAElFTkSuQmCC",
  "color": "linear-gradient(65deg,rgba(192, 192, 192, 0.8), #A8A8A8, #E0E0E0,#b0b0b0)"
});
const [leetcodeData, setLeetcodeData] = useState({
  "player": {
    "_id": "67ea86773d7f7dff59bbbd63",
    "playerId": "uUTmPQg4t3",
    "platform": "LeetCode",
    "__v": 0,
    "name": "uUTmPQg4t3",
    "score": 58
  },
  "ranking": {
    "rank": 18,
    "totalPlayers": 40
  },
  "problemSolvingScore": 82,
  "overallScore": 58,
  "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAAVRSURBVO3BUQokyREFwRdJH9CP6jcM/QYIChWdPasdwixrrbXWWmuttdZaa6211lprrbXWWmut9ZeofEnt/EFA5QW18wCovKB2HgCVF9TOAFQGtfMHAZUvnKx10claF52sddEnlwGVi9TOF4DKoHYGtTMAlQdA5R8EVC5SOxedrHXRyVoXnax10Sc/pnZeACovqJ0XgMqgdh6onQGoDGpnACp/kNp5Aaj80MlaF52sddHJWhd98pcBKg/UzgBUHgCV9T87Weuik7UuOlnrok/+MmrnAVAZ1M4XgMoLaucvdrLWRSdrXXSy1kWf/BhQ+YOAyqB2fkjtDEDlAVAZ1M4XgMr/kZO1LjpZ66KTtS765DK18y8GVAa1MwCVQe08UDsDUPmC2vk/drLWRSdrXXSy1kWffAmo/EXUzgBUBrUzAJUX1M4LQOVf5GSti07WuuhkrYs++ZLaGYDKoHYuAioDULkIqAxq5wW1MwCVQe0MQOWB2rkIqPzQyVoXnax10claF31ymdp5AagMamcAKoPaGYDKDwGVQe0MaueB2nlB7XwBqLygdgag8oWTtS46Weuik7Uu+uQyoDKonS+onQdqZwAqPwRULlI7D4DKA7XzBaBy0claF52sddHJWhd98iWg8kNAZVA7LwCVB0DlgdoZgMqgdgag8gWgMqidF9TOAFQGtTMAlYtO1rroZK2LTta6qPKHqZ0BqDxQOwNQGdTOAFQGtfMCUHlB7QxA5YHaGYDKC2pnACqD2nkAVH7oZK2LTta66GStiyqXqZ0HQOUitfMAqDxQO18AKi+onR8CKi+onQGofOFkrYtO1rroZK2LKv8wtTMAlUHtDEDlgdp5AFQeqJ0vAJVB7QxAZVA7A1AZ1M5FQOWHTta66GSti07WuuiTL6mdB0BlUDsP1M4AVAa1MwCVHwIqg9oZgMoLaueHgMoDtTMAlYtO1rroZK2LTta6qPIltfMCUHmgdl4AKg/UzgBUBrUzAJVB7TwAKi+onQGoXKR2HgCVHzpZ66KTtS46WeuiT34MqAxqZwAqD4DKA7UzAJUBqHwBqAxqZ1A7A1B5Qe1cBFQGtfNA7QxA5Qsna110stZFJ2tdVPmS2hmAyqB2LgIqD9TOC0Dlh9TOAFQGtTMAlQdq5wFQGdTOAFR+6GSti07WuuhkrYs++TGg8oLaGYDKA7XzAlAZ1M4AVAa1MwCVQe0MQGUAKoPaGYDKoHYGoPIFoDKonQGoXHSy1kUna110stZFlS+pnQGoDGrnDwIqD9TOAFQuUjsDUHmgdi4CKoPaeQGofOFkrYtO1rroZK2LKv9yaucBUBnUzgBUBrXzAlB5oHYGoDKonQGovKB2LgIqXzhZ66KTtS46WeuiypfUzh8EVB6onQGoPFA7PwRUBrXzAKgMamcAKoPaeQGo/NDJWhedrHXRyVoXfXIZULlI7TxQOwNQeQGoDGpnACr/IKDyAlB5Qe0MQOULJ2tddLLWRSdrXfTJj6mdF4DKF9TOAFQGtTMAlQGoDGrnIqAyqJ1B7Vykdgag8kMna110stZFJ2td9MlfBqgMaueB2hmAygBU/iCg8gW18wJQuehkrYtO1rroZK2LPvnLAZVB7TxQOy8AlRfUzgO180NqZwAqF52sddHJWhedrHXRJz8GVH4IqAxq5wFQeaB2XlA7A1AZ1M4AVAa1MwCVF9TOA6AyqJ0fOlnropO1LjpZ66LKl9TOHwRUBrUzAJVB7TwAKoPaGYDKoHZeACoXqZ0BqDxQOwNQ+aGTtS46Weuik7XWWmuttdZaa6211lprrbXWWmuttdZaa/2X/wDqiZN+Nb3xcQAAAABJRU5ErkJggg==",
  "color": "linear-gradient(65deg,#3282cd,rgba(139, 89, 43, 0.77),#999c9c,#304b61)"
});

const fetchWithFallback = async (url: string, fallbackPath: string) => {
  try {
    const res = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 5000, // 5 seconds timeout
    });
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (err) {
    console.warn(`⚠️ Fetch failed: ${url}. Falling back to ${fallbackPath}`);
    const fallbackRes = await fetch(fallbackPath);
    return await fallbackRes.json();
  }
};

useEffect(() => {
  const loadData = async () => {
    const github = await fetchWithFallback(GITHUB_API, "/backup.github.json");
    const leetcode = await fetchWithFallback(LEETCODE_API, "/backup.leetcode.json");
    setGithubData(github);
    setLeetcodeData(leetcode);
  };

  loadData();
}, []);
  useEffect(() => {
    if (resetCycle) {
      setTypedText("");
      setCharIndex(0);
      setPhraseIndex(0);
      setShowFadeUp(false);
      setResetCycle(false);
      return;
    }
    if (phraseIndex >= phrases.length) {
      setResetCycle(true);
      return;
    }

    const currentVerb = phrases[phraseIndex].verb;
    if (charIndex <= currentVerb.length) {
      const t = setTimeout(() => {
        setTypedText(currentVerb.slice(0, charIndex));
        setCharIndex((c) => c + 1);
      }, typingSpeed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setShowFadeUp(true), pauseBetweenPhrases);
      return () => clearTimeout(t);
    }
  }, [charIndex, phraseIndex, resetCycle]);

  useEffect(() => {
    if (!showFadeUp) return;
    const t = setTimeout(() => {
      setShowFadeUp(false);
      setCharIndex(0);
      setPhraseIndex((i) => i + 1);
    }, 2200);
    return () => clearTimeout(t);
  }, [showFadeUp]);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 md:px-12 overflow-visible text-white relative">
      <div className="flex items-center space-x-4 mb-4">
        <h1
          className="text-center text-transparent font-bold leading-tight bg-clip-text bg-[url(/Paper.jpg)] hero-outline"
          style={{
            fontFamily: "Bebas Neue, serif",
            fontSize: "clamp(4rem, 20vw, 8rem)",
            WebkitTextStroke: "2px rgba(255, 255, 255, 0.6)",
          }}
        >
          {typedText}
        </h1>
        <span className="blinking-cursor text-5xl md:text-6xl">|</span>
      </div>
      <div
          className="absolute rounded-full blur-lg opacity-70 bg-rose-400"
          style={{ ...floatFast, bottom: "50px", right: "25%", width: "72px", height: "72px", zIndex: 2 }}
        />


      {/* Fade-up phrase */}
      {/* {showFadeUp && (
        <p
          key={phrases[phraseIndex].phrase}
          className="text-2xl md:text-4xl font-semibold fade-up text-center bg-[rgba(248,255,188,0.96)] bg-clip-text text-transparent"
          style={{ fontFamily: "Roboto, Inter" }}
        >
          {phrases[phraseIndex].phrase}
        </p>
      )} */}

<div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-16 ">
{githubData && <GitHubStats data={githubData} />}
{leetcodeData && <LeetCodeStats data={leetcodeData} />}
</div>

      {/* Stats Badges */}
 
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.8s ease-out; }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .blinking-cursor {
          animation: blink 1s step-end infinite;
          font-weight: 900;
          color: #5bece5;
        }

        .hero-outline {
          background-size: 600% 600%;
          animation: outlineGradientMove 7s ease-in-out infinite;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        @keyframes outlineGradientMove {
          0% { background-position: 0% 50%; }
          90% { background-position: 90% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
}
