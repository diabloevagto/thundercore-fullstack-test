import { useContext } from 'react';

import ContextStore from 'src/store';

export default function useStore() {
  const store = useContext(ContextStore);

  return { ...store };
}
