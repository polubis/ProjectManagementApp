import { useLocation } from 'react-router';

export const useQuery = () => new URLSearchParams(useLocation().search);
