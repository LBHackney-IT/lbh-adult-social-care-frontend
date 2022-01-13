import React, { useState } from 'react';
import { Container, HorizontalSeparator, Link } from '..';
import { TreeViewItem } from './TreeViewItem';

export const TreeView = ({ items, renderItem, renderChildren }) => {
  const [openIds, setOpenIds] = useState([]);
  const handleClick = (e, id) => {
    e.preventDefault();
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((x) => x !== id));
    } else {
      // eslint-disable-next-line no-shadow
      setOpenIds((openIds) => [...openIds, id]);
    }
  };
  return items.map((item, index) => (
    <Container key={item?.id} display="flex" flexDirection="column">
      <TreeViewItem>
        <Container
          padding="24px 16px"
          background="#FAFAFA"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
        >
          {renderItem(item)}
          {renderChildren(item)?.length > 0 && (
            <>
              <HorizontalSeparator height={10} />
              <Link noVisited onClick={(e) => handleClick(e, item.id)}>
                {openIds.includes(item.id) ? 'Collapse' : 'Expand'}
              </Link>
            </>
          )}
        </Container>
        <HorizontalSeparator height={10} />
        {renderChildren(item)?.length > 0 && openIds.includes(item.id) && (
          <Container margin="0 0 0 20px">
            <TreeView items={renderChildren(item)} renderItem={renderItem} renderChildren={renderChildren} />
          </Container>
        )}
      </TreeViewItem>
    </Container>
  ));
};
