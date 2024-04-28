import { AiOutlineClose } from "react-icons/ai";
import {createPortal} from "react-dom"

const Modal = ({ isOpen, onClose, children }) => {
  return createPortal (
    <>
      {isOpen && (
        <div 
        //onClick={onClose} 
        className=" grid place-items-center  absolute top-0 z-40 h-screen w-screen backdrop-blur">
          <div className="relative z-50 m-auto min-h-[200px] min-w-[80%] bg-white">
            <div className="flex justify-end">
              <AiOutlineClose onClick={onClose} className="self-end text-2xl " />
            </div>
            {children}
          </div>

        </div>
      )}
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
