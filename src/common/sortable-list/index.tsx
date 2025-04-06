import Icon from '@cloudscape-design/components/icon';
import clsx from 'clsx';
import { useState } from 'react';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import styles from './styles.module.scss';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import FormField from '@cloudscape-design/components/form-field';

export default function SortableList({ items, onChange, disabled }: SortableListProps) {
  const [overRank, setOverRank] = useState<number>(-1);
  const [activeItemId, setActiveItemId] = useState<UniqueIdentifier | null>(null);
  const activeItem = activeItemId ? items.find((item) => item.id === activeItemId) : null;
  const sensors = useSensors(
    useSensor(TouchSensor),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragCancel() {
    setActiveItemId(null);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveItemId(null);
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = items.findIndex(({ id }) => id === active.id);
      const newIndex = items.findIndex(({ id }) => id === over?.id);

      onChange?.(arrayMove(items, oldIndex, newIndex));
    }
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveItemId(event.active.id);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragOver={(event) => {
        const overId = event.over?.id;
        const nextOverIndex = items.findIndex((item) => item.id === overId);
        setOverRank((items.length - nextOverIndex - 1) * 2);
      }}
      onDragCancel={handleDragCancel}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <SpaceBetween size="m">
        <FormField label="Safe">
          <SortableContext disabled={disabled} items={items} strategy={verticalListSortingStrategy}>
            {items.slice(0, items.length - 1).map((item) => (
              <ListItem disabled={disabled} item={item} />
            ))}
          </SortableContext>
        </FormField>
        <FormField label="Eliminated">
          <SortableContext disabled={disabled} items={items} strategy={verticalListSortingStrategy}>
            {items.slice(items.length - 1).map((item) => (
              <ListItem disabled={disabled} item={item} />
            ))}
          </SortableContext>
        </FormField>
      </SpaceBetween>
      <DragOverlay>
        {activeItem ? <ListItem item={activeItem} isActive rank={overRank} /> : null}
      </DragOverlay>
    </DndContext>
  );
}

function ListItem({
  item,
  isActive,
  disabled,
  rank,
}: {
  item: SortableListProps.Item;
  isActive?: boolean;
  disabled?: boolean;
  rank?: number;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging, items, isSorting, newIndex } =
    useSortable({
      id: item.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      className={clsx(
        styles['item-wrapper'],
        isActive && styles['item-wrapper-active'],
        isSorting && styles.sorting
      )}
      style={style}
      ref={setNodeRef}
    >
      <div
        className={clsx(
          styles.item,
          isDragging && styles.placeholder,
          isActive && styles['item-active']
        )}
      >
        {!disabled && (
          <div
            {...attributes}
            {...listeners}
            className={clsx(styles['drag-handle'], isActive && styles.active)}
          >
            <Icon name="drag-indicator" />
          </div>
        )}
        <div>
          <div>{item.label}</div>
          {item.description && <Box variant="small">{item.description}</Box>}
        </div>
        <div className={styles['secondary-label']}>
          {isActive && rank ? rank : (items.length - (newIndex + 1)) * 2}
        </div>
      </div>
    </div>
  );
}

export declare namespace SortableListProps {
  interface Item {
    id: string;
    label: string;
    secondaryLabel?: string;
    description?: string;
  }
}
export interface SortableListProps {
  disabled?: boolean;
  items: SortableListProps.Item[];
  onChange?: (items: SortableListProps.Item[]) => void;
}
