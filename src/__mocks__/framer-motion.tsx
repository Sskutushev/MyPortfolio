// src/__mocks__/framer-motion.tsx
export const motion = {
  div: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: any;
  }) => <div {...props}>{children}</div>,
  button: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: any;
  }) => <button {...props}>{children}</button>,
  form: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: any;
  }) => <form {...props}>{children}</form>,
  section: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: any;
  }) => <section {...props}>{children}</section>,
  span: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: any;
  }) => <span {...props}>{children}</span>,
  img: ({ alt, ...props }: { alt?: string; [key: string]: any }) => (
    <img alt={alt || ""} {...props} />
  ),

  // Заглушка для анимаций
  animate: () => {},
  whileHover: {},
  whileTap: {},
  whileInView: {},
};

export const AnimatePresence = ({
  children,
}: {
  children: React.ReactNode;
}) => <>{children}</>;

export const useAnimation = () => ({
  start: () => Promise.resolve(),
});

export const useInView = () => true;
