import { createContext } from 'react';
import type { CommandState } from './store';

// Keep context identity outside the refreshable provider/component module.
// Otherwise a preview update can leave mounted providers and consumers using
// different context objects until the entire page is reloaded.
export const CommandContext = createContext<CommandState | null>(null);