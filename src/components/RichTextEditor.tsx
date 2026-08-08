import { useRef, useEffect, useCallback } from 'react';
import {
  Bold, Italic, Underline, Strikethrough,
  List, ListOrdered, Quote, Code, Link,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Palette
} from 'lucide-react';

const FONT_FAMILIES = [
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: 'Times New Roman', value: 'Times New Roman, serif' },
  { label: 'Courier New', value: 'Courier New, monospace' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Verdana', value: 'Verdana, sans-serif' },
  { label: 'Trebuchet MS', value: 'Trebuchet MS, sans-serif' },
];

const FONT_SIZES = [
  { label: 'Kecil', value: '1' },
  { label: 'Standar', value: '3' },
  { label: 'Sedang', value: '4' },
  { label: 'Besar', value: '5' },
  { label: 'Sangat Besar', value: '6' },
  { label: 'Ekstra Besar', value: '7' },
];

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder = 'Tulis konten di sini...' }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isComposing = useRef(false);

  useEffect(() => {
    if (editorRef.current && !isComposing.current) {
      const currentContent = editorRef.current.innerHTML;
      const newVal = value || '';
      if (currentContent !== newVal) {
        editorRef.current.innerHTML = newVal;
      }
    }
  }, [value]);

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;

    let lastValue = '';
    const handleInput = () => {
      if (isComposing.current) return;
      const currentValue = el.innerHTML;
      if (currentValue !== lastValue) {
        lastValue = currentValue;
        const sanitized = sanitizeContent(currentValue);
        onChange(sanitized);
      }
    };

    const handleBlur = () => {
      const currentValue = el.innerHTML;
      if (currentValue !== lastValue) {
        lastValue = currentValue;
        const sanitized = sanitizeContent(currentValue);
        onChange(sanitized);
      }
    };

    el.addEventListener('input', handleInput);
    el.addEventListener('blur', handleBlur);
    lastValue = el.innerHTML;

    return () => {
      el.removeEventListener('input', handleInput);
      el.removeEventListener('blur', handleBlur);
    };
  }, [onChange]);

  const sanitizeContent = (html: string): string => {
    if (!html || html === '<br>') return '';
    let clean = html;
    clean = clean.replace(/<(script|style)[^>]*>.*?<\/\1>/gi, '');
    clean = clean.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
    clean = clean.replace(/on\w+\s*=\s*[^\s>]*/gi, '');
    clean = clean.replace(/href\s*=\s*["']javascript:[^"']*["']/gi, '');
    return clean.trim();
  };

  const execCommand = useCallback((command: string, value?: string) => {
    const el = editorRef.current;
    if (!el) return;
    el.focus();
    isComposing.current = true;
    setTimeout(() => { isComposing.current = false; }, 0);

    const success = document.execCommand(command, false, value);

    if (command === 'insertHTML' && value?.startsWith('<a')) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const anchorNode = range.startContainer;
        if (anchorNode && anchorNode.nodeType === Node.TEXT_NODE) {
          setTimeout(() => {
            const parent = anchorNode.parentElement;
            if (parent && parent.tagName === 'A' && !parent.textContent?.trim()) {
              parent.remove();
            }
          }, 100);
        }
      }
    }

    if (!success) {
      console.warn(`execCommand failed: ${command}`);
    }
  }, []);

  const handleFontName = (font: string) => {
    execCommand('fontName', font);
  };

  const handleFontSize = (size: string) => {
    execCommand('fontSize', size);
  };

  const handleColor = () => {
    const color = window.prompt('Masukkan kode warna (contoh: #ff0000 atau red):', '#000000');
    if (color) {
      execCommand('foreColor', color);
    }
  };

  const handleBgColor = () => {
    const color = window.prompt('Masukkan kode warna latar belakang (contoh: #ffff00):', '#ffff00');
    if (color) {
      execCommand('backColor', color);
    }
  };

  const handleInsertLink = () => {
    const url = window.prompt('Masukkan URL:', 'https://');
    if (url) {
      const selection = window.getSelection();
      if (!selection || !selection.toString()) {
        const linkText = window.prompt('Masukkan teks tautan:', 'klik di sini');
        if (linkText) {
          const linkHtml = `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
          execCommand('insertHTML', linkHtml);
        }
      } else {
        execCommand('createLink', url);
        const links = editorRef.current?.querySelectorAll('a');
        if (links && links.length > 0) {
          const lastLink = links[links.length - 1];
          lastLink.setAttribute('target', '_blank');
          lastLink.setAttribute('rel', 'noopener noreferrer');
        }
      }
    }
  };

  const handleClearFormatting = () => {
    execCommand('removeFormat');
  };

  const execInline = (cmd: string) => () => execCommand(cmd);

  const handlePlaceholder = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
    }
  };

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <div className="flex flex-wrap gap-1 p-2 border-b border-slate-200 bg-slate-50 overflow-x-auto">
        <div className="flex items-center gap-1 border-r border-slate-200 pr-2 mr-2">
          <select
            onChange={(e) => handleFontName(e.target.value)}
            className="text-xs px-2 py-1 rounded border border-slate-200 bg-white outline-none focus:ring-1 focus:ring-primary-500"
            defaultValue=""
          >
            <option value="" disabled>Jenis Huruf</option>
            {FONT_FAMILIES.map((f) => (
              <option key={f.value} value={f.value} style={{ fontFamily: f.value }}>{f.label}</option>
            ))}
          </select>

          <select
            onChange={(e) => handleFontSize(e.target.value)}
            className="text-xs px-2 py-1 rounded border border-slate-200 bg-white outline-none focus:ring-1 focus:ring-primary-500"
            defaultValue=""
          >
            <option value="" disabled>Ukuran</option>
            {FONT_SIZES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={execInline('bold')}
          className="p-1.5 text-slate-600 hover:text-primary-700 hover:bg-primary-50 rounded transition-colors"
          title="Tebal (Ctrl+B)"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={execInline('italic')}
          className="p-1.5 text-slate-600 hover:text-primary-700 hover:bg-primary-50 rounded transition-colors"
          title="Miring (Ctrl+I)"
        >
          <Italic className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={execInline('underline')}
          className="p-1.5 text-slate-600 hover:text-primary-700 hover:bg-primary-50 rounded transition-colors"
          title="Garis Bawah (Ctrl+U)"
        >
          <Underline className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={execInline('strikeThrough')}
          className="p-1.5 text-slate-600 hover:text-primary-700 hover:bg-primary-50 rounded transition-colors"
          title="Garis Miring"
        >
          <Strikethrough className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleColor}
          className="p-1.5 text-slate-600 hover:text-primary-700 hover:bg-primary-50 rounded transition-colors"
          title="Warna Teks"
        >
          <Palette className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleBgColor}
          className="p-1.5 text-slate-600 hover:text-primary-700 hover:bg-primary-50 rounded transition-colors"
          title="Warna Latar"
        >
          <Palette className="w-4 h-4" />
        </button>

        <div className="border-r border-slate-200 mx-1" />

        <button
          type="button"
          onClick={execInline('justifyLeft')}
          className="p-1.5 text-slate-600 hover:text-primary-700 hover:bg-primary-50 rounded transition-colors"
          title="Rata Kiri"
        >
          <AlignLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={execInline('justifyCenter')}
          className="p-1.5 text-slate-600 hover:text-primary-700 hover:bg-primary-50 rounded transition-colors"
          title="Rata Tengah"
        >
          <AlignCenter className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={execInline('justifyRight')}
          className="p-1.5 text-slate-600 hover:text-primary-700 hover:bg-primary-50 rounded transition-colors"
          title="Rata Kanan"
        >
          <AlignRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={execInline('justifyFull')}
          className="p-1.5 text-slate-600 hover:text-primary-700 hover:bg-primary-50 rounded transition-colors"
          title="Rata Kiri & Kanan"
        >
          <AlignJustify className="w-4 h-4" />
        </button>

        <div className="border-r border-slate-200 mx-1" />

        <button
          type="button"
          onClick={execInline('insertUnorderedList')}
          className="p-1.5 text-slate-600 hover:text-primary-700 hover:bg-primary-50 rounded transition-colors"
          title="Daftar Bulet"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={execInline('insertOrderedList')}
          className="p-1.5 text-slate-600 hover:text-primary-700 hover:bg-primary-50 rounded transition-colors"
          title="Daftar Nomor"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => execCommand('formatBlock', '<blockquote>')}
          className="p-1.5 text-slate-600 hover:text-primary-700 hover:bg-primary-50 rounded transition-colors"
          title="Kutipan"
        >
          <Quote className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => execCommand('formatBlock', '<pre class="bg-slate-100 p-3 rounded-lg overflow-x-auto">')}
          className="p-1.5 text-slate-600 hover:text-primary-700 hover:bg-primary-50 rounded transition-colors"
          title="Blok Kode"
        >
          <Code className="w-4 h-4" />
        </button>

        <div className="border-r border-slate-200 mx-1" />

        <button
          type="button"
          onClick={handleInsertLink}
          className="p-1.5 text-slate-600 hover:text-primary-700 hover:bg-primary-50 rounded transition-colors"
          title="Sisipkan Tautan"
        >
          <Link className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleClearFormatting}
          className="p-1.5 text-xs text-slate-600 hover:text-primary-700 hover:bg-primary-50 rounded transition-colors"
          title="Hapus Format"
        >
          <span className="font-bold">Clear</span>
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        className="w-full min-h-[200px] px-4 py-3 outline-none prose prose-sm max-w-none prose-slate
          focus:outline-none focus:ring-2 focus:ring-primary-500/20 rounded-b-xl
          [&>p]:mb-4 [&>p:last-child]:mb-0
          [&>ul]:mb-4 [&>ol]:mb-4
          [&>blockquote]:mb-4 [&>blockquote]:border-l-4 [&>blockquote]:border-primary-500 [&>blockquote]:pl-4 [&>blockquote]:italic
          [&>pre]:mb-4 [&>pre]:p-3 [&>pre]:bg-slate-100 [&>pre]:rounded-lg [&>pre]:overflow-x-auto"
        data-placeholder={placeholder}
        onKeyDown={handlePlaceholder}
      />

    </div>
  );
}
