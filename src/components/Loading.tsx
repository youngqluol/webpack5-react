import { useState } from 'react';

export default function Loading(props: { count: number }) {
  const [localCount, setLocalCount] = useState(props.count);
  // TODO 全屏loading组件
  return <span>{localCount}</span>;
}
