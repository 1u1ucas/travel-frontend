type ButtonProps = {
    type?: 'button' | 'submit' | 'reset';
    text: string;
    variant?: 'primary' | 'secondary'| 'danger';
    className?: string;
    onClick?: () => void;
}

const buttonStyle = {
    default: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10',  
    primary: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10',
    secondary: 'bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded h-10',
    danger: 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded h-10',
}

const Button = ({ type, text, variant = 'primary', className, onClick }: ButtonProps) => {

    return (
        <button
        type={type}
        className={`${buttonStyle[variant]}
        ${className}`}
        onClick={onClick}>
            {text}
            </button>
    );
}

export default Button;