import html2canvas from "html2canvas";
import { backgroundPosition } from "html2canvas/dist/types/css/property-descriptors/background-position";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loadign } from "./Loading";


interface ScreenshotButtonProps {
    screenshot: string | null
    onScreenshotTook: (screenshot: string | null) => void;
}


export function ScreenshotButton({ screenshot,onScreenshotTook}: ScreenshotButtonProps){
    const [isTakeimgScreenshot, setIsTakeimgScreenshot] = useState(false)

    async function handleTakeScreenshot(){
        setIsTakeimgScreenshot(true)

        const cavnas = await html2canvas(document.querySelector('html')!);
        const base64image = cavnas.toDataURL('image/png')

        onScreenshotTook(base64image);
        setIsTakeimgScreenshot(false);
    }

        if(screenshot){
            return(
                <button
                    type="button"
                    className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 text transition-color"
                    
                    onClick={() => onScreenshotTook(null)}
                    style={{
                        backgroundImage: `url(${screenshot})`,
                        backgroundPosition: 'rigth botton',
                        backgroundSize: 180


                    }}
                    
                >
                
                <Trash weight="fill" />
                
                </button>
            )
        }
            
        
       return (
        <button
        type="button"
        onClick={handleTakeScreenshot}
        className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 ">
       { isTakeimgScreenshot ? <Loadign /> :  <Camera className="w-6 h-6" />}
    </button>
    
    )
}