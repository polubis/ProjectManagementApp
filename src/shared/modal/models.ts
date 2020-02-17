export interface ModalProps {
    handleClose: () => void;
    children: React.ReactNode;
    open: boolean;
    title: string;
    size: 'small' | 'medium' | 'large';
}

export interface PortalProps {
    children: React.ReactNode;
    id: string;
}