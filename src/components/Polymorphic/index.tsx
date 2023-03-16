import { RoundedButton, Button } from './Button';

export default function Polymorphic() {
  return (
    <>
      <Button as={RoundedButton} size='large'>
        click me
      </Button>
      <Button as='a' href='http://www.baidu.com/'>
        click me
      </Button>
    </>
  );
}
