import "../../styles/home/Humberger.css";

function Humberger({callback, open}){

    return (
        <div className="humberger" onClick={callback}>
            <div className={`bar ${open?"active":""}`}></div>
        </div>
    );
}

export default  Humberger;
