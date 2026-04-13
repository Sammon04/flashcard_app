

function Button({ className, onClick, text }) {
    return (
        <button className= {`button btn-${className}`} onClick={onClick}>
            {text}
        </button>
    )
}

export default Button