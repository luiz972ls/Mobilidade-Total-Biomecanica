import React, { useState, useEffect } from 'react';
import { Code2, Copy, Check, X, FileCode, Terminal } from 'lucide-react';

interface SourceFileEntry {
  path: string;
  content: string;
}

interface OpenSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OpenSourceInspectorModal: React.FC<OpenSourceModalProps> = ({ isOpen, onClose }) => {
  const [files, setFiles] = useState<SourceFileEntry[]>([]);
  const [selectedPath, setSelectedPath] = useState<string>('README.md');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedFile, setCopiedFile] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;
    setIsLoading(true);
    fetch('/api/source-code')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data?.files)) {
          setFiles(data.files);
          if (data.files.length > 0 && !selectedPath) {
            setSelectedPath(data.files[0].path);
          }
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [isOpen]);

  if (!isOpen) return null;

  const activeFile = files.find((f) => f.path === selectedPath) ?? files[0];

  const handleCopyCode = () => {
    if (!activeFile) return;
    navigator.clipboard.writeText(activeFile.content);
    setCopiedFile(true);
    setTimeout(() => setCopiedFile(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="opensource-modal-title"
      className="fixed inset-0 z-50 bg-slate-900/75 flex items-center justify-center p-4"
    >
      <div className="bg-white border border-slate-300 w-full max-w-6xl h-[85vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <Code2 className="w-5 h-5 text-teal-700" />
            <div>
              <h2 id="opensource-modal-title" className="text-base font-bold text-slate-900">
                Repositório Público & Inspeção de Código-Fonte Aberto (Apache-2.0)
              </h2>
              <p className="text-xs text-slate-600">
                Todos os 14 módulos de código, algoritmos matemáticos e bases biomecânicas expostos integralmente.
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Fechar inspetor de código-fonte"
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-900 border border-slate-300 bg-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* GitHub Export Instructions Banner */}
        <div className="px-6 py-3 bg-slate-900 text-slate-100 text-xs flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-teal-400 shrink-0" />
            <span>
              <strong>Como publicar na sua conta do GitHub (Visibilidade Pública):</strong> Clique no ícone do{' '}
              <strong>GitHub</strong> na barra superior do AI Studio Build → escolha{' '}
              <strong>Public Repository</strong> → confirme a sincronização.
            </span>
          </div>
          <span className="font-mono text-teal-400 shrink-0">Licença: Apache-2.0 · README.md Incluso</span>
        </div>

        {/* Main Split Explorer */}
        <div className="flex-1 flex overflow-hidden">
          {/* File Tree Sidebar */}
          <div className="w-64 border-r border-slate-200 bg-slate-50 overflow-y-auto p-3 space-y-1 shrink-0">
            <div className="text-[11px] font-mono uppercase text-slate-500 px-2 py-1 font-semibold">
              Arquivos do Projeto ({files.length})
            </div>
            {files.map((file) => {
              const isSelected = file.path === selectedPath;
              return (
                <button
                  key={file.path}
                  type="button"
                  onClick={() => setSelectedPath(file.path)}
                  className={`w-full text-left px-2.5 py-2 text-xs font-mono flex items-center gap-2 transition-colors ${
                    isSelected ? 'bg-slate-900 text-white font-semibold' : 'text-slate-700 hover:bg-slate-200/70'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{file.path}</span>
                </button>
              );
            })}
          </div>

          {/* Code Viewer Pane */}
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-950 text-slate-100">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs font-mono">
              <span className="text-teal-400 font-semibold">{activeFile?.path ?? 'Carregando...'}</span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700"
              >
                {copiedFile ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedFile ? 'Código Copiado!' : 'Copiar Arquivo'}</span>
              </button>
            </div>

            <pre className="flex-1 overflow-auto p-5 text-xs font-mono leading-relaxed text-slate-200">
              {isLoading ? 'Carregando árvore de código-fonte...' : activeFile?.content ?? ''}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
