import { useCallback, useEffect } from "react";
import { useToggle } from "react-use";

export const useIsDisabledByStatus = (status) => {
  const [isDisabled, toggleDisabled] = useToggle(false);

  useEffect(() => {
    toggleDisabled(['active', 'pending'].includes(status));
  }, []);

  const makeEnabled = useCallback(() => {
    toggleDisabled(false);
  }, []);

  return [isDisabled, makeEnabled];
}
