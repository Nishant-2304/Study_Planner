import "./Home.css"
import "../index.css"

export default function Home(){
    return(
        <div className="home_container">
            <div className="home_left_container">
                <h1>Hey Nishant,</h1>
                <p>You have 5 tasks left</p>
                <div className="btn_container">
                    <a class="home_btns">See Tasks</a>
                    <a class="home_btns">See Scheduel</a>
                </div>
            </div>
            <div className="home_right_container">
                <img src="/img/calendar.png" alt="hi" className="home_img" />
            </div>
        </div>
    )
}