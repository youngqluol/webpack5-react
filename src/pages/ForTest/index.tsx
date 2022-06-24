import { FC } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import MenuTabs from '@src/components/MenuTabs';
import MenuTabs2 from '@src/components/MenuTabs2';
import KeepAlive from '@src/components/KeepAlive';

const ForTest: FC = () => {
  return (
    // <div style={{ width: '500px', height: '500px' }}>
    //   <QRCodeSVG value='https://reactjs.org/' size={200} style={{ margin: '0 auto' }} />
    // </div>
    // <MenuTabs />
    // <MenuTabs2 />
    <KeepAlive />
  );
};

export default ForTest;
