export interface ModalProps {
    handleClose: () => void;
    children: React.ReactNode;
    open: boolean;
    size: 'small' | 'medium' | 'large';
}

export interface UsePortalProps {
    parent: any;
}