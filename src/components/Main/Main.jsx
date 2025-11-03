import React, { useContext } from 'react'
import './main.css'
import { assets } from '../../assets/assets'
import { context } from '../../context/Context'
const Main = () => {
  const {onSent , recentPrompt , showResult , loading , resultData , setInput , input} = useContext(context);
  return (
    <div className='main'>
        <div className="nav">
            <p>WingMan</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">
            {
                !showResult ?
                <>
                   <div className="greet">
                        <p><span>Hello , Anmol.</span></p>
                        <p>How can I help you buddy ?</p>
                    </div>
                    <div className='cards'>
                        <div className="card">
                            <p>Suggest beautiful places to see on an upcoming road trip</p>
                            <img src={assets.compass_icon} alt="" />
                        </div>
                        <div className="card">
                            <p>Briefly summerize this concept : urban planning
                            </p>
                            <img src={assets.bulb_icon} alt="" />
                        </div>
                        <div className="card">
                            <p>Brainstorm team bonding activities for our work retreat</p>
                            <img src={assets.message_icon} alt="" />
                        </div>
                        <div className="card">
                            <p>Improve the readability of the following code</p>
                            <img src={assets.code_icon} alt="" />
                        </div>
                    </div>
                </>
                 :
                <div className='result'>
                    <div className="result-title">
                        <img src={assets.user_icon} alt="" />
                        <p>
                            {recentPrompt}
                        </p>
                    </div>
                    <div className="result-data">
                        <img src={assets.gemini_icon} alt="" />
                        {
                            loading ?
                            <div className='loader'>
                                <hr />
                                <hr />
                                <hr />
                            </div>
                            :
                            <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                        }
                    </div>
                </div>
            }
            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter your prompt here' />
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        {input && <img onClick={()=>onSent()} src={assets.send_icon} alt="" />}
                    </div>
                </div>
                <p className='bottom-info'>
                    WingMan may display inaccurate info, so double-check its responses.
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main