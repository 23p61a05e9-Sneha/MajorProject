import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { CommandProvider, useCommand } from '@/components/command/store';
import { CommandContext } from '@/components/command/context';
import { useContext } from 'react';

afterEach(cleanup);

function Consumer() {
  const command = useCommand();
  const sameContext = useContext(CommandContext);
  return <div>
    <span>{sameContext === command ? 'Shared context' : 'Context mismatch'}</span>
    <span>{command.monitoring}</span>
    <button onClick={() => command.setMonitoring('Paused')}>Pause test</button>
  </div>;
}

describe('Command provider', () => {
  it('provides shared context and retains state across consumer rerenders', () => {
    const view = render(<CommandProvider><Consumer /></CommandProvider>);
    expect(screen.getByText('Shared context')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Pause test'));
    expect(screen.getByText('Paused')).toBeInTheDocument();
    view.rerender(<CommandProvider><Consumer /></CommandProvider>);
    expect(screen.getByText('Paused')).toBeInTheDocument();
    expect(screen.getByText('Shared context')).toBeInTheDocument();
  });
});