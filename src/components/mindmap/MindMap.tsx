"use client";

import { useMemo } from "react";
import {
  Handle,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
  type NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  BarChart3,
  ChevronRight,
  CreditCard,
  FileText,
  KeyRound,
  Layers,
  LayoutGrid,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Data model                                                          */
/* ------------------------------------------------------------------ */

export interface MindMapFeature {
  id: string;
  title: string;
  /** Rendered as the "Fase 1" badge. */
  phase?: number;
  /** Status label under the title (default: "Direncanakan"). */
  status?: string;
  /** Icon key, see ICONS below. */
  icon?: string;
  subFeatures: { title: string }[];
}

export interface MindMapData {
  root: { title: string; subtitle?: string; icon?: string };
  features: MindMapFeature[];
}

const ICONS: Record<string, LucideIcon> = {
  file: FileText,
  grid: LayoutGrid,
  layers: Layers,
  card: CreditCard,
  users: Users,
  chart: BarChart3,
  key: KeyRound,
  settings: Settings,
};

function Icon({ name, className }: { name?: string; className?: string }) {
  const Cmp = (name && ICONS[name]) || FileText;
  return <Cmp className={className} />;
}

const HANDLE_CLS = "size-2! border-0! bg-muted!";
const MAX_VISIBLE_SUBS = 3;

/* ------------------------------------------------------------------ */
/* Node components                                                     */
/* ------------------------------------------------------------------ */

type PrdNodeType = Node<
  { title: string; subtitle?: string; icon?: string },
  "prd"
>;
type FeatureNodeType = Node<
  {
    title: string;
    phase?: number;
    status?: string;
    icon?: string;
  },
  "feature"
>;
type SubgroupNodeType = Node<
  { title: string; items: string[]; total: number },
  "subgroup"
>;

function PrdNode({ data }: NodeProps<PrdNodeType>) {
  return (
    <div className="w-56 cursor-pointer rounded-xl border border-border bg-card px-3.5 py-3 shadow-sm transition duration-300 hover:shadow-md">
      <div className="flex items-center gap-2">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon name={data.icon} className="size-4" />
        </span>
        <span className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground">
          {data.title}
        </span>
      </div>
      {data.subtitle ? (
        <span className="mt-2 inline-block text-[11px] font-medium text-muted">
          {data.subtitle}
        </span>
      ) : null}
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={false}
        className={HANDLE_CLS}
      />
    </div>
  );
}

function FeatureNode({ data }: NodeProps<FeatureNodeType>) {
  return (
    <div className="group relative w-56 cursor-pointer rounded-xl border border-border bg-card px-3.5 py-3 shadow-sm transition duration-300 hover:shadow-md">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={false}
        className={HANDLE_CLS}
      />
      {data.phase ? (
        <span className="absolute -top-2 right-3 z-10 rounded-full border border-primary/40 bg-primary/10 px-1.5 py-px text-[9px] font-bold uppercase tracking-wide text-primary shadow-sm">
          Fase {data.phase}
        </span>
      ) : null}
      <div className="flex items-center gap-2">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-background text-foreground">
          <Icon name={data.icon} className="size-4" />
        </span>
        <span className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground">
          {data.title}
        </span>
        <ChevronRight className="size-4 shrink-0 text-muted/40 transition group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        <span className="size-1.5 shrink-0 rounded-full bg-muted/50" />
        <span className="text-[11px] font-medium text-muted">
          {data.status ?? "Direncanakan"}
        </span>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={false}
        className={HANDLE_CLS}
      />
    </div>
  );
}

function SubgroupNode({ data }: NodeProps<SubgroupNodeType>) {
  const visible = data.items.slice(0, MAX_VISIBLE_SUBS);
  const hidden = data.total - visible.length;
  return (
    <div className="w-56 cursor-pointer rounded-xl border border-border bg-card px-3 py-2.5 transition duration-300 hover:shadow-md">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={false}
        className={HANDLE_CLS}
      />
      <div className="mb-2 flex items-center gap-1.5">
        <span className="flex size-5 shrink-0 items-center justify-center rounded-md bg-background text-foreground">
          <LayoutGrid className="size-3" />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wide text-muted">
          {data.title}
        </span>
      </div>
      <ul className="space-y-1">
        {visible.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1.5"
          >
            <span className="size-1.5 shrink-0 rounded-full bg-muted/40" />
            <span className="min-w-0 flex-1 truncate text-xs text-foreground">
              {item}
            </span>
          </li>
        ))}
      </ul>
      {hidden > 0 ? (
        <div className="mt-2 flex items-center justify-end gap-1 text-[11px] font-medium text-muted">
          Lihat semua ({data.total})
          <ChevronRight className="size-3" />
        </div>
      ) : null}
    </div>
  );
}

const NODE_TYPES: NodeTypes = {
  prd: PrdNode,
  feature: FeatureNode,
  subgroup: SubgroupNode,
};

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

const FEATURE_X = 420;
const SUB_X = 780;
const GAP_Y = 200;

function buildFlow(data: MindMapData): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const mid = (data.features.length - 1) / 2;

  data.features.forEach((f, i) => {
    const y = Math.round((i - mid) * GAP_Y);

    nodes.push({
      id: f.id,
      type: "feature",
      position: { x: FEATURE_X, y },
      data: {
        title: f.title,
        phase: f.phase,
        status: f.status,
        icon: f.icon,
      },
    } as FeatureNodeType);

    nodes.push({
      id: `subs-${f.id}`,
      type: "subgroup",
      position: { x: SUB_X, y },
      data: {
        title: "Sub fitur",
        items: f.subFeatures.map((s) => s.title),
        total: f.subFeatures.length,
      },
    } as SubgroupNodeType);

    edges.push({ id: `prd->${f.id}`, source: "prd", target: f.id });
    edges.push({
      id: `${f.id}->subs-${f.id}`,
      source: f.id,
      target: `subs-${f.id}`,
    });
  });

  nodes.push({
    id: "prd",
    type: "prd",
    position: { x: 0, y: -40 },
    data: {
      title: data.root.title,
      subtitle: data.root.subtitle,
      icon: data.root.icon,
    },
  } as PrdNodeType);

  return { nodes, edges };
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export default function MindMap({ data }: { data: MindMapData }) {
  const { nodes, edges } = useMemo(() => buildFlow(data), [data]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={NODE_TYPES}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
      fitView
      fitViewOptions={{ padding: 0.15, maxZoom: 1 }}
      minZoom={0.2}
      maxZoom={1.75}
      defaultEdgeOptions={{
        type: "default",
        style: { stroke: "var(--color-muted)", strokeOpacity: 0.35, strokeWidth: 2 },
      }}
      style={{ backgroundColor: "transparent" }}
    />
  );
}
