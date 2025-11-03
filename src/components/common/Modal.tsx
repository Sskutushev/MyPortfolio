// src/components/common/Modal.tsx
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  ariaLabel?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  ariaLabel = "Modal dialog",
}: ModalProps) => {
  const containerRef = useFocusTrap(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    // Блокируем скролл body
    document.body.style.overflow = "hidden";

    // ESC для закрытия
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
      >
        <motion.div
          ref={containerRef as any}
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-c-bg-primary border border-c-border shadow-2xl focus:outline-none"
          tabIndex={-1}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.getElementById("modal-root")!,
  );
};
