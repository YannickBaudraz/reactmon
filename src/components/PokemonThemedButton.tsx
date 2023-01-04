import React, {useCallback} from 'react';
import {Button, ButtonProps} from 'primereact/button';
import {getUIColor} from '../lib/color';
import Color from 'color';

interface PokemonThemedButtonProps extends Pick<ButtonProps, 'icon' | 'label' | 'iconPos' | 'onClick'> {
  color: string;
}

export function PokemonThemedButton({color, ...props}: PokemonThemedButtonProps) {
  const uiColor = getUIColor(color);
  const buttonColor = Color(uiColor);
  const hoverColor = buttonColor.darken(0.2);
  const activeColor = hoverColor.darken(0.2);

  const boxShadow: string = '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)';

  const onHover = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.currentTarget.style.backgroundColor = hoverColor.toString();
  }, [buttonColor]);
  const onLeave = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.currentTarget.style.backgroundColor = buttonColor.toString();
  }, [buttonColor]);

  const onDown = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.currentTarget.style.boxShadow = boxShadow;
    e.currentTarget.style.backgroundColor = activeColor.toString();
  }, [buttonColor]);
  const onUp = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.currentTarget.style.boxShadow = boxShadow;
    e.currentTarget.style.backgroundColor = hoverColor.toString();
  }, [buttonColor]);

  const onFocus = useCallback((e: React.FocusEvent<HTMLButtonElement>) => {
    e.currentTarget.style.boxShadow = `0 0 0 2px #ffffff, 0 0 0 4px ${buttonColor}, 0 1px 2px 0 black`;
  }, [buttonColor]);
  const onBlur = useCallback((e: React.FocusEvent<HTMLButtonElement>) => {
    e.currentTarget.style.boxShadow = boxShadow;
  }, [buttonColor]);

  return (
      <Button
          className="p-button-raised"
          label={props.label}
          icon={props.icon}
          iconPos={props.iconPos}
          style={{
            backgroundColor: buttonColor.toString(),
            color: buttonColor.isLight() ? 'black' : 'white',
            borderColor: buttonColor.toString()
          }}
          onMouseOver={onHover}
          onMouseOut={onLeave}
          onMouseDown={onDown}
          onMouseUp={onUp}
          onFocus={onFocus}
          onBlur={onBlur}
      />
  );
}
