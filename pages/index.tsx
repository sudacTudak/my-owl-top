import { useState } from 'react';
import { Htag, Button, Ptag, Tag, Rating } from '../components';

export default function Home(): JSX.Element {
  const [rating, setRating] = useState(4);

  return (
    <>
      <Htag tag='h1'>Курсы по Photoshop</Htag>
      <Button appearance='primary' arrow='down'>Click on me</Button>
      <Button appearance='ghost' arrow='right'>Im a ghost</Button>
      <Ptag size='small'>Hello World IM a small p</Ptag>
      <Ptag>Hello World IM a medium p</Ptag>
      <Ptag size='large'>Hello World IM a large p</Ptag>
      <Tag>Дизайн</Tag>
      <Tag>Photoshop</Tag>
      <Tag color='ghost' size='medium'>Im a medium ghost tag</Tag>
      <Tag color='red' size='medium'>hh.ru</Tag>
      <Tag color='primary' size='small'>Im a small primary tag</Tag>
      <Tag color='gray' size='medium'> Im a medium gray tag</Tag>
      <Tag color='green' size='medium' href='www.google.com'> Im a medium green tag</Tag>
      <Rating rating={rating} isEditable setRating={setRating}/>
    </>
  );
}
