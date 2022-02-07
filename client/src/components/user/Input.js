import "../../styles/user/Input.css";

function Input({icon, onChange, onInvalid, options}){

    return (
        <div className='input_container'>
            <p>{icon}</p>
            <input dir="auto" onChange={onChange} onInvalid={onInvalid} {...options} />
            {options.type === 'file' && (
                <p className="choose_file">Choisir un fichier</p>
            )}
        </div>
    );
}

export default Input;