export type Camera = { id: string; name: string; sourceType: 'Webcam' | 'Video' | 'CCTV / RTSP'; location: string; source: string; status: 'Online' | 'Standby' };
export type CameraDraft = Pick<Camera, 'name' | 'sourceType' | 'source' | 'location'>;
export type BackendStatus = { total_people: number; zones: Record<string, { people: number; capacity: number; occupancy: number; status: string }>; camera_id: string };
export type Zone = { id: string; name: string; people: number; capacity: number; warning: number; critical: number; enabled: boolean };
export type SafetyAlert = { id: string; severity: 'Critical' | 'Warning'; zone: string; people: number; capacity: number; occupancy: number; time: string; status: 'Active' | 'Acknowledged' | 'Resolved'; history: string[] };
export type ServiceHealth = { online: boolean; message?: string };
const API_URL = import.meta.env['VITE_API_URL'] || 'http://127.0.0.1:5000';

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(`${API_URL}${path}`, { ...init, signal: controller.signal, headers: { ...(init.body ? { 'Content-Type': 'application/json' } : {}), ...init.headers } });
    const payload = await response.json().catch(() => null) as (Record<string, unknown> | null);
    if (!response.ok) throw new Error(String(payload?.['error'] ?? payload?.['message'] ?? `Request failed (${response.status})`));
    return payload as T;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw new Error('Request timed out. Check the Flask service and retry.');
    if (error instanceof TypeError) throw new Error(`Backend unavailable. Check that Flask is running at ${API_URL}.`);
    throw error;
  } finally { clearTimeout(timer); }
}
function normalizeCamera(raw: Record<string, unknown>): Camera {
  const sourceType = raw['source_type'] === 'webcam' ? 'Webcam' : raw['source_type'] === 'video' ? 'Video' : 'CCTV / RTSP';
  return { id: String(raw['_id'] ?? raw['id'] ?? raw['camera_id'] ?? ''), name: String(raw['name'] ?? ''), sourceType, source: String(raw['source'] ?? ''), location: String(raw['location'] ?? ''), status: raw['status'] === 'active' ? 'Online' : 'Standby' };
}
export const monitoringApi = {
  health: async (): Promise<ServiceHealth> => { await request('/api/health'); return { online: true }; },
  cameras: async (): Promise<Camera[]> => { const result = await request<unknown>('/api/cameras'); const list = Array.isArray(result) ? result : (result as { cameras?: unknown[] })?.cameras; if (!Array.isArray(list)) throw new Error('Unexpected camera response from Flask.'); return list.map(item => normalizeCamera(item as Record<string, unknown>)); },
  createCamera: async (camera: CameraDraft): Promise<Camera> => { const payload = await request<Record<string, unknown>>('/api/cameras', { method: 'POST', body: JSON.stringify({ name: camera.name.trim(), source_type: camera.sourceType === 'Webcam' ? 'webcam' : camera.sourceType === 'Video' ? 'video' : 'rtsp', source: camera.source.trim(), location: camera.location.trim() }) }); const created = normalizeCamera((payload['camera'] as Record<string, unknown> | undefined) ?? payload); if (!created.id) throw new Error('Camera response did not include the backend camera ID.'); return created; },
  start: (cameraId: string) => request(`/api/cameras/${encodeURIComponent(cameraId)}/start`, { method: 'POST' }),
  stop: (cameraId: string) => request(`/api/cameras/${encodeURIComponent(cameraId)}/stop`, { method: 'POST' }),
  monitoring: (cameraId: string) => request<BackendStatus>(`/api/monitoring/status/${encodeURIComponent(cameraId)}`),
};
export const zoneStatus = (z: Zone) => !z.enabled ? 'Disabled' : z.people / z.capacity * 100 >= z.critical ? 'Critical' : z.people / z.capacity * 100 >= z.warning ? 'Warning' : 'Normal';
