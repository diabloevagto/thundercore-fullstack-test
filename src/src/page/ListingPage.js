import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { debounce } from 'lodash-es';
import Item from 'src/components/Item';
import Loading from 'src/components/Loading';
import useStore from 'src/hooks/useStore';

const Div = styled.div`
  display: flex;
  flex-direction: row;
  gap: 14px;
  flex-wrap: wrap;
`;

const ListingPage = (props) => {
  const { dispatch } = useStore();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState('');
  const listDiv = useRef();

  const fetchList = useCallback(() => {
    setLoading(true);
    fetch(`https://api.opensea.io/api/v1/assets?limit=20&cursor=${cursor}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setItems([...items, ...response.assets]);
        setCursor(response.next);

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);

        setLoading(false);
      });
  }, [cursor, items]);

  const onScroll = debounce(() => {
    if (listDiv.current) {
      if (
        listDiv.current.getBoundingClientRect().bottom < 1500 &&
        loading === false
      ) {
        fetchList();
      }
    }
  }, 1000);

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', onScroll);

    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  const Add = (info) => {
    dispatch({ type: 'ADD_LIST', payload: info });
  };

  const Remove = (info) => {
    dispatch({ type: 'REMOVE_LIST', payload: info });
  };

  return (
    <Div ref={listDiv}>
      {items.map((info) => (
        <Item
          key={info.id}
          info={info}
          onAdd={() => Add(info)}
          onRemove={() => Remove(info)}
        />
      ))}
      {loading && <Loading />}
    </Div>
  );
};

export default ListingPage;
