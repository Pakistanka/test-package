//@ts-nocheck
import { FC, ReactNode } from "react";
import Backdrop from "../Backdrop";
import { IoClose } from 'react-icons/io5';

interface ModalProps {
    show?: boolean;
    sm?: boolean;
    close: () => void;
    children?: ReactNode;
  }

const Modal: FC<ModalProps> = (props: any) => {
    return (
        <div className={`w-screen h-screen fixed flex items-center justify-center left-0 z-[501] -top-100 ${props.show ? 'top-0' : ''}`}>
            {props.show ? <Backdrop show={props?.show} /> : null}
            <div className={`w-[95%] md:w-[750px] ${props.sm ? 'md:w-[550px]' : ''} relative rounded-xl h-[625px] bg-white dark:bg-dark-gray z-[100001] transition-all delay-75 ${props.show ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute top-6 right-10 cursor-pointer z-50">
                    <IoClose onClick={props.close} className="text-xl text-black dark:text-white" />
                </div>
                {props.children}
            </div>
        </div>
    )
}

export default Modal;
