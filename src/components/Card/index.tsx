import * as React from 'react';
import CardStyles from './index.module.less';

interface CardProps {
  childClassName?: string;
}

const defaultProps = {
  childClassName: '',
};

function addClassNameForChildren(children: any, childClassName: string) {
  if (!Array.isArray(children)) {
    const {
      props: { className = '' },
    } = children;
    const finalClassName = className ? `${className} ${childClassName}` : `${childClassName}`;
    return {
      ...children,
      ...{ props: { ...children.props, ...{ className: finalClassName } } },
    };
  }
  return children.map(child => {
    return addClassNameForChildren(child, childClassName);
  });
}

const Card: React.FC<CardProps> = ({ childClassName = '', ...props }) => {
  return (
    <div className={CardStyles.card}>
      {childClassName ? addClassNameForChildren(props.children, childClassName) : props.children}
    </div>
  );
};

Card.defaultProps = defaultProps;

export default Card;
