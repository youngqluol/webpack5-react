import { FC, useState } from 'react';
import { report } from '@src/utils/trace';
import Loading from '@src/components/Loading';
import { Button } from '@kdcloudjs/kdesign';

const ForTest: FC = () => {
  const [count, setCount] = useState(1);

  const handleClick = () => {
    report({ url: '111', search: { a: 'http?111', b: undefined, c: 222 } });
  };

  return (
    <div>
      <button type='button' onClick={handleClick} data-track={JSON.stringify({ a: 1 })}>
        {count}
      </button>
      <Button data-track={JSON.stringify({ a: 1 })}>点击上报埋点</Button>
      <Loading count={2} />
    </div>
  );
};

export default ForTest;
