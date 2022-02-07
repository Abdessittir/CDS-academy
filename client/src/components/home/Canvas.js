import { Suspense } from "react";
import AnimationCanvas from "./AnimationCanvas";
import "../../styles/home/Canvas.css"


function Canvas(){
    return (
        <div
          style={{width:"100vw",height:"100vh"}}
          className="canvas"
        >
           <Suspense loading={<h1>Loading</h1>}>
            <AnimationCanvas />
          </Suspense>
        </div>
    );
}

export default Canvas;