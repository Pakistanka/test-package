const ButtonTransparent = (props: any) => {
    return (
        <button onClick={props.onClick} className="btn btn-primary btn-outline font-bold capitalize px-7 flex items-center gap-4">
            {props.children}
            {props.icon ? <props.icon className="text-xl" /> : null}
        </button>
    )
}

export default ButtonTransparent;
