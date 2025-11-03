import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const context = createContext();

const ContextProvider = (props) =>{
    
    const [input,setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [prevPrompts,setPrevPrompts] = useState([]);
    const [showResult , setShowResult] = useState(false);
    const [loading , setLoading] = useState(false);
    const [resultData , setResultData] = useState("");

    const delayPara = (index , nextWord) =>{
        setTimeout(() => {
            setResultData(prev=>prev+nextWord);
        }, 75*index);
    }

    const newChat = () =>{
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async (prompt) =>{
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let res = "";
        if(prompt!==undefined){
            res = await runChat(prompt);
            setRecentPrompt(prompt);
        }
        else{
            setPrevPrompts(prev=>[...prev,input])
            setRecentPrompt(input);
            res = await runChat(input);
        }
        let responseArray = res.split('**');
        let newArray="";
        for(let i = 0 ; i < responseArray.length ;i++){
            if(i===0 || i%2!==1){
                newArray += responseArray[i];
            }
            else{
                newArray+="<strong>"+responseArray[i]+"</strong>"
            }
        }
        let newResponse = newArray.split("*").join("</br>");

        let newResponseArray = newResponse.split(" ");
        for(let i = 0 ;i <newResponseArray.length;i++){
            const newWord = newResponseArray[i];
            delayPara(i,newWord+" ");
        }
        setLoading(false);
        setInput("");
    }
    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        recentPrompt,
        setRecentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <context.Provider value={contextValue}>
            {props.children}
        </context.Provider>
    )
}

export default ContextProvider