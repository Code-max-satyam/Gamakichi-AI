import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context';

const Main = () => {

    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context);

    // New function to handle card clicks
    const onCardClick = async (prompt) => {
        await onSent(prompt);
    }

    // New function to handle the Enter key press
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && input.trim() !== '') {
            onSent();
        }
    };

    return (
        <div className='main'>
            <div className="nav">
                <p>Gamakichi AI</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">

               {!showResult
                ?<>
                    <div className="greet">
                     <p><span>Hello, Hashira Corps </span></p>
                     <p> How can I help you today?</p>
                </div>
                <div className="cards">
                    {/* Add onClick handler to each card */}
                    <div onClick={() => onCardClick("What are some amazing facts about space?")} className="card">
                        <p>What are some amazing facts about space?</p>
                        <img src={assets.message_icon} alt="" />
                    </div>
                    <div onClick={() => onCardClick("Suggest 5 budget-friendly travel destinations")} className="card">
                        <p>Suggest 5 budget-friendly travel destinations</p>
                        <img src={assets.compass_icon} alt="" />
                    </div>
                    <div onClick={() => onCardClick("What is artificial intelligence and how does it work?")} className="card">
                        <p>What is artificial intelligence and how does it work?</p>
                        <img src={assets.bulb_icon} alt="" />
                    </div>
                    <div onClick={() => onCardClick("What are the top in-demand skills in 2025?")} className="card">
                        <p>What are the top in-demand skills in 2025?</p>
                        <img src={assets.code_icon} alt="" />
                    </div>
                </div>
                </>
                :<div className='result'>
                     <div className="result-title">
                        <img src={assets.user_icon} alt="" />
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="result-data">
                        <img src={assets.gama_icon} alt="" />
                        {loading
                        ?<div className='loader'>
                            <hr />
                            <hr />
                            <hr />
                        </div>
                        :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                        }
                    </div>
               </div>
                }

                <div className="main-bottom">
                    <div className="search-box">
                       <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' onKeyDown={handleKeyDown} /> 
                       <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input?<img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null}
                       </div>
                    </div>
                    <p className="bottom-info">
                        Gamakichi may display inaccurate info, including about people, so double-check its responses. Your privacy and Gamakichi Apps
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main