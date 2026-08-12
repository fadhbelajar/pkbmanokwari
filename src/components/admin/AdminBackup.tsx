import { useState } from 'react';
import { Save, Upload, Cloud, Download, Loader2, Check, AlertCircle, Database } from 'lucide-react';
import { useSite } from '@/context/SiteContext';
import { apiClient, isApiConfigured } from '@/lib/apiClient';

interface AdminBackupProps {
  onBackup?: () => void;
  onRestore?: () => void;
}

export default function AdminBackup({ onBackup, onRestore }: AdminBackupProps) {
  const { settings, leaders, news, gallery, videoLinks, accounts, backupData, restoreData } = useSite();
  const [restoreStatus, setRestoreStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [restoreError, setRestoreError] = useState('');
  const [cloudAction, setCloudAction] = useState<'idle' | 'uploading' | 'downloading'>('idle');
  const [cloudStatus, setCloudStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [cloudMessage, setCloudMessage] = useState('');

  const handleBackup = () => {
    const dataStr = backupData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const a = document.createElement('a');
    a.href = url;
    a.download = `pkb-manokwari-backup-${timestamp}.json`;
    a.click();
    URL.revokeObjectURL(url);
    onBackup?.();
  };

  const handleRestore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (!content) {
        setRestoreStatus('error');
        setRestoreError('Gagal membaca file.');
        return;
      }

      const success = restoreData(content);
      if (success) {
        setRestoreStatus('success');
        setRestoreError('');
        onRestore?.();
      } else {
        setRestoreStatus('error');
        setRestoreError('Format file backup tidak valid atau rusak.');
      }
    };
    reader.onerror = () => {
      setRestoreStatus('error');
      setRestoreError('Gagal membaca file.');
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleCloudUpload = async () => {
    if (!isApiConfigured()) {
      setCloudStatus('error');
      setCloudMessage('API belum dikonfigurasi. Pastikan VITE_API_BASE_URL di .env');
      return;
    }

    setCloudAction('uploading');
    setCloudStatus('idle');

    try {
      const data = {
        settings,
        leaders,
        news,
        gallery,
        videoLinks,
        accounts,
        timestamp: new Date().toISOString()
      };

      await apiClient.post('backup.php', {
        action: 'backup',
        data
      });

      setCloudStatus('success');
      setCloudMessage('Data berhasil di-backup ke database!');
      onBackup?.();
    } catch (err: any) {
      setCloudStatus('error');
      setCloudMessage(err.message || 'Gagal backup ke database');
    } finally {
      setCloudAction('idle');
    }
  };

  const handleCloudDownload = async () => {
    if (!isApiConfigured()) {
      setCloudStatus('error');
      setCloudMessage('API belum dikonfigurasi.');
      return;
    }

    setCloudAction('downloading');
    setCloudStatus('idle');
    setCloudMessage('');

    try {
      const result = await apiClient.get<{ data: Record<string, unknown> | null }>('backup.php');

      if (!result || !result.data) {
        setCloudStatus('error');
        setCloudMessage('Tidak ada data backup tersedia di database.');
        return;
      }

      const dataStr = JSON.stringify(result.data, null, 2);

      const success = restoreData(dataStr);
      if (success) {
        setCloudStatus('success');
        setCloudMessage('Data berhasil direstore dari database!');
        onRestore?.();
      } else {
        setCloudStatus('error');
        setCloudMessage('Gagal memproses data dari database.');
      }
    } catch (err: any) {
      setCloudStatus('error');
      setCloudMessage(err.message || 'Gagal mengambil data dari database');
    } finally {
      setCloudAction('idle');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
        <Database className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-800">Backup & Restore Data</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Local Backup/Restore */}
        <div className="border border-slate-200 rounded-xl p-4 space-y-4">
          <h4 className="font-medium text-slate-700 flex items-center gap-2">
            <Save className="w-4 h-4 text-slate-600" />
            Lokal (File)
          </h4>
          <div className="flex gap-3">
            <button
              onClick={handleBackup}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Export
            </button>
            <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
              <Upload className="w-4 h-4" />
              Import
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleRestore}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-xs text-slate-400">
            Unduh/sekalikan data sebagai file JSON di perangkat lokal.
          </p>
        </div>

        {/* Cloud Backup/Restore */}
        <div className="border border-slate-200 rounded-xl p-4 space-y-4">
          <h4 className="font-medium text-slate-700 flex items-center gap-2">
            <Cloud className="w-4 h-4 text-slate-600" />
            Cloud (MySQL)
          </h4>
          <div className="flex gap-3">
            <button
              onClick={handleCloudUpload}
              disabled={cloudAction !== 'idle'}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              {cloudAction === 'uploading' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Backup ke Cloud
            </button>
            <button
              onClick={handleCloudDownload}
              disabled={cloudAction !== 'idle'}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
            >
              {cloudAction === 'downloading' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              Restore dari Cloud
            </button>
          </div>
          <p className="text-xs text-slate-400">
            Sinkron data ke database MySQL untuk backup online.
          </p>
          {!isApiConfigured() && (
            <p className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
              Konfigurasi VITE_API_BASE_URL di .env
            </p>
          )}
        </div>
      </div>

      {/* Local Restore Status */}
      {restoreStatus === 'success' && (
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800">
          <Check className="w-5 h-5" />
          <span>Data berhasil direstore!</span>
        </div>
      )}

      {restoreStatus === 'error' && (
        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800">
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <span>{restoreError}</span>
        </div>
      )}

      {/* Cloud Status */}
      {cloudStatus !== 'idle' && (
        <div className={`flex items-center gap-2 p-3 rounded-lg transition-colors ${
          cloudStatus === 'success'
            ? 'bg-green-50 border border-green-200 text-green-800'
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {cloudStatus === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span className="text-sm">{cloudMessage}</span>
        </div>
      )}
    </div>
  );
}
