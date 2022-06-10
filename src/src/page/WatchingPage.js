import styled from 'styled-components';

import Item from 'src/components/Item';
import useStore from 'src/hooks/useStore';

const Div = styled.div`
  display: flex;
  flex-direction: row;
  gap: 14px;
  flex-wrap: wrap;
`;

const WatchingPage = (props) => {
  const { list, dispatch } = useStore();

  const Remove = (info) => {
    dispatch({ type: 'REMOVE_LIST', payload: info });
  };

  return (
    <Div>
      {list.map((info) => (
        <Item key={info.id} info={info} onRemove={() => Remove(info)} />
      ))}
    </Div>
  );
};

export default WatchingPage;
