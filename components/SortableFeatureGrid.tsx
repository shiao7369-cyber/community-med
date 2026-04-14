"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { SubFeature } from "@/lib/modules";
import SubFeatureCard from "./SubFeatureCard";

function SortableCard({
  feature,
  color,
  bgColor,
  index,
}: {
  feature: SubFeature;
  color: string;
  bgColor: string;
  index: number;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: feature.name });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    animationDelay: `${index * 80}ms`,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="animate-fade-in-up"
      {...attributes}
      {...listeners}
    >
      <SubFeatureCard
        feature={feature}
        color={color}
        bgColor={bgColor}
        index={index}
        isDragging={isDragging}
      />
    </div>
  );
}

export default function SortableFeatureGrid({
  moduleId,
  features,
  color,
  bgColor,
}: {
  moduleId: string;
  features: SubFeature[];
  color: string;
  bgColor: string;
}) {
  const [orderedFeatures, setOrderedFeatures] = useState(() => {
    if (typeof window === "undefined") return features;
    try {
      const saved = localStorage.getItem(`feature-order-${moduleId}`);
      if (saved) {
        const savedOrder: string[] = JSON.parse(saved);
        const reordered = savedOrder
          .map((name) => features.find((f) => f.name === name))
          .filter((f): f is SubFeature => !!f);
        const remaining = features.filter(
          (f) => !savedOrder.includes(f.name)
        );
        return [...reordered, ...remaining];
      }
    } catch {
      // ignore
    }
    return features;
  });
  const [activeFeature, setActiveFeature] = useState<SubFeature | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const feature = orderedFeatures.find((f) => f.name === event.active.id);
    setActiveFeature(feature || null);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveFeature(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setOrderedFeatures((items) => {
      const oldIndex = items.findIndex((f) => f.name === active.id);
      const newIndex = items.findIndex((f) => f.name === over.id);
      const newOrder = arrayMove(items, oldIndex, newIndex);

      // Save to localStorage
      localStorage.setItem(
        `feature-order-${moduleId}`,
        JSON.stringify(newOrder.map((f) => f.name))
      );

      return newOrder;
    });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={orderedFeatures.map((f) => f.name)}
        strategy={rectSortingStrategy}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {orderedFeatures.map((feature, index) => (
            <SortableCard
              key={feature.name}
              feature={feature}
              color={color}
              bgColor={bgColor}
              index={index}
            />
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeFeature ? (
          <div className="rotate-2 scale-105">
            <SubFeatureCard
              feature={activeFeature}
              color={color}
              bgColor={bgColor}
              index={0}
              isDragging
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
