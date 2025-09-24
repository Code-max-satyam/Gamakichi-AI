import { createContext, useState } from "react";
import runChat from "../Config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input,setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [prevPrompts,setPrevPrompts] = useState([]);
    const [showResult,setShowResult] = useState(false);
    const [loading,setLoading] = useState(false);
    const [resultData,setResultData] = useState("");

    const delayPara = (index,nextWord) => {
        setTimeout(function () {
            setResultData(prev=>prev+nextWord);
        },75*index);
    }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {

        // Store the prompt to be used, whether it's from a card click or the input field
        const currentPrompt = prompt !== undefined ? prompt : input;

        setResultData("")
        setLoading(true)
        setShowResult(true)
        
        // Add the current prompt to the list of previous prompts
        // This will now work for both card clicks and input submissions
        if (currentPrompt) {
            setPrevPrompts(prev => [...prev, currentPrompt]);
        }

        setRecentPrompt(currentPrompt);

        const response = await runChat(currentPrompt);

        // Fixed: Initializing newResponse to an empty string to avoid "undefined"
        let newResponse = ""; 
        let responseArray = response.split("**");
        
        for(let i =0; i < responseArray.length; i++)
        {
           if (i === 0 || i % 2 !== 1) {
             newResponse += responseArray[i];
           }
           else{
             newResponse += "<b>"+responseArray[i]+"</b>";
           }
        }
        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");
        for (let i=0; i<newResponseArray.length; i++)
        {
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+ " ")
        }

        setLoading(false)
        setInput("")
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider