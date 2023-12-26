import React from "react";
import { useLangContext } from "../../context/LangContext";

const Game = () => {
  const { lang } = useLangContext();

  const turkishImages = (
    <>
      <img src={"assets/img/game2.png"} alt="Game" className="h-72" />
      <img src={"assets/img/game1.png"} alt="Game" className="h-72" />
      <img src={"assets/img/game3.png"} alt="Game" className="h-72" />
    </>
  );

  const englishImages = (
    <>
      <img src={"assets/img/game4.png"} alt="Game" className="h-72" />
      <img src={"assets/img/game5.png"} alt="Game" className="h-72" />
      <img src={"assets/img/game6.png"} alt="Game" className="h-72" />
    </>
  );

  const turkishMessage = (
    <p className="ml-12 pb-10">
      Oyunu oynamak için bilgisayarınızdan{" "}
      <a href="https://www.arenilac.com">www.arenilac.com</a> adresinden
      girebilirsiniz.
    </p>
  );

  const englishMessage = (
    <p className="ml-12 pb-10">
      To play the game, you can access it from your computer at{" "}
      <a href="https://www.arenilac.com">www.arenilac.com</a>.
    </p>
  );

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex lg:flex-row flex-col justify-center items-center lg:space-x-20 md:space-y-0 space-y-6 mt-28">
        {lang === "tr" ? turkishImages : englishImages}
        <div className="lg:hidden">
          {lang === "tr" ? turkishMessage : englishMessage}
        </div>
      </div>
      <div className="flex justify-center items-center hidden lg:block">
        <iframe
          title="Unity Game"
          src="/UnityGame/index.html"
          width="1000"
          height="1000"
        ></iframe>
      </div>
    </div>
  );
};

export default Game;
