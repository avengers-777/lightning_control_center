import { Progress } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";

export function ProgressStatus({expiration,duration}:{expiration:number,duration:number}){
    function getPercent(){
        const timeLeft = expiration - new Date().getTime();
        return  (timeLeft / duration) * 100;
    }
    
    const [percent,setPercent] = useState(getPercent())
    useEffect(() => {

        
        const interval = setInterval(() => {
            setPercent(getPercent())
        }, 3000); 
    
    
        return () => clearInterval(interval);
      }, []);
    return (
        <Progress
          percent={percent}
          stroke={percent < 25 ? "var(--semi-color-warning)" : undefined}
          size="small"
          style={{ margin: 5 }}
          aria-label="time left"
        />
      );
}