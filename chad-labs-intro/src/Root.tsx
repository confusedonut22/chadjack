import "./index.css";
import { Composition } from "remotion";
import { ChadLabsIntro } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ChadLabsIntro"
        component={ChadLabsIntro}
        durationInFrames={150}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="ChadLabsIntroMobile"
        component={ChadLabsIntro}
        componentProps={{ variant: "portrait" }}
        durationInFrames={150}
        fps={30}
        width={720}
        height={1280}
      />
    </>
  );
};
