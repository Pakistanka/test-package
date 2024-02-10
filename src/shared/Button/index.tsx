const Button = (props: any) => {
    return (
        <button onClick={props.onClick} className="btn btn-primary dark:text-white font-bold capitalize px-4 md:px-7 flex items-center gap-4 disabled:bg-lighter-gray dark:disabled:bg-gray-700 disabled:text-light-gray disabled:cursor-not-allowed" disabled={props.disabled}>
            {props.children}
            {props.icon ? <props.icon className="text-xl" /> : null}
        </button>
    )
}

export default Button;
