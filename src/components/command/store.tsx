import { useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { monitoringApi, type BackendStatus, type Camera, type ServiceHealth } from '@/lib/monitoring-api';
import { CommandContext } from './context';
function useCommandState() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [selectedCamera, setSelectedCamera] = useState('');
  const [monitoring, setMonitoring] = useState<'Running' | 'Paused' | 'Stopped'>('Stopped');
  const [telemetry, setTelemetry] = useState<BackendStatus | null>(null);
  const [health, setHealth] = useState<ServiceHealth>({ online: false });
  const [loadingCameras, setLoadingCameras] = useState(true);
  const [cameraError, setCameraError] = useState('');
  const [notice, setNotice] = useState('');
  const notify = useCallback((message: string) => { setNotice(message); setTimeout(() => setNotice(''), 4500); }, []);
  const refreshCameras = async () => {
    setLoadingCameras(true); setCameraError('');
    try { const [items, backend] = await Promise.all([monitoringApi.cameras(), monitoringApi.health().catch(() => ({ online: false }))]); setCameras(items); setHealth(backend); setSelectedCamera(current => items.some(c => c.id === current) ? current : items.find(c => c.status === 'Online')?.id ?? items[0]?.id ?? ''); }
    catch (error) { setCameraError(error instanceof Error ? error.message : 'Unable to load cameras.'); setHealth({ online: false, message: error instanceof Error ? error.message : 'Backend unavailable' }); }
    finally { setLoadingCameras(false); }
  };
  useEffect(() => { void refreshCameras(); }, []);
  const refreshHealth = async () => { try { await monitoringApi.health(); setHealth({ online: true }); } catch (error) { setHealth({ online: false, message: error instanceof Error ? error.message : 'Backend unavailable' }); } };
  return { cameras, setCameras, selectedCamera, setSelectedCamera, monitoring, setMonitoring, telemetry, setTelemetry, health, refreshHealth, loadingCameras, cameraError, refreshCameras, notice, notify };
}
export type CommandState = ReturnType<typeof useCommandState>;
export function CommandProvider({ children }: { children: ReactNode }) { const state = useCommandState(); return <CommandContext.Provider value={state}>{children}</CommandContext.Provider>; }
export function useCommand() { const context = useContext(CommandContext); if (!context) throw new Error('CommandProvider required'); return context; }
