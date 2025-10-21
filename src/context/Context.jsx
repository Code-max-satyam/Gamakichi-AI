import { createContext, useState } from "react";
import runChat from "../Config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    // Typewriter effect for AI response
    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 40 * index); // Adjust speed here
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
        setResultData("");
        setInput("");
    }

    const onSent = async (prompt) => {
        const currentPrompt = prompt !== undefined ? prompt : input;
        if (!currentPrompt.trim()) return;

        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(currentPrompt);

        setPrevPrompts(prev => [...prev, currentPrompt]);

        try {
            const response = await runChat(currentPrompt);

            // Process bold and line breaks
            let formatted = "";
            let responseArray = response.split("**");
            for (let i = 0; i < responseArray.length; i++) {
                if (i % 2 === 1) formatted += `<b>${responseArray[i]}</b>`;
                else formatted += responseArray[i];
            }
            formatted = formatted.split("*").join("<br>");
            const words = formatted.split(" ");

            words.forEach((word, index) => delayPara(index, word + " "));

        } catch (err) {
            setResultData("Error: Could not get response.");
            console.error(err);
        } finally {
            setLoading(false);
            setInput("");
        }
    }

    return (
        <Context.Provider value={{
            prevPrompts,
            onSent,
            recentPrompt,
            showResult,
            loading,
            resultData,
            input,
            setInput,
            newChat
        }}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;
