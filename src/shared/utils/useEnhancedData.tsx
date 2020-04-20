import { useState } from 'react';

export interface EnhancedData<T> {
  data: T;
  isLoading: boolean;
  error: string;
}

export interface UseEnhancedData<T> extends EnhancedData<T> {
  setData(data: T): void;
  init(data: T): void;
  success(data: T): void;
  failure(error: string): void;
}

export const useEnhancedData = <T extends any>(
  data: T,
  isLoading = true,
  error = ''
): UseEnhancedData<T> => {
  const [enhancedData, setEnhancedData] = useState<EnhancedData<T>>({
    data,
    isLoading,
    error
  });

  const init = (data: T) => {
    setEnhancedData({
      data,
      isLoading: true,
      error: ''
    });
  };

  const success = (data: T) => {
    setEnhancedData({
      data,
      isLoading: false,
      error: ''
    });
  };

  const failure = (error: string) => {
    setEnhancedData({
      data,
      isLoading: false,
      error
    });
  };

  const setData = (data: T) => {
    setEnhancedData({
      data,
      isLoading,
      error
    });
  };

  return {
    ...enhancedData,
    setData,
    init,
    success,
    failure
  };
};
