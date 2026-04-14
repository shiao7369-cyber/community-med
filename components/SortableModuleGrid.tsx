"use client";

import { useState, useEffect } from "react";
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
import type { Module } from "@/lib/modules";
import ModuleCard from "./ModuleCard";

function SortableModuleCard({
  module,
  index,
}: {
  module: Module;
  index: number;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: module.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    animationDelay: `${index * 100}ms`,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="animate-fade-in-up"
      {...attributes}
      {...listeners}
    >
      <ModuleCard module={module} />
    </div>
  );
}

const STORAGE_KEY = "module-order";

export default function SortableModuleGrid({
  modules,
}: {
  modules: Module[];
}) {
  const [orderedModules, setOrderedModules] = useState(modules);
  const [activeModule, setActiveModule] = useState<Module | null>(null);

  // Load saved order from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const savedOrder: string[] = JSON.parse(saved);
        const reordered = savedOrder
          .map((id) => modules.find((m) => m.id === id))
          .filter((m): m is Module => !!m);
        // Append any new modules not in saved order
        const remaining = modules.filter(
          (m) => !savedOrder.includes(m.id)
        );
        setOrderedModules([...reordered, ...remaining]);
      } catch {
        setOrderedModules(modules);
      }
    }
  }, [modules]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const mod = orderedModules.find((m) => m.id === event.active.id);
    setActiveModule(mod || null);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveModule(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setOrderedModules((items) => {
      const oldIndex = items.findIndex((m) => m.id === active.id);
      const newIndex = items.findIndex((m) => m.id === over.id);
      const newOrder = arrayMove(items, oldIndex, newIndex);

      // Save to localStorage
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(newOrder.map((m) => m.id))
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
        items={orderedModules.map((m) => m.id)}
        strategy={rectSortingStrategy}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {orderedModules.map((module, index) => (
            <SortableModuleCard
              key={module.id}
              module={module}
              index={index}
            />
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeModule ? (
          <div className="rotate-2 scale-105">
            <ModuleCard module={activeModule} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
