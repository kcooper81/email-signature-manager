'use client';

import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Link as LinkIcon,
  Undo,
  Redo,
  RemoveFormatting,
} from 'lucide-react';
import { useCallback, useEffect, forwardRef, useImperativeHandle } from 'react';

export interface RichTextEditorRef {
  getHTML: () => string;
  getText: () => string;
  clear: () => void;
  setContent: (html: string) => void;
  isEmpty: () => boolean;
  focus: () => void;
}

interface RichTextEditorProps {
  placeholder?: string;
  className?: string;
  onChange?: (html: string) => void;
  initialContent?: string;
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-1.5 rounded transition-colors ${
        active
          ? 'bg-slate-200 text-slate-900'
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
      } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // Auto-prepend https:// if missing
    const finalUrl = url.match(/^https?:\/\//) ? url : `https://${url}`;
    editor.chain().focus().extendMarkRange('link').setLink({ href: finalUrl }).run();
  }, [editor]);

  const iconSize = 'h-3.5 w-3.5';

  return (
    <div className="flex items-center gap-0.5 px-2 py-1 border-b border-slate-200 bg-slate-50 rounded-t-md flex-wrap">
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive('bold')}
        title="Bold (Ctrl+B)"
      >
        <Bold className={iconSize} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive('italic')}
        title="Italic (Ctrl+I)"
      >
        <Italic className={iconSize} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        active={editor.isActive('underline')}
        title="Underline (Ctrl+U)"
      >
        <UnderlineIcon className={iconSize} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive('strike')}
        title="Strikethrough"
      >
        <Strikethrough className={iconSize} />
      </ToolbarButton>

      <div className="w-px h-4 bg-slate-300 mx-1" />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive('bulletList')}
        title="Bullet list"
      >
        <List className={iconSize} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive('orderedList')}
        title="Numbered list"
      >
        <ListOrdered className={iconSize} />
      </ToolbarButton>

      <div className="w-px h-4 bg-slate-300 mx-1" />

      <ToolbarButton
        onClick={setLink}
        active={editor.isActive('link')}
        title="Add link"
      >
        <LinkIcon className={iconSize} />
      </ToolbarButton>

      <div className="w-px h-4 bg-slate-300 mx-1" />

      <ToolbarButton
        onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
        title="Clear formatting"
      >
        <RemoveFormatting className={iconSize} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo (Ctrl+Z)"
      >
        <Undo className={iconSize} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo (Ctrl+Y)"
      >
        <Redo className={iconSize} />
      </ToolbarButton>
    </div>
  );
}

export const RichTextEditor = forwardRef<RichTextEditorRef, RichTextEditorProps>(
  function RichTextEditor({ placeholder, className, onChange, initialContent }, ref) {
    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          heading: false,
          codeBlock: false,
          blockquote: false,
          horizontalRule: false,
        }),
        Link.configure({
          openOnClick: false,
          HTMLAttributes: {
            style: 'color: #4d52de; text-decoration: underline;',
          },
        }),
        Underline,
        Placeholder.configure({
          placeholder: placeholder || 'Write a reply...',
        }),
      ],
      content: initialContent || '',
      editorProps: {
        attributes: {
          class: 'prose prose-sm max-w-none focus:outline-none min-h-[200px] px-3 py-2 text-sm',
        },
      },
      onUpdate: ({ editor }) => {
        onChange?.(editor.getHTML());
      },
    });

    useImperativeHandle(ref, () => ({
      getHTML: () => editor?.getHTML() || '',
      getText: () => editor?.getText() || '',
      clear: () => editor?.commands.clearContent(),
      setContent: (html: string) => editor?.commands.setContent(html),
      isEmpty: () => {
        if (!editor) return true;
        const text = editor.getText().trim();
        return text.length === 0;
      },
      focus: () => editor?.commands.focus(),
    }), [editor]);

    // Sync initial content if it changes externally (e.g. canned response)
    useEffect(() => {
      if (initialContent !== undefined && editor && !editor.isFocused) {
        const currentContent = editor.getHTML();
        if (currentContent !== initialContent) {
          editor.commands.setContent(initialContent);
        }
      }
    }, [initialContent, editor]);

    if (!editor) return null;

    return (
      <div className={`border rounded-md bg-white overflow-hidden ${className || ''}`}>
        <Toolbar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    );
  }
);
