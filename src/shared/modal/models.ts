export interface ModalProps {
    handleClose: () => void;
    children: React.ReactNode;
    open: boolean;
    size: 'small' | 'medium' | 'large';
}

export interface PortalProps {
    children: React.ReactNode;
    id: string;
}

export interface UseEscapeActionProps {
    open: boolean;
    callback: () => void;
    key: string;
}