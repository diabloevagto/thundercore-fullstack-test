import { useMemo } from 'react';
import styled from 'styled-components';

import useStore from 'src/hooks/useStore';

const Div = styled.div`
  border: 1px solid black;
  width: 280px;
  border-radius: 8px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: space-between;

  > img {
    width: 100%;
    min-height: 280px;
  }

  > .meta {
    padding: 4px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  > .btn {
    cursor: pointer;
    background-color: black;

    display: flex;
    justify-content: center;
    align-items: center;

    > span {
      color: white;
      padding: 8px;
    }
  }
`;

const Item = (props) => {
  const {
    info: { id, name, image_preview_url, last_sale },
    onAdd,
    onRemove,
  } = props;
  const { list } = useStore();

  const isList = useMemo(() => {
    return !!list.find((v) => v.id === id);
  }, [id, list]);

  return (
    <Div>
      <img src={image_preview_url} alt={name} />
      <div className="meta">
        <span>{name}</span>
        <span>{!!last_sale ? last_sale : 'no sale'}</span>
      </div>
      <div
        className="btn"
        onClick={() => {
          if (isList) {
            onRemove();
          } else {
            onAdd();
          }
        }}
      >
        <span>{isList ? 'Remove to Watchlist' : 'Add to Watchlist'}</span>
      </div>
    </Div>
  );
};

export default Item;
