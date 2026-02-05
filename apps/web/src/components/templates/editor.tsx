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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Shield,
  AlertCircle,
} from 'lucide-react';
import type { SignatureBlock, SignatureBlockType, IndustryType } from './types';
import { BlockEditor } from './block-editor';
import { EmailClientPreview } from './email-client-preview';
import { IndustrySelector } from './industry-selector';

interface TemplateEditorProps {
  initialBlocks: SignatureBlock[];
  initialName?: string;
  initialDescription?: string;
  initialIndustry?: IndustryType;
  onSave: (name: string, description: string, blocks: SignatureBlock[], industry: IndustryType) => Promise<void>;
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
  { type: 'banner', label: 'Banner', icon: <Image className="h-4 w-4" /> },
  { type: 'disclaimer', label: 'Disclaimer', icon: <FileText className="h-4 w-4" /> },
  { type: 'compliance', label: 'Compliance', icon: <Shield className="h-4 w-4" /> },
  { type: 'html', label: 'HTML', icon: <Code className="h-4 w-4" /> },
];

export function TemplateEditor({
  initialBlocks,
  initialName = '',
  initialDescription = '',
  initialIndustry = 'general',
  onSave,
  saving,
}: TemplateEditorProps) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [industry, setIndustry] = useState<IndustryType>(initialIndustry);
  const [blocks, setBlocks] = useState<SignatureBlock[]>(initialBlocks);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

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
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: getDefaultContent(type, industry),
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
      setValidationError('Please enter a template name');
      return;
    }
    setValidationError(null);
    await onSave(name, description, blocks, industry);
  };

  const selectedBlock = blocks.find((b) => b.id === selectedBlockId);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex-1">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Untitled Template"
              className="text-lg font-semibold bg-transparent border-none outline-none w-full"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          {validationError && (
            <div className="flex items-center gap-2 text-destructive text-sm">
              <AlertCircle className="h-4 w-4" />
              {validationError}
            </div>
          )}
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

      {/* Main Content - 3 Column Grid */}
      <div className="p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Add Block */}
          <div className="col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Add Block</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Industry Selector */}
                <div className="pb-4 border-b">
                  <IndustrySelector value={industry} onChange={setIndustry} />
                </div>
                
                {/* Block Type Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  {BLOCK_TYPES.map((blockType) => (
                    <Button
                      key={blockType.type}
                      variant="outline"
                      size="sm"
                      className="justify-start h-auto py-2"
                      onClick={() => addBlock(blockType.type)}
                    >
                      <span className="mr-2">{blockType.icon}</span>
                      <span className="text-xs">{blockType.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Blocks</CardTitle>
              </CardHeader>
              <CardContent>
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
                      <div className="space-y-2">
                        {blocks.map((block) => (
                          <SortableBlock
                            key={block.id}
                            block={block}
                            isSelected={selectedBlockId === block.id}
                            onSelect={() => setSelectedBlockId(block.id)}
                            onDelete={() => deleteBlock(block.id)}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Center Column - Block Settings */}
          <div className="col-span-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm capitalize">
                  {selectedBlock ? selectedBlock.type.replace('-', ' ') : 'Block Settings'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedBlock ? (
                  <BlockEditor
                    block={selectedBlock}
                    onChange={(content) => updateBlock(selectedBlock.id, content)}
                  />
                ) : (
                  <div className="text-center py-12 text-muted-foreground text-sm">
                    <p>Select a block to edit</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Email Client Preview */}
          <div className="col-span-5">
            <Card>
              <CardHeader>
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

// Sortable block component
interface SortableBlockProps {
  block: SignatureBlock;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

function SortableBlock({ block, isSelected, onSelect, onDelete }: SortableBlockProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 p-2 border rounded cursor-pointer transition-colors ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onSelect}
    >
      <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
        <GripVertical className="h-4 w-4 text-gray-400" />
      </button>
      <div className="flex-1 text-sm capitalize">{block.type.replace('-', ' ')}</div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="text-gray-400 hover:text-red-600"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

// Helper function to get default content
function getDefaultContent(type: SignatureBlockType, industry: IndustryType): any {
  // ... (keep existing getDefaultContent implementation)
  switch (type) {
    case 'text':
      return {
        text: 'Your text here',
        fontSize: 14,
        fontWeight: 'normal',
        color: '#333333',
      };
    case 'image':
      return {
        src: '',
        alt: '',
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
        width: 1,
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
        website: '{{website}}',
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
    case 'banner':
      return {
        src: '',
        alt: 'Banner',
        width: 600,
      };
    case 'disclaimer':
      return {
        text: '',
        template: 'confidentiality',
        fontSize: 11,
        color: '#666666',
      };
    case 'compliance':
      return getDefaultComplianceFields(industry);
    case 'html':
      return {
        html: '',
      };
    default:
      return {};
  }
}

function getDefaultComplianceFields(industry: IndustryType): any {
  const baseFields = { industry };
  
  switch (industry) {
    case 'legal':
      return { ...baseFields, barNumber: '', barState: '', credentials: '' };
    case 'healthcare':
      return { ...baseFields, npiNumber: '', licenseNumber: '', licenseState: '' };
    case 'finance':
      return { ...baseFields, crdNumber: '', licenseNumber: '', registeredWith: '' };
    case 'real_estate':
      return { ...baseFields, licenseNumber: '', licenseState: '', dreNumber: '' };
    default:
      return baseFields;
  }
}
