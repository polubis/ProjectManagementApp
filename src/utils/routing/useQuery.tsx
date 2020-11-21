import { useLocation } from 'react-router';

export const useQuery = (): URLSearchParams => new URLSearchParams(useLocation().search);
