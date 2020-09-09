import { useCallback, useState, useRef, useEffect} from 'react';

export const useIsMounted = (): (() => boolean) => {
    const ref = useRef<boolean>(false);
    useEffect(() => {
        ref.current = true;
        return () => {
            ref.current = false;
        };
    }, []);
    return useCallback(() => ref.current, []);
};

export const useFetch: (action: (args: any) => Promise<any>) => [boolean, (args: any) => Promise<any>] = (
    action: (args: any) => Promise<any>,
  ) => {
    const [isLoading, setLoading] = useState(false);
    const isMounted = useIsMounted();
    const call = useCallback((args: any) => {
        if (!isLoading) {
            if (isMounted()) {
                setLoading(true);
        }
        return action(args)
          .then((result) => {
            if (isMounted()) {
              setLoading(false);
            }
            return result;
          })
          .catch((error) => {
            if (isMounted()) {
              setLoading(false);
            }
            throw error;
          });
      } else {
        return Promise.resolve();
      }
    }, [action, isLoading, isMounted]);
    return [isLoading, call];
  };