import { FC } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const ForTest: FC = () => {
  return (
    <div style={{ width: '500px', height: '500px' }}>
      <QRCodeSVG value='https://reactjs.org/' size={200} style={{ margin: '0 auto' }} />
    </div>
  );
};

export default ForTest;
