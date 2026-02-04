'use client';

import { useState, useEffect } from 'react';
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
  Code,
  FileText,
} from 'lucide-react';
import type { SignatureBlock, SignatureBlockType } from './types';
import { BlockEditor } from './block-editor';
import { SignaturePreview } from './preview';
import { EmailClientPreview } from './email-client-preview';
import { QuickForm } from './quick-form';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

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
  { type: 'social', label: 'Social', icon: <Share2 className="h-4 w-4" /> },
  { type: 'divider', label: 'Divider', icon: <Minus className="h-4 w-4" /> },
  { type: 'spacer', label: 'Spacer', icon: <Space className="h-4 w-4" /> },
  { type: 'contact-info', label: 'Contact', icon: <Phone className="h-4 w-4" /> },
  { type: 'button', label: 'Button', icon: <Square className="h-4 w-4" /> },
  { type: 'disclaimer', label: 'Disclaimer', icon: <FileText className="h-4 w-4" /> },
  { type: 'html', label: 'HTML', icon: <Code className="h-4 w-4" /> },
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
  const [editorMode, setEditorMode] = useState<'quick' | 'advanced'>(initialBlocks.length === 0 ? 'quick' : 'advanced');
  const [quickFormCompatible, setQuickFormCompatible] = useState(true);
  const [showCompatibilityWarning, setShowCompatibilityWarning] = useState(false);

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

  const handleQuickFormGenerate = (generatedBlocks: SignatureBlock[]) => {
    setBlocks(generatedBlocks);
    setQuickFormCompatible(true);
    setShowCompatibilityWarning(false);
  };

  const handleQuickFormUpdate = (updatedBlocks: SignatureBlock[]) => {
    setBlocks(updatedBlocks);
    setQuickFormCompatible(true);
  };

  // Check if blocks are compatible with Quick Form
  const isQuickFormCompatible = (blocks: SignatureBlock[]): boolean => {
    if (blocks.length === 0) return true;

    // Count block types
    const blockCounts = {
      text: blocks.filter(b => b.type === 'text').length,
      image: blocks.filter(b => b.type === 'image').length,
      contactInfo: blocks.filter(b => b.type === 'contact-info').length,
      social: blocks.filter(b => b.type === 'social').length,
      disclaimer: blocks.filter(b => b.type === 'disclaimer').length,
      html: blocks.filter(b => b.type === 'html').length,
      button: blocks.filter(b => b.type === 'button').length,
    };

    // Quick Form doesn't support:
    // - Custom HTML blocks
    // - Multiple images (only 1 profile photo)
    // - Buttons
    // - Multiple contact-info blocks
    // - Multiple social blocks
    // - Multiple disclaimer blocks
    if (blockCounts.html > 0) return false;
    if (blockCounts.button > 0) return false;
    if (blockCounts.image > 1) return false;
    if (blockCounts.contactInfo > 1) return false;
    if (blockCounts.social > 1) return false;
    if (blockCounts.disclaimer > 1) return false;

    // Text blocks should be reasonable (name, title, company)
    if (blockCounts.text > 5) return false;

    return true;
  };

  // Check compatibility whenever blocks change
  useEffect(() => {
    const compatible = isQuickFormCompatible(blocks);
    setQuickFormCompatible(compatible);
    if (!compatible && editorMode === 'quick') {
      setShowCompatibilityWarning(true);
    }
  }, [blocks, editorMode]);

  const handleModeChange = (mode: 'quick' | 'advanced') => {
    // Re-check compatibility before switching to quick mode
    if (mode === 'quick') {
      const compatible = isQuickFormCompatible(blocks);
      if (!compatible) {
        setQuickFormCompatible(false);
        setShowCompatibilityWarning(true);
        return;
      }
    }
    setEditorMode(mode);
    setShowCompatibilityWarning(false);
  };

  const selectedBlock = blocks.find((b) => b.id === selectedBlockId);

  return (
    <div className="min-h-0">
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

      {/* Editor Mode Toggle */}
      <div className="mb-6 space-y-3">
        <Tabs value={editorMode} onValueChange={(v) => handleModeChange(v as 'quick' | 'advanced')}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="quick" disabled={!quickFormCompatible}>
              Quick Form
              {!quickFormCompatible && ' (Unavailable)'}
            </TabsTrigger>
            <TabsTrigger value="advanced">Advanced Builder</TabsTrigger>
          </TabsList>
        </Tabs>

        {showCompatibilityWarning && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Quick Form is disabled because this signature contains custom blocks (HTML, buttons, or multiple images). 
              Continue using Advanced Builder to edit this signature.
            </AlertDescription>
          </Alert>
        )}

        {editorMode === 'quick' && blocks.length > 0 && quickFormCompatible && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Editing in Quick Form will update your signature blocks. Switch to Advanced Builder for more control.
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Main content - 2 column layout: editor | preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pb-6">
        {/* Left: Editor area (changes based on mode) */}
        <div className="lg:col-span-7">
          {editorMode === 'quick' ? (
            <QuickForm 
              onGenerate={handleQuickFormGenerate}
              onUpdate={handleQuickFormUpdate}
              initialBlocks={blocks}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Column 1: Add blocks + Block list */}
              <div className="lg:col-span-5 space-y-4">
                {/* Add Block buttons */}
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Add Block</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 gap-1.5">
                      {BLOCK_TYPES.map((blockType) => (
                        <Button
                          key={blockType.type}
                          variant="outline"
                          size="sm"
                          className="justify-start text-xs h-8"
                          onClick={() => addBlock(blockType.type)}
                        >
                          {blockType.icon}
                          <span className="ml-1">{blockType.label}</span>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Block list */}
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Blocks</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {blocks.length === 0 ? (
                      <div className="text-center py-6 text-muted-foreground text-sm">
                        <p>No blocks yet</p>
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

              {/* Column 2: Block editor (sticky) */}
              <div className="lg:col-span-7">
                <div className="lg:sticky lg:top-4">
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">
                        {selectedBlock ? `Edit: ${selectedBlock.type.replace('-', ' ')}` : 'Block Settings'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {selectedBlock ? (
                        <BlockEditor
                          block={selectedBlock}
                          onChange={(content) => updateBlock(selectedBlock.id, content)}
                        />
                      ) : (
                        <div className="text-center py-8 text-muted-foreground text-sm">
                          <p>Select a block to edit</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Shared Preview (sticky) */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-4">
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm">Email Client Preview</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <EmailClientPreview blocks={blocks} />
              </CardContent>
            </Card>
          </div>
        </div>
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
          : 'hover:bg-accent bg-card'
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
    case 'disclaimer':
      return {
        text: 'This email and any attachments are confidential and intended solely for the use of the individual or entity to whom they are addressed. If you have received this email in error, please notify the sender immediately and delete it from your system.',
        template: 'confidentiality',
        fontSize: 10,
        color: '#666666',
      };
    case 'html':
      return {
        html: '',
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
    case 'disclaimer':
      return 'Legal disclaimer';
    case 'html':
      return content.html ? 'Custom HTML' : 'Empty HTML';
    default:
      return block.type;
  }
}
