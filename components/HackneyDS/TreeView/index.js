import React, { useState } from 'react';
import { Container, HorizontalSeparator, Link } from '..';
import { TreeViewItem } from './TreeViewItem';

export const TreeView = ({ items, renderItem }) => {
  const [openIds, modifyOpenIds] = useState([]);
  const handleClick = (e, id) => {
    e.preventDefault();
    if (openIds.includes(id)) {
      modifyOpenIds(openIds.filter((x) => x !== id));
    } else {
      // eslint-disable-next-line no-shadow
      modifyOpenIds((openIds) => [...openIds, id]);
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
          {item?.children?.length > 0 && (
            <>
              <HorizontalSeparator height={10} />
              <Link noVisited onClick={(e) => handleClick(e, item.id)}>
                Collapse
              </Link>
            </>
          )}
        </Container>
        <HorizontalSeparator height={10} />
        {item?.children?.length > 0 && openIds.includes(item.id) && (
          <Container margin="0 0 0 20px">
            <TreeView items={item.children} renderItem={renderItem} />
          </Container>
        )}
      </TreeViewItem>
    </Container>
  ));
};
