import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PropsWithChildren } from 'react';
import { colors } from './data';

export function ColorOpts({
  children,
  onColorChange,
}: PropsWithChildren<{ onColorChange: (color: string) => void }>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{children}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup className="flex flex-wrap">
          {colors.map((color) => (
            <DropdownMenuItem onClick={() => onColorChange(color.hex)}>
              <div
                className="h-6 w-6 rounded-full"
                style={{ background: color.hex }}
              ></div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
