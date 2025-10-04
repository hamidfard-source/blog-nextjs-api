// components/Modal.js
import {useEffect, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}


export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const [isAnimate, setIsAnimate] = useState(false)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const modalContent = document.querySelector('.modal-content');
      if (isOpen && modalContent && !modalContent.contains(event.target as Node)) {
        setIsAnimate(true)
        setTimeout(() => {
          setIsAnimate(false)
          onClose();
        },300)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={` fixed inset-0 bg-black bg-opacity-70 z-50  ${isOpen&&isAnimate ? 'motion-opacity-out-50 motion-duration-200':''}`}>
      <div className={`fixed inset-y-0 right-0 w-96 bg-slate-700 shadow-lg  transform transition-transform duration-300 will-change-transform ${isOpen? 'motion-preset-slide-left': 'motion-scale-x-out-100 '}  ${isAnimate ? 'translate-x-full' : ''} modal-content`}>
        <div className="p-6">
          {children}
          {/* <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
            Close Modal
          </button> */}
        </div>
      </div>
    </div>
  );
}