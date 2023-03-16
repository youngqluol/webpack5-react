import React from 'react';

type RoundedButtonProps = {
  size?: 'large' | 'normal';
};

export function RoundedButton(props: React.ComponentProps<'button'> & RoundedButtonProps) {
  const { size = 'normal', style, ...rest } = props;

  const sizeStyle = {
    large: {
      fontSize: 30,
    },
    normal: {
      fontSize: 20,
    },
  }[size];

  return <button type='button' style={{ ...style, borderRadius: 200, ...sizeStyle }} {...rest} />;
}

// React.ElementType 可以是原生标签，也可以是自定义组件
type ButtonOwnProps<T extends React.ElementType> = {
  as?: T;
  children: React.ReactNode;
};

type ButtonProps<T extends React.ElementType> = Omit<React.ComponentProps<T>, keyof ButtonOwnProps<T>>;

export function Button<T extends React.ElementType = 'button'>(props: ButtonOwnProps<T> & ButtonProps<T>) {
  const { as, children, ...rest } = props;
  const Component = as ?? 'button';

  return <Component {...rest}>{children}</Component>;
}
