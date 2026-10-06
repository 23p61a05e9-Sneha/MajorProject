import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Panel } from './shared';
export function RecentAlerts(){return <Panel title="Recent alerts" extra={<Button variant="link" size="sm" asChild><Link to="/alerts">View all <ArrowUpRight size={13}/></Link></Button>}><div className="empty-state"><Shield/>Alerts will appear here when the AI alert service is connected.</div></Panel>;}
export function AlertTable(){return <div className="empty-state"><Shield/>Alerts will appear here when the AI alert service is connected.</div>;}
