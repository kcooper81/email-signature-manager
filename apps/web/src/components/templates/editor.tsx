'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ArrowLeft,
  Save,
  Eye,
  Type,
  Image,
  Share2,
  Minus,
  Space,
  Phone,
  Square,
  GripVertical,
  Trash2,
  Loader2,
} from 'lucide-react';
import type { SignatureBlock, SignatureBlockType } from './types';
import { BlockEditor } from './block-editor';
import { SignaturePreview } from './preview';

interface TemplateEditorProps {
  initialBlocks: SignatureBlock[];
  initialName?: string;
  initialDescription?: string;
  onSave: (name: string, description: string, blocks: SignatureBlock[]) => Promise<void>;
  saving: boolean;
}

const BLOCK_TYPES: { type: SignatureBlockType; label: string; icon: React.ReactNode }[] = [
  { type: 'text', label: 'Text', icon: <Type className="h-4 w-4" /> },
  { type: 'image', label: 'Image', icon: <Image className="h-4 w-4" /> },
  { type: 'social', label: 'Social Links', icon: <Share2 className="h-4 w-4" /> },
  { type: 'divider', label: 'Divider', icon: <Minus className="h-4 w-4" /> },
  { type: 'spacer', label: 'Spacer', icon: <Space className="h-4 w-4" /> },
  { type: 'contact-info', label: 'Contact Info', icon: <Phone className="h-4 w-4" /> },
  { type: 'button', label: 'Button', icon: <Square className="h-4 w-4" /> },
];

export function TemplateEditor({
  initialBlocks,
  initialName = '',
  initialDescription = '',
  onSave,
  saving,
}: TemplateEditorProps) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [blocks, setBlocks] = useState<SignatureBlock[]>(initialBlocks);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addBlock = (type: SignatureBlockType) => {
    const newBlock: SignatureBlock = {
      id: crypto.randomUUID(),
      type,
      content: getDefaultContent(type),
    };
    setBlocks([...blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
  };

  const updateBlock = (id: string, content: SignatureBlock['content']) => {
    setBlocks(blocks.map((b) => (b.id === id ? { ...b, content } : b)));
  };

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter((b) => b.id !== id));
    if (selectedBlockId === id) {
      setSelectedBlockId(null);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      alert('Please enter a template name');
      return;
    }
    await onSave(name, description, blocks);
  };

  const selectedBlock = blocks.find((b) => b.id === selectedBlockId);

  return (
    <div className="h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="shrink-0">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="space-y-1">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Untitled Template"
              className="text-2xl font-semibold bg-transparent border-none outline-none w-full placeholder:text-slate-300 focus:placeholder:text-slate-400"
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description..."
              className="text-sm text-muted-foreground bg-transparent border-none outline-none w-full placeholder:text-slate-400"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
          >
            <Eye className="mr-2 h-4 w-4" />
            {showPreview ? 'Hide' : 'Show'} Preview
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Template
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-12 gap-6 h-[calc(100%-4rem)]">
        {/* Block palette */}
        <div className="col-span-2">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Add Block</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {BLOCK_TYPES.map((blockType) => (
                <Button
                  key={blockType.type}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => addBlock(blockType.type)}
                >
                  {blockType.icon}
                  <span className="ml-2">{blockType.label}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Block list */}
        <div className="col-span-4">
          <Card className="h-full overflow-auto">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Signature Blocks</CardTitle>
              <CardDescription>Click to edit, drag to reorder</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {blocks.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No blocks yet</p>
                  <p className="text-sm">Add blocks from the left panel</p>
                </div>
              ) : (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={blocks.map((b) => b.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {blocks.map((block) => (
                      <SortableBlock
                        key={block.id}
                        block={block}
                        isSelected={selectedBlockId === block.id}
                        onSelect={() => setSelectedBlockId(block.id)}
                        onDelete={() => deleteBlock(block.id)}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Block editor */}
        <div className="col-span-3">
          <Card className="h-full overflow-auto">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Block Settings</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedBlock ? (
                <BlockEditor
                  block={selectedBlock}
                  onChange={(content) => updateBlock(selectedBlock.id, content)}
                />
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Select a block to edit</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        {showPreview && (
          <div className="col-span-3">
            <Card className="h-full overflow-auto">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Live Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white border rounded-lg p-4">
                  <SignaturePreview blocks={blocks} />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

// Sortable block component for drag-and-drop
interface SortableBlockProps {
  block: SignatureBlock;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

function SortableBlock({ block, isSelected, onSelect, onDelete }: SortableBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors mb-2 ${
        isSelected
          ? 'border-primary bg-primary/5'
          : 'hover:bg-slate-50 bg-white'
      } ${isDragging ? 'shadow-lg' : ''}`}
      onClick={onSelect}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing touch-none"
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium capitalize">{block.type.replace('-', ' ')}</p>
        <p className="text-xs text-muted-foreground truncate">
          {getBlockPreviewText(block)}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-muted-foreground hover:text-destructive shrink-0"
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

function getDefaultContent(type: SignatureBlockType): SignatureBlock['content'] {
  switch (type) {
    case 'text':
      return {
        text: 'Enter text here',
        fontSize: 14,
        fontWeight: 'normal',
        color: '#1a1a1a',
      };
    case 'image':
      return {
        src: '',
        alt: 'Logo',
        width: 150,
      };
    case 'social':
      return {
        platforms: [],
        iconSize: 24,
        iconStyle: 'color',
      };
    case 'divider':
      return {
        color: '#e5e5e5',
        width: 100,
        style: 'solid',
      };
    case 'spacer':
      return {
        height: 16,
      };
    case 'contact-info':
      return {
        email: '{{email}}',
        phone: '{{phone}}',
        showIcons: true,
      };
    case 'button':
      return {
        text: 'Click Here',
        url: '',
        backgroundColor: '#0066cc',
        textColor: '#ffffff',
        borderRadius: 4,
      };
    default:
      // Default to text block content
      return {
        text: '',
        fontSize: 14,
        fontWeight: 'normal' as const,
        color: '#333333',
      };
  }
}

function getBlockPreviewText(block: SignatureBlock): string {
  const content = block.content as any;
  switch (block.type) {
    case 'text':
      return content.text || 'Empty text';
    case 'image':
      return content.src ? 'Image set' : 'No image';
    case 'social':
      return `${content.platforms?.length || 0} platforms`;
    case 'divider':
      return `${content.style} line`;
    case 'spacer':
      return `${content.height}px`;
    case 'contact-info':
      return 'Contact details';
    case 'button':
      return content.text || 'Button';
    default:
      return block.type;
  }
}
